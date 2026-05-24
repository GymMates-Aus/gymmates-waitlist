import { NextRequest, NextResponse } from "next/server";
import { generateRefCode } from "@/lib/refCode";
import {
  applyBeehiivTags,
  BeehiivApiError,
  BeehiivConfigError,
  isBeehiivConfigured,
  subscribeBeehiiv,
} from "@/lib/providers/beehiiv";

/**
 * POST /api/partner
 *
 * Gym-owner pre-register flow. Same Beehiiv publication as the consumer
 * waitlist, but tagged with utm_source=partner-waitlist + audience custom
 * field=partner so the segments stay separable.
 *
 * On a paid plan we'd also POST to a Slack/Discord webhook here so the sales
 * team gets pinged the moment a gym owner submits. TODO(notify): wire that.
 */

interface IncomingBody {
  email?: string;
  name?: string;
  role?: string;
  gym?: string;
  town?: string;
  size?: string;
  notes?: string;
  honeypot?: string;
}

function clean(s: string | undefined, max = 200) {
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
    return NextResponse.json({ ok: true, ref: "ROBOT_" });
  }

  const email = clean(body.email).toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "bad-email" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const role = clean(body.role, 60);
  const gym = clean(body.gym, 120);
  const town = clean(body.town, 120);
  const size = clean(body.size, 60);
  const notes = clean(body.notes, 1000);

  if (!name || !gym) {
    return NextResponse.json(
      { ok: false, error: "missing-required" },
      { status: 400 },
    );
  }

  const ourRefCode = generateRefCode();

  const extraCustomFields = [
    { name: "first_name", value: name.split(/\s+/)[0] },
    { name: "last_name", value: name.split(/\s+/).slice(1).join(" ") || "" },
    { name: "gym_name", value: gym },
    { name: "gym_role", value: role },
    { name: "gym_town", value: town },
    { name: "gym_size", value: size },
    { name: "gym_notes", value: notes },
  ].filter((f) => f.value); // Don't send empty values.

  if (isBeehiivConfigured()) {
    try {
      const sub = await subscribeBeehiiv({
        email,
        ourRefCode,
        audience: "partner",
        extraCustomFields,
      });
      // Apply the coloured 'Gym Owner' tag so the subscriber is visually
      // identifiable in Beehiiv's subscriber table. Tag must exist in
      // Beehiiv UI (Audience -> Subscribers -> Tags). If it doesn't exist,
      // Beehiiv silently no-ops, so this is safe to call regardless.
      if (sub.providerId) {
        try {
          await applyBeehiivTags(sub.providerId, ["Gym Owner"]);
        } catch (tagErr) {
          console.error("[partner] tag apply failed (non-fatal)", tagErr);
        }
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      if (err instanceof BeehiivApiError) {
        console.error("[partner] beehiiv api error", err.status, err.body);
        return NextResponse.json(
          { ok: false, error: "provider-failed" },
          { status: 502 },
        );
      }
      if (!(err instanceof BeehiivConfigError)) {
        console.error("[partner] unexpected error", err);
        return NextResponse.json(
          { ok: false, error: "server-error" },
          { status: 500 },
        );
      }
    }
  }

  console.log("[partner] stub signup (no provider configured)", {
    email,
    name,
    role,
    gym,
    town,
    size,
    notes,
  });
  return NextResponse.json({ ok: true });
}
