# Partner pre-register · welcome email

For gym owners who pre-register at `/partner`. Different framing entirely from the consumer email: this is sales-led, calendar-led, and short.

Paste into Beehiiv as an automation triggered on `signup` filtered by the **Partner prospects** segment, OR as a separate welcome email if Beehiiv supports per-segment welcome emails on your tier.

---

**From name:** GymMates
**Reply-to:** support@gymmates.com.au
**Subject:** Got your pre-register. Here's the next 24 hours.
**Preview text:** Your founding-partner spot is held for seven days.

---

Hi {{first_name}},

Got your pre-register for **{{custom_field.gym_name}}**. Cheers.

Here's what happens next:

1. **Within 24 hours.** I'll email you to book a 15-minute call. No deck, no demo. We just talk through how it'd run at your gym, what your retention pain looks like, and whether GymMates is the right tool. If it's not, I'll say so.
2. **Within 7 days.** Your founding-partner spot is held. After that it goes back into the pool. There are 30 of these, total. Locked at today's pricing for 24 months.
3. **Onboarding when we launch.** One session, on-site at your gym. We bring iPads. Members install the app, fill out the five-minute intake, and the matching runs that night. You get a dashboard to watch retention move.

If you want to skip ahead and book the call now: [**grab a 15-minute slot →**](#TODO_CALENDAR_LINK)

Reply to this email if you've got a question that's bugging you. Or text me on 0400 000 000 (TODO: real number).

Talk soon.

Jack
Co-founder, GymMates
Owner, Next Level Echuca

---

## Notes for setup

- **Token names** — Beehiiv merge tags. `{{first_name}}` is standard; the gym-name custom field token is `{{custom_field.gym_name}}` or similar (check Beehiiv → Custom Fields → click the field → copy merge tag). Swap as needed.
- **Calendar link** — replace `#TODO_CALENDAR_LINK` with your Calendly / Cal.com / SavvyCal URL when you have one. Until then, leave the line out and the reply-to absorbs the bookings.
- **Phone number** — the line above is a placeholder. Replace with your real mobile or remove entirely.
- **Tone audit** — no em dashes. Australian English. The B2B page uses "TRAIN" and "EXERCISE" as appropriate per audience-language rule (CLAUDE.md), but this email keeps it neutral since it's read by gym owners, not members.

## After the welcome email, what to send next?

A short partner drip. Something like:

| Day | Subject | One-line purpose |
|---|---|---|
| 0 | Got your pre-register. Here's the next 24 hours. | This file. |
| 2 | A 4-min walkthrough of the GymMates club dashboard | Loom link. Keeps you in their inbox without asking for time. |
| 5 | "Most gyms tell us this is the bit they didn't expect" | Hook on retention insight from our own gym. |
| 9 | Founding partner spots remaining: {{counter}} | Urgency without being thirsty. |
| 14 | Last call before your hold expires | Respectful close. |

I can draft the rest of those when you want them.
