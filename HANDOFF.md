# Morning handoff · what's done, what's left

State as I sign off. Wake up, work through the **Tomorrow** list top to bottom and you're done.

---

## ✅ Working in production

Live at <https://gymmates-watlist.netlify.app> (typo in the subdomain, fix later).

| What | Status |
|---|---|
| Consumer waitlist `/` | ✓ HTTP 200, on-brand copy, live Beehiiv count (showing 247 floor) |
| Partner pre-register `/partner` | ✓ HTTP 200, full B2B form |
| Confirmation page `/confirmed` | ✓ Ochre handshake, share buttons, referral link |
| `POST /api/waitlist` | ✓ Validates email, writes to Beehiiv, redirects to `/confirmed` |
| `POST /api/partner` | ✓ Same, with `audience: partner` and gym fields |
| Beehiiv segments | ✓ "Consumer waitlist" and "Partner prospects" both live |
| Real signups | ✓ `jess.ford.12@hotmail.com` and `jack@nextlevelfitnessechuca.com.au` both landed |
| GitHub repo | ✓ <https://github.com/GymMates-Aus/gymmates-waitlist> (public) |
| Continuous deploy on `main` push | ✓ |

## ⏳ I just pushed an OG image fix

The `/opengraph-image` route was 500-ing because Netlify's edge runtime doesn't have system fonts. Switched to fetching Plus Jakarta Sans + Work Sans Italic from jsdelivr at runtime, with a graceful fallback if the CDN's down. Should be green by the time you wake up. Verify with:

```bash
curl -sI https://gymmates-watlist.netlify.app/opengraph-image
# expect: HTTP/2 200, content-type: image/png
```

If still 500, I left a fallback path that uses the bundled default font. Worst case the image renders without italic styling — still better than broken.

---

## 🚨 Tomorrow's checklist (everything I can't do via API)

### 1. Delete the placeholder post in Beehiiv (30 sec)

You created a post titled **"Congratulations!"** at 05:18 UTC. It's a Beehiiv stock template (generic copy by "Lynn" about social media tips, free guide download CTAs) — not a GymMates welcome email. Posts also don't fire on signup; they get sent as one-off broadcasts when published.

- Beehiiv → **Posts** → find "Congratulations!" draft → click the three dots → **Delete**.

### 2. Set up the actual welcome email (5 min)

Beehiiv's welcome email is a separate feature from posts. Path:

- Beehiiv → **Settings → Publication settings** (or **Newsletter → Welcome Email** depending on your plan's UI).
- Look for **Welcome Email** / **First email after subscribe**.
- Subject: `You're in. Here's what happens next.`
- Preview text: `No long welcome PDF. Just the truth about what we're building.`
- Body: paste from [welcome-emails/consumer-welcome.md](welcome-emails/consumer-welcome.md) (already drafted in GymMates voice, no em dashes).
- Save & activate.

After it's active, every NEW signup gets it automatically. Existing subs (Jack, Jess) won't get it retroactively — that's fine.

### 3. Fix the sender details (1 min, while you're in there)

- **Settings → Publication → Sender details**:
  - From name: `GymMates`
  - Reply-to: `support@gymmates.com.au`

### 4. Set up the partner welcome email (5 min)

Different copy, different audience. Two options:

- **Easier**: a single welcome email won't work since Beehiiv's welcome is publication-wide. Use an **Automation** instead.
- Beehiiv → **Automations** → **New automation**.
- Trigger: **Newsletter list subscribed** (or `signup`).
- Add a **Filter** step: subscriber matches segment **"Partner prospects"**.
- Add a **Send email** step. Subject: `Got your pre-register. Here's the next 24 hours.`
- Body: paste from [welcome-emails/partner-welcome.md](welcome-emails/partner-welcome.md).
- Activate.

### 5. Test both welcome emails fire (3 min)

- Use a fresh email you control. Submit on `/`. Watch your inbox for the consumer welcome. Should arrive within 5 minutes.
- Use a different fresh email. Submit on `/partner`. Watch for the partner welcome.
- If either doesn't arrive, check Beehiiv → **Subscribers → [the address] → Activity** to see whether the email was sent.

### 6. Custom fields (10 min, optional but improves analytics)

Right now our API sends custom fields like `audience`, `our_ref_code`, `gym_name`, `gym_role`, `gym_town`, `gym_size`, `gym_notes`, `referred_by`. Beehiiv silently ignores them because they don't exist as defined fields. To capture them:

- Beehiiv → **Audience → Custom fields → New field**, create each:
  - `audience` (string)
  - `our_ref_code` (string)
  - `referred_by` (string)
  - `gym_name` (string)
  - `gym_role` (string)
  - `gym_town` (string)
  - `gym_size` (string)
  - `gym_notes` (string)

After they're created, all FUTURE signups will populate them. Past signups stay empty unless you backfill manually.

### 7. Custom domain (5 min)

Free tier Netlify allows custom domains.

- Netlify → **Site configuration → Domains → Add a domain**.
- Add `waitlist.gymmates.com.au`.
- Netlify shows a CNAME (`apex-loadbalancer.netlify.com` or similar). Add that record at your domain registrar (likely Crazy Domains or GoDaddy if `.com.au`) as a CNAME for `waitlist`.
- TTL: 3600 or default.
- SSL auto-issues within ~30 minutes once DNS resolves.
- Optional: add `partner.gymmates.com.au` too. In **Domain settings → Redirects** add: `partner.gymmates.com.au/* https://waitlist.gymmates.com.au/partner:splat 301`.

### 8. Fix the subdomain typo (30 sec)

The current Netlify URL has "watlist" not "waitlist".

- Netlify → **Site configuration → General → Site details → Change site name**.
- New name: `gymmates-waitlist`.
- New URL becomes `https://gymmates-waitlist.netlify.app`. Update anywhere you've shared the link.

---

## 📂 Files I touched this session

- `app/opengraph-image.tsx` — CDN fonts, copy synced with new hero
- `netlify.toml` — added `SECRETS_SCAN_OMIT_KEYS = "BEEHIIV_PUBLICATION_ID"`
- This file — `HANDOFF.md`

All committed and pushed to `main`. Deploy auto-runs on Netlify.

---

## 🧠 Stuff I didn't touch (and why)

- **The "Congratulations!" draft in Beehiiv** — I have read access via MCP, no write/delete. You'll do this in the UI.
- **Welcome email creation** — Beehiiv API doesn't expose welcome email config. UI-only.
- **Automation creation** — same, UI-only.
- **Custom field creation** — same.
- **Vercel** — abandoned, Netlify is your platform.

When you're back, work the checklist above. Total time start-to-finish should be ~30 min.

If anything's broken when you return, hit me with the symptom and I'll dig in. Status of the Beehiiv side, the Netlify build, and the GitHub repo can all be inspected via MCP and `gh` CLI when you ping me.

Sleep well.
