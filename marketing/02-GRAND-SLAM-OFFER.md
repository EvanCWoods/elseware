# 02 — The Grand Slam Offer

> An offer so good people feel stupid saying no.

This document applies Hormozi's `$100M Offers` framework specifically to Elseware. The deliverable is the *exact* offer copy, the bonus stack, the guarantee, the naming, and the urgency mechanism we ship in the app and on every Reel.

---

## The Value Equation (Hormozi)

`Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)`

How Elseware scores on each lever, and what we do about it:

### 1. Dream outcome — MAX
Dream outcome of the ICP: **"I want to lock in for 90 minutes and feel like the version of myself I want to be."** Not "I want focus music." That's a feature. The dream is *identity*, *flow state*, *productive aesthetic*. We sell the dream every single sentence.

**Lever:** Reframe every product feature as a piece of the locked-in identity. "Save your mixes" → "Build the soundtrack of your discipline."

### 2. Perceived likelihood — MAX
The user has to believe Elseware will *actually* deliver the outcome. We earn that with:
- Specific, named places (not "rain sounds 1") = credibility through specificity.
- 60-day money-back guarantee = risk reversal.
- Apple App Store reviews = social proof.
- Aesthetically polished IG content = the brand telegraphs that we sweat the details.

**Lever:** Every Reel must show a real, live use case with the app on screen. No mockups. No promises. Show, don't tell.

### 3. Time delay — MIN
Time from purchase to dream outcome must be *seconds*. The app has to deliver the atmosphere within 30 seconds of launch.

**Lever:** First-launch UX: tap "Tokyo Kissaten" → the place starts. No tutorial, no email, no signup. Audio in 3 taps.

### 4. Effort & sacrifice — MIN
Cost: $9.99 once. No subscription. No login. No friction. No data harvesting that the user has to understand.

**Lever:** "One purchase. Yours forever." This phrase is the single most-conversion-driving sentence we own. It goes everywhere.

---

## The core offer

```
ELSEWARE — Lifetime Unlock

Unlock all 18 sound channels. Mix up to all 18 at once.
Save unlimited custom mixes. Background playback.
Six places shipped, four new places per quarter, free forever.

$9.99. One time. Yours forever.
```

Note: anchor the price *against subscriptions*, not against "free." We are competing with Endel ($99/yr) and Brain.fm ($99/yr), not with free white-noise apps.

---

## The bonus stack

Every bonus is something we can produce in 1–3 days of work that has high *perceived* value relative to production cost. This is the Hormozi multiplier.

| # | Bonus | Stated Value | What it is | Production cost (us) |
|---|---|---|---|---|
| 1 | **The Locked-In Preset Pack** (4 secret places) | $19 | 4 unlock-on-purchase preset places not visible until purchased: "Reykjavik 4am," "Kyoto Tea House," "Marfa Desert," "Berlin Backroom." | 4hrs of preset design |
| 2 | **The Lock-In Wallpapers** (12 phone wallpapers) | $12 | 12 hand-designed iOS wallpapers featuring each preset. Delivered as a single 1-tap iCloud link. | shipped — `assets/wallpapers/*.svg` via `npm run gen:wallpapers` |
| 3 | **The 90-Minute Focus Timer** (in-app module) | $19 | A pomodoro/deep-work timer built into the app. Starts the audio with the timer. Vibrates at the end. | shipped — `src/components/FocusTimer.tsx` + `src/hooks/useFocusTimer.ts` |
| 4 | **The Locked-In Welcome Email** | $0 (but framed as $9 of "ritual setup") | A single beautiful email that arrives 1hr after install with the "lock-in protocol" — a 200-word ritual for using the app daily. | 1 hour of writing |
| 5 | **Future Places, Free Forever** | $48 ($12/quarter) | Quarterly drops of new places. "Marrakech rooftop." "Reykjavik café." Ships free to lifetime owners forever. | The work we'd do anyway |

**Total stack value: $107 in bonuses.**
**Core offer: Elseware Lifetime Unlock — usually you'd think this is a $40+ one-time app.**
**Total perceived value: ~$147+. Price: $9.99.**

The math we put in the paywall and on IG:

> Worth more than $100. Yours for $9.99. Once.

---

## The guarantee — the "Lock-In Guarantee"

A 60-day, unconditional, no-questions-asked refund:

> **The Lock-In Guarantee.** Use Elseware for 60 days. If you don't lock in deeper, longer, or more often than you did without it — email us "didn't lock in" and we refund you. Keep the bonuses. Keep the wallpapers. Keep the preset pack. We only want users who become regulars.

**Why this works:**
- Apple's own refund policy makes this technically free for us — they refund anyway.
- "Keep the bonuses" is an asymmetric promise. The user perceives risk reversal; we deliver no actual marginal cost (digital goods).
- Phrased as *belief in the product*, not *fear of refunds*. The guarantee itself is brand voice.

**Implementation:** A simple `mailto:refund@elseware.app` link in the app's settings. Reply within 24h. Confirm with Apple. Done.

---

## Urgency & scarcity (honest, not fake)

Hormozi: real scarcity outperforms fake scarcity. We use real constraints.

### Urgency lever 1 — Quarterly Place Drops
Every quarter we ship new places. If you own Lifetime before the drop, you get them free forever. If you wait, you might still get them free, but the social-pressure framing on IG is: "Lock-in price is locked in once. We may raise it next quarter."

### Urgency lever 2 — Founding 1,000
The first 1,000 lifetime unlocks get a one-time "Founder" badge in-app and their handle (if they DM us) listed on a single page on the website (`elseware.app/founders`). This is a real, capped, finite scarcity event.

### Urgency lever 3 — Price ladder
We launch at $9.99. We *publicly commit* on IG and the App Store description that the price will rise to $14.99 once we hit 5,000 lifetime unlocks. This is honest scarcity. Price-anchoring increases urgency for the next 5,000 immediately.

> Honest scarcity outperforms fake scarcity over time. We pre-commit publicly and we follow through.

---

## Naming — the MAGIC formula applied

Hormozi's MAGIC formula: **M**agnet, **A**vatar, **G**oal, **I**nterval, **C**ontainer.

Applied:
- **Magnet:** "The Lock-In..."
- **Avatar:** "...Locked-In Generation..." or "...Pre-LSAT Junior..." (we adapt by audience segment)
- **Goal:** "...90-Minute Deep Work Soundtrack"
- **Interval:** "(daily / 90-min / 6-month bar exam)"
- **Container:** "Pack" / "Protocol" / "Ritual" / "Toolkit"

### Three named offers we will run

1. **"The Lock-In Toolkit for the Locked-In Generation"** — IG campaign hero offer name. Used in pinned post, bio, ad creative.

2. **"The 90-Minute Deep Work Ritual Pack"** — for Maya / Sarah audience. LSAT prep, MFA writing, dissertation people. Used in campaigns targeting study/academic Reels.

3. **"The 1am Founder's Sound Studio"** — for David. Used in campaigns targeting startup/dev/product people on IG and X cross-post.

Each name is a pointer to the same product (Lifetime Unlock at $9.99) but framed for a different identity.

---

## The exact paywall copy (ship this)

This is what shows in the app's PaywallModal. Replace current copy with this verbatim.

```
UNLOCK ELSEWARE LIFETIME

One purchase. Yours forever.
No subscription. Ever.

— Mix all 18 channels at once
— Save unlimited mixes
— Background playback
— The Locked-In Preset Pack (4 secret places)
— Wallpapers, focus timer, future places — free forever

— — —

Worth $147. Yours for $9.99.

[ UNLOCK FOREVER — $9.99 ]

The Lock-In Guarantee:
60 days. Lock in deeper or your money back.
Keep the bonuses regardless.

Restore Purchase
```

---

## The exact App Store description (ship this)

This is what shows on the App Store listing. Replace current copy. (See `07-FUNNEL-AND-ASO.md` for keyword strategy.)

```
ELSEWARE — Put yourself somewhere.

The audio uniform of locking in. One purchase. Yours forever.

Choose a place — Tokyo Kissaten, Lisbon Rainstorm, Library in Seoul,
Trans-Siberian, Bali Morning, Tulum Beachfront — and you're there.

Mix lo-fi, jazz, classical, synthwave, ambient, piano with rain,
thunderstorm, coffee shop, fireplace, train, chatter, wind, birds,
ocean, typing, vinyl crackle, and city traffic. Build your atmosphere.
Save your mixes. Lock in.

— 18 hand-curated sound channels
— 6 places to start, more added quarterly
— Save unlimited custom mixes
— Background playback while you study, write, build
— No ads. No subscription. No login.

Made for the Locked-In Generation. One purchase. Yours forever.

The Lock-In Guarantee — 60 days. Lock in deeper or money back.

elseware.app
```

---

## How the offer compounds (not just one sale)

Every Lifetime Unlock buyer is a **brand asset**, not a one-time transaction. Here's the LTV reframe:

1. **Word of mouth.** Subscription users are silent. Lifetime users *brag* about owning the app. Every unlock is a free creator.
2. **Future products.** When Block Software ships a second app, every Lifetime user is a warm prelaunch list. Tag them in the welcome email database; build the launch list now.
3. **Place drops as content marketing.** Every quarter's new place becomes a new round of Reels: "Reykjavik 4am just dropped — free if you own Lifetime, $9.99 otherwise." That's a new growth event four times a year, perpetually.

The offer is a flywheel, not a transaction.

---

## What's shipped vs what's the operator's job

**Shipped in the codebase (verify, don't rebuild):**
1. `PaywallModal.tsx` copy matches the exact text above.
2. The 4 Locked-In Preset Pack secret presets in `src/config/presets.ts` (`lifetimeOnly: true` flag) — gating in `MixerScreen.tsx` routes to paywall on tap.
3. The 90-minute focus timer at `src/components/FocusTimer.tsx` + `src/hooks/useFocusTimer.ts` — locked card for free users, 25/45/90-min buttons for unlocked users.
4. The 12 wallpaper SVGs at `assets/wallpapers/` (regenerate with `npm run gen:wallpapers`).
5. The 8 App Store screenshots at `assets/app-store/` (regenerate with `npm run gen:app-store`).
6. The Founders Wall page at `website/founders.html` (re-render with `npm run render:founders` after editing `scripts/founders.json`).
7. The post-purchase email-capture card at `src/components/EmailCaptureCard.tsx` so the welcome-email webhook has a recipient.

**Operator's job (one-time):**
1. Convert SVGs → PNGs (`brew install librsvg && rsvg-convert …` per each `assets/*/README.md`).
2. Stand up `welcome@elseware.app` and `refund@elseware.app` mailboxes + transactional sender (Postmark/Resend).
3. Deploy a serverless webhook endpoint per `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 5d.
4. Update App Store Connect with the strings from `marketing/10-APP-STORE-COPY-TO-SHIP.md`.
5. Upload the screenshot PNGs.
6. Submit for review.

**Estimated active operator time:** 4–6 hours of clicking, plus Apple's 24–48hr review wait. The plan is worthless if the offer the user lands on doesn't match the offer they see on IG.

---

Read `03-INSTAGRAM-STRATEGY.md` next. That's where this offer becomes a media campaign.
