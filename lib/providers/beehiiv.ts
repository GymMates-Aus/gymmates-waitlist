/**
 * Beehiiv adapter.
 *
 * Wraps the two endpoints we care about:
 *   POST /v2/publications/{id}/subscriptions   - create a subscription
 *   GET  /v2/publications/{id}?expand=stats    - read subscriber stats
 *
 * Designed so the rest of the app can call subscribe() / getSubscriberCount()
 * without knowing which provider is wired underneath.
 */

const BEEHIIV_BASE = "https://api.beehiiv.com/v2";

export type Audience = "consumer" | "partner";

export interface SubscribeInput {
  email: string;
  /** Inbound referral code from ?ref= on the landing URL, if any. */
  referredBy?: string | null;
  /** Our own short code we generated for this signup, used for share links. */
  ourRefCode: string;
  /**
   * Which landing the signup came from. Used to set distinct UTM tags so the
   * audiences are segmentable in Beehiiv (different welcome flows, different
   * monthly notes, different sender names if needed).
   */
  audience?: Audience;
  /** Extra custom fields, e.g. gym_name / gym_role for the partner form. */
  extraCustomFields?: Array<{ name: string; value: string }>;
}

export interface SubscribeResult {
  /** Provider's subscription id, useful for later lookups. */
  providerId: string | null;
  /** Beehiiv's referral_code if exposed by the API, else null. */
  beehiivReferralCode: string | null;
  status: string;
}

export class BeehiivConfigError extends Error {
  constructor() {
    super("beehiiv-not-configured");
    this.name = "BeehiivConfigError";
  }
}
export class BeehiivApiError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`beehiiv-${status}`);
    this.name = "BeehiivApiError";
    this.status = status;
    this.body = body;
  }
}

function readConfig() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) throw new BeehiivConfigError();
  return { apiKey, publicationId };
}

export function isBeehiivConfigured(): boolean {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);
}

export async function subscribeBeehiiv(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const { apiKey, publicationId } = readConfig();

  const res = await fetch(
    `${BEEHIIV_BASE}/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: input.email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source:
          input.audience === "partner" ? "partner-waitlist" : "waitlist",
        utm_medium: "landing-page",
        utm_campaign:
          input.audience === "partner" ? "partner-pre-register" : "pre-launch",
        referring_site:
          input.audience === "partner"
            ? "waitlist.gymmates.com.au/partner"
            : "waitlist.gymmates.com.au",
        // If they arrived via someone's ref link, hand it to Beehiiv.
        // Beehiiv expects its own referral_code format here. If our internal
        // codes don't match Beehiiv's scheme, Beehiiv will simply ignore the
        // field; attribution still works locally via custom_fields below.
        referral_code: input.referredBy || undefined,
        custom_fields: [
          { name: "audience", value: input.audience ?? "consumer" },
          { name: "our_ref_code", value: input.ourRefCode },
          ...(input.referredBy
            ? [{ name: "referred_by", value: input.referredBy }]
            : []),
          ...(input.extraCustomFields ?? []),
        ],
      }),
      // Don't cache POSTs.
      cache: "no-store",
    },
  );

  const text = await res.text();
  if (!res.ok) {
    throw new BeehiivApiError(res.status, text.slice(0, 500));
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new BeehiivApiError(500, "non-json-response");
  }

  // Defensive shape read. Beehiiv returns { data: { id, status, referral_code? } }.
  const data = (json as { data?: Record<string, unknown> })?.data ?? {};
  return {
    providerId: typeof data.id === "string" ? data.id : null,
    beehiivReferralCode:
      typeof data.referral_code === "string" ? data.referral_code : null,
    status: typeof data.status === "string" ? data.status : "active",
  };
}

export interface UpdateSubscriptionInput {
  subscriptionId: string;
  customFields: Array<{ name: string; value: string }>;
  /**
   * Optional override of the segment-routing audience tag. When a user lands
   * on the consumer page but identifies as a gym owner via the enrichment
   * modal, we flip them to "partner" so the partner segment + welcome flow
   * picks them up correctly.
   */
  audienceOverride?: Audience;
}

/**
 * PATCH /v2/publications/{id}/subscriptions/{sub}
 * Used by the enrichment flow to bolt on first/last name + persona-specific
 * fields after the initial email-only signup.
 */
export async function updateBeehiivSubscription(
  input: UpdateSubscriptionInput,
): Promise<{ ok: boolean }> {
  const { apiKey, publicationId } = readConfig();

  const customFields = input.audienceOverride
    ? [
        ...input.customFields.filter((f) => f.name !== "audience"),
        { name: "audience", value: input.audienceOverride },
      ]
    : input.customFields;

  const res = await fetch(
    `${BEEHIIV_BASE}/publications/${publicationId}/subscriptions/${input.subscriptionId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ custom_fields: customFields }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new BeehiivApiError(res.status, text.slice(0, 500));
  }
  return { ok: true };
}

/**
 * Apply one or more tags to a subscription.
 * Tags must already exist in the publication (created in Beehiiv UI:
 * Audience -> Subscribers -> Tags tab -> New Tag). If a tag name doesn't
 * exist, Beehiiv silently no-ops, so this function is safe to call before
 * the user has created the tags. Throws on transport/auth failures only.
 */
export async function applyBeehiivTags(
  subscriptionId: string,
  tagNames: string[],
): Promise<{ ok: boolean }> {
  if (!subscriptionId.startsWith("sub_") || tagNames.length === 0) {
    return { ok: true };
  }
  const { apiKey, publicationId } = readConfig();
  const res = await fetch(
    `${BEEHIIV_BASE}/publications/${publicationId}/subscriptions/${subscriptionId}/tags`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: tagNames }),
      cache: "no-store",
    },
  );
  if (!res.ok && res.status !== 201) {
    const text = await res.text();
    throw new BeehiivApiError(res.status, text.slice(0, 500));
  }
  return { ok: true };
}

/**
 * Best-effort live subscriber count, with a 10-minute Next.js cache.
 * Returns null on any failure so callers can fall back to a stub number.
 */
export async function getSubscriberCount(): Promise<number | null> {
  let config: { apiKey: string; publicationId: string };
  try {
    config = readConfig();
  } catch {
    return null;
  }

  try {
    const res = await fetch(
      `${BEEHIIV_BASE}/publications/${config.publicationId}?expand[]=stats`,
      {
        headers: { Authorization: `Bearer ${config.apiKey}` },
        next: { revalidate: 600 },
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        stats?: {
          active_subscriptions?: number;
          total_subscriptions?: number;
        };
      };
    };
    const stats = json?.data?.stats;
    const n = stats?.active_subscriptions ?? stats?.total_subscriptions;
    return typeof n === "number" && n > 0 ? n : null;
  } catch {
    return null;
  }
}
