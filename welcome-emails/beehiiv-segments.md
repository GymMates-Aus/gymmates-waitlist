# Beehiiv segments to create

Two dynamic segments that route signups from the two landing pages to two different drip flows. Paste these queries into Beehiiv → **Audience → Segments → New Segment**.

Pick **Dynamic** as the segment type so new signups flow in automatically.

---

## 1. Consumer waitlist

**Name:** `Consumer waitlist`

**Description:** `Members who joined via the consumer waitlist landing page (waitlist.gymmates.com.au). Use for the build-in-public drip and monthly behind-the-build notes.`

**WHERE clause:**

```
utm_source = 'waitlist' AND status = 'active'
```

---

## 2. Partner prospects

**Name:** `Partner prospects`

**Description:** `Gym owners who pre-registered via /partner. Sales-led drip, founding-partner messaging.`

**WHERE clause:**

```
utm_source = 'partner-waitlist' AND status = 'active'
```

---

## Why utm_source and not the audience custom field

Both work. UTM tags are first-class fields in Beehiiv's segment DSL with no UUID lookup; the `audience` custom field would require finding the field's resource ID and using `custom_field('<uuid>') = 'partner'`. Same end result, slightly more setup. Stick with utm_source unless you start sending traffic from sources that override these UTMs (e.g. ad campaigns) — at which point swap to the custom field for stability.

## After creating the segments

- Wire the **Consumer welcome** email to fire on `signup` filtered by the Consumer waitlist segment.
- Wire the **Partner welcome** email to fire on `signup` filtered by the Partner prospects segment.
- The monthly behind-the-build broadcast goes to the Consumer waitlist segment only.
- Any partner sales sequence goes to the Partner prospects segment only.
