import { NextRequest, NextResponse } from "next/server";
import {
  BeehiivApiError,
  BeehiivConfigError,
  isBeehiivConfigured,
  updateBeehiivSubscription,
} from "@/lib/providers/beehiiv";

/**
 * POST /api/enrich
 *
 * Bolts persona-specific fields onto an existing Beehiiv subscription created
 * by /api/waitlist. Called from the EnrichmentModal after the user picks a
 * persona and fills the persona-specific fields.
 *
 * The user's email is already saved at this point. If anything in this flow
 * fails, the worst case is we miss the bonus enrichment data; the email
 * remains in Beehiiv from step 1.
 */

type Persona = "user" | "gym_owner";

interface IncomingBody {
  subscriptionId?: string;
  persona?: Persona;
  firstName?: string;
  lastName?: string;
  // user persona
  attendsGym?: string;
  // gym_owner persona
  gymName?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  honeypot?: string;
}

function clean(s: string | undefined, max = 200): string {
  return (s ?? "").trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const subscriptionId = clean(body.subscriptionId, 80);
  if (!subscriptionId || !subscriptionId.startsWith("sub_")) {
    // No id means the original signup hit the stub path; nothing to enrich.
    // Soft success so the UI doesn't surface this as an error.
    return NextResponse.json({ ok: true, enriched: false });
  }

  const persona: Persona | "" =
    body.persona === "user" || body.persona === "gym_owner" ? body.persona : "";
  if (!persona) {
    return NextResponse.json(
      { ok: false, error: "missing-persona" },
      { status: 400 },
    );
  }

  const firstName = clean(body.firstName, 80);
  const lastName = clean(body.lastName, 80);

  const customFields: Array<{ name: string; value: string }> = [
    { name: "persona", value: persona },
  ];
  if (firstName) customFields.push({ name: "first_name", value: firstName });
  if (lastName) customFields.push({ name: "last_name", value: lastName });

  if (persona === "user") {
    const attendsGym = clean(body.attendsGym, 200);
    if (attendsGym) {
      customFields.push({ name: "attends_gym", value: attendsGym });
    }
  } else {
    // gym_owner
    const gymName = clean(body.gymName, 200);
    const suburb = clean(body.suburb, 120);
    const state = clean(body.state, 60);
    const postcode = clean(body.postcode, 12);
    if (gymName) customFields.push({ name: "gym_name", value: gymName });
    if (suburb) customFields.push({ name: "gym_town", value: suburb });
    if (state) customFields.push({ name: "gym_state", value: state });
    if (postcode) customFields.push({ name: "gym_postcode", value: postcode });
  }

  if (!isBeehiivConfigured()) {
    console.log("[enrich] stub (no provider configured)", {
      subscriptionId,
      persona,
      customFields,
    });
    return NextResponse.json({ ok: true, enriched: false });
  }

  try {
    await updateBeehiivSubscription({
      subscriptionId,
      customFields,
      // If a user identifies as a gym owner, flip them into the partner
      // segment so the right welcome flow + sales sequence fires.
      audienceOverride: persona === "gym_owner" ? "partner" : undefined,
    });
    return NextResponse.json({ ok: true, enriched: true });
  } catch (err) {
    if (err instanceof BeehiivApiError) {
      console.error("[enrich] beehiiv api error", err.status, err.body);
      return NextResponse.json(
        { ok: false, error: "provider-failed" },
        { status: 502 },
      );
    }
    if (!(err instanceof BeehiivConfigError)) {
      console.error("[enrich] unexpected error", err);
      return NextResponse.json(
        { ok: false, error: "server-error" },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, enriched: false });
  }
}
