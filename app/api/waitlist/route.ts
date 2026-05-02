import { NextRequest, NextResponse } from "next/server";
import { generateRefCode } from "@/lib/refCode";
import {
  BeehiivApiError,
  BeehiivConfigError,
  isBeehiivConfigured,
  subscribeBeehiiv,
} from "@/lib/providers/beehiiv";

/**
 * POST /api/waitlist
 *
 * Real Beehiiv signup when env vars are present, stub fallback when they're
 * not (so dev mode without keys still demos end-to-end).
 *
 * Position-in-line is approximated until we wire a real count source. See
 * the TODO(counter) note in components/Hero.tsx for the sibling concern.
 */

interface IncomingBody {
  email?: string;
  ref?: string | null;
  honeypot?: string;
}

const FAKE_BASE_POSITION = 247;

export async function POST(req: NextRequest) {
  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  // Honeypot. Silent success so bots can't tune their inputs.
  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true, ref: "ROBOT_", position: 0 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "bad-email" }, { status: 400 });
  }

  const ourRefCode = generateRefCode();
  const referredBy = body.ref?.trim() || null;

  if (isBeehiivConfigured()) {
    try {
      const sub = await subscribeBeehiiv({
        email,
        referredBy,
        ourRefCode,
      });
      // Prefer Beehiiv's referral code if it returned one, otherwise use ours
      // so the share link still works on day one.
      const ref = sub.beehiivReferralCode ?? ourRefCode;
      const position = FAKE_BASE_POSITION + 1 + Math.floor(Math.random() * 3);
      return NextResponse.json({ ok: true, ref, position });
    } catch (err) {
      if (err instanceof BeehiivApiError) {
        // Log and return a soft error so the form can show a friendly message.
        console.error("[waitlist] beehiiv api error", err.status, err.body);
        return NextResponse.json(
          { ok: false, error: "provider-failed" },
          { status: 502 },
        );
      }
      if (err instanceof BeehiivConfigError) {
        // Shouldn't hit here because we checked isBeehiivConfigured(); fall
        // through to stub path defensively.
      } else {
        console.error("[waitlist] unexpected error", err);
        return NextResponse.json(
          { ok: false, error: "server-error" },
          { status: 500 },
        );
      }
    }
  }

  // Stub path. Used in local dev without keys, and as a defensive fallback.
  console.log("[waitlist] stub signup (no provider configured)", {
    email,
    referredBy,
  });
  const position = FAKE_BASE_POSITION + 1 + Math.floor(Math.random() * 3);
  return NextResponse.json({ ok: true, ref: ourRefCode, position });
}
