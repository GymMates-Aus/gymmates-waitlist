/**
 * Generate a short, shareable referral code.
 * TODO(referral): swap for a deterministic per-user code from the database
 *   so a refresh of /confirmed for the same user shows the same code, and so
 *   referral attribution is reliable. For the stub, a fresh random code is fine.
 */
export function generateRefCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid mis-shares
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
