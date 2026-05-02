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

## Where to plug in the email service

`app/api/waitlist/route.ts` is a stub that:

- validates the email,
- discards anything that filled the honeypot,
- generates a fake referral code,
- returns a fake position.

To wire a real provider:

- **ConvertKit** — POST to `https://api.convertkit.com/v3/forms/<form_id>/subscribe` with `api_key` from env. Replace the `console.log(...)` line.
- **Beehiiv** — POST to `https://api.beehiiv.com/v2/publications/<pub_id>/subscriptions` with the API key from env.
- **Resend (with your own DB)** — write the row to your DB inside the route, send the welcome email via Resend.

Mark the secrets in `.env.local`:

```
WAITLIST_PROVIDER_API_KEY=...
WAITLIST_FORM_ID=...
```

…and read them via `process.env.*` inside the route handler.

## Where to update the waitlist counter

Two places, both currently hardcoded:

| Spot | File | Constant |
|---|---|---|
| Hero "247 already on the list" | `components/Hero.tsx` | `HARDCODED_COUNT` |
| Confirmation "#248 in line" fallback | `app/confirmed/page.tsx` | the `248` literal |

Both are tagged `TODO(counter)`. The cleanest path is to expose a `GET /api/waitlist` that returns `{ count }`, then read it in a server component (`Hero`) at request time.

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
