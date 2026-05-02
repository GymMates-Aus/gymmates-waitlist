# GymMates · Waitlist landing page

Pre-launch waitlist landing for GymMates, a closed-network gym accountability app built by Next Level Echuca. End users (free, forever). One job: capture emails before launch and grow the list via referrals.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind · self-hosted Plus Jakarta Sans + Work Sans via `next/font` · runtime-rendered OpenGraph image via `next/og`.

## Run locally

```bash
cd waitlist
npm install
npm run dev
```

Opens on <http://localhost:3000>.

## Build / deploy

```bash
npm run build
npm start
```

Deploy to Vercel:

```bash
npx vercel
```

The project root for the deploy is the `waitlist/` folder. Set the project root to `waitlist` in the Vercel dashboard if importing from a monorepo, or run `vercel` from inside `waitlist/`.

## Email service · Beehiiv

The form is wired to [Beehiiv](https://beehiiv.com) via `lib/providers/beehiiv.ts`. When the env vars below are set, signups go to Beehiiv. When they're missing (e.g. local dev with no key), the route falls through to a stub that logs the email and returns a fake position, so the page still demos end-to-end.

### Setup, once

1. Create a publication at <https://app.beehiiv.com>.
2. Settings → Integrations → API → **generate an API key**.
3. Settings → Integrations → API → copy the **publication id** (`pub_…`).
4. In the project root, copy `.env.example` to `.env.local` and paste the two values:

   ```env
   BEEHIIV_API_KEY=...
   BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

5. Restart `npm run dev`. The hero "X already on the list" line will switch to the live Beehiiv subscriber count (cached for ten minutes via Next's `revalidate`).

### What lands in Beehiiv on each signup

- `email`
- `referring_site = waitlist.gymmates.com.au`
- `utm_source / utm_medium / utm_campaign` set to identify waitlist traffic
- Custom fields: `our_ref_code` (the code we generated for this signup) and `referred_by` (if they arrived via someone's `?ref=` link)
- `reactivate_existing: true` so re-signups don't error
- `send_welcome_email: true` so Beehiiv triggers your welcome automation

### Referrals via Beehiiv's hosted leaderboard

Beehiiv has a built-in referral programme that produces shareable links and a public leaderboard. Two ways to use it:

1. **Keep our share links as-is** (default). Our `?ref=<code>` codes work today; the field gets stored as a custom field in Beehiiv for attribution. The leaderboard endpoint stays unused.
2. **Switch to Beehiiv's referral codes**. Enable the referral programme in Beehiiv, then read `referral_code` from the create-subscription response. The provider already does this and prefers Beehiiv's code when present, so no code change is needed.

### Switching providers later

Drop a sibling adapter into `lib/providers/` (e.g. `convertkit.ts`) with the same `subscribe()` / `getSubscriberCount()` shape, then swap the import in `app/api/waitlist/route.ts` and `components/Hero.tsx`.

## Counters

- **Hero "X already on the list"** — reads `getSubscriberCount()` from the Beehiiv adapter, falls back to `FALLBACK_COUNT = 247` in `components/Hero.tsx` when Beehiiv isn't configured or the API fails. Cached 10 min.
- **Confirmation "#N in line"** — currently a stub (`248` fallback in `app/confirmed/page.tsx`, plus a small jitter from the API). Beehiiv doesn't expose a per-subscriber queue position natively; if you want a real number, the cleanest path is computing it from the subscription created-at via Beehiiv's list endpoint, or storing your own count in a DB row alongside the signup.

## Where to wire real referral logic

`lib/refCode.ts` generates a random code per submission. The confirmation page displays whatever code came back from the API. Real attribution work:

1. Persist `email → code` in your DB so refreshes stay deterministic.
2. Read `?ref=<code>` on inbound visits (already done in `WaitlistForm.tsx`) and store it on the new signup row.
3. Compute position from a join: `position = COUNT(*) WHERE created_at <= signup.created_at`.

Search the source for `TODO(referral)` for the exact spots.

## Brand voice rules baked in

- No em dashes anywhere. CI guard: `npm run lint:dashes`.
- Australian English spelling.
- Banned phrases enforced by the brand kit (see `../GymMates Design System/brand-kit.html`).

## Analytics

Not wired. When you add it (Plausible, Vercel Analytics, etc.), the conversion event hook is marked `TODO(analytics)` in `components/WaitlistForm.tsx`.

## Files of note

```
waitlist/
├── app/
│   ├── layout.tsx          metadata, fonts, OG
│   ├── page.tsx            section composition
│   ├── globals.css         brand tokens, base styles
│   ├── robots.ts
│   ├── opengraph-image.tsx 1200x630 OG, runtime-rendered
│   ├── api/waitlist/       POST stub
│   ├── confirmed/          post-signup page (referral mechanic)
│   └── privacy/            placeholder privacy
├── components/             one file per section + shared form / sticky CTA
├── lib/refCode.ts          ref code generator
├── public/                 brand assets (handshake, wordmark, favicons)
└── scripts/lint-dashes.mjs CI guard
```

## Lighthouse

Targeted at 95+ on mobile across all four pillars. Watch the network tab on the deployed build for any added third-party scripts before claiming the score; analytics SDKs and chat widgets sink it fast.
