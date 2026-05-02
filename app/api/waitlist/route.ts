import { NextRequest, NextResponse } from "next/server";
import { generateRefCode } from "@/lib/refCode";

/**
 * POST /api/waitlist
 *
 * Stub endpoint. Logs the email and returns a fake position + ref code.
 *
 * TODO(email-service): wire to ConvertKit / Beehiiv / Resend. Replace the
 *   console.log with a fetch to the provider's "add subscriber" endpoint and
 *   use a real position from the provider response (or our own DB count).
 *
 * TODO(counter): expose a GET handler that returns the live signup count so
 *   the hero "247 already on the list" line reads from a single source.
 */

export async function POST(req: NextRequest) {
  let body: { email?: string; ref?: string; honeypot?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  // Honeypot. If a bot fills the hidden field we silently 200 to avoid telling
  // them what triggered the rejection.
  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true, ref: "ROBOT_", position: 0 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "bad-email" }, { status: 400 });
  }

  // TODO(email-service): persist email + referrer (body.ref) to provider/DB.
  console.log("[waitlist] new signup", { email, referredBy: body.ref ?? null });

  const ref = generateRefCode();

  // TODO(counter): replace this hardcoded base with the real count from the DB.
  const fakeBase = 247;
  const position = fakeBase + 1 + Math.floor(Math.random() * 3);

  return NextResponse.json({ ok: true, ref, position });
}
