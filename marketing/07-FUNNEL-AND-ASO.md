# 07 — Funnel & ASO

> Reels are leads. Profile is the bridge. App Store is the close. We engineer every step.

---

## The full funnel (high-level)

```
Reel impression  →  3-second hold  →  Save / Share / Profile-visit
                                                        │
                                                        ▼
                                          Profile (bio, grid, Highlights)
                                                        │
                                                        ▼
                                          Bio link (elseware.app/links — self-hosted)
                                                        │
                                                        ▼
                                          Tracked link → App Store
                                                        │
                                                        ▼
                                          App Store listing (icon, screenshots, description)
                                                        │
                                                        ▼
                                          Install
                                                        │
                                                        ▼
                                          First open (3-second-or-less to first sound)
                                                        │
                                                        ▼
                                          Soft paywall trigger (4th channel layered)
                                                        │
                                                        ▼
                                          Lifetime Unlock — $9.99
```

Every step has a **target conversion rate**. Below the floor, we fix. Above the target, we celebrate and try to clone.

| Step | Floor | Target |
|---|---|---|
| Reel → save+share rate | 4% combined | 8%+ |
| Save → profile visit (per IG analytics) | 8% | 15% |
| Profile visit → follow | 5% | 10% |
| Profile visit → bio link click | 3% | 7% |
| Bio click → App Store impression | 80% | 95% |
| App Store impression → install | 25% | 40% |
| Install → paywall view | 60% | 80% |
| Paywall view → unlock | 8% | 15% |
| **Reel view → unlock (end-to-end)** | **0.04%** | **0.2%** |

A 0.2% end-to-end conversion at 1M Reel views = **2,000 unlocks at $9.99 = ~$14k net.**

---

## Step 1 — Reel-level conversion (covered in `03-INSTAGRAM-STRATEGY.md` and `05-…SCRIPT-BANK.md`)

The hook engineering, save engineering, share engineering are all there. Don't repeat.

The new piece for *funnel* purposes: **every Reel must give the viewer a reason to click the bio.** Three CTA archetypes:

1. **The "I want it" CTA.** "$9.99 once. link in bio." Used on Pillar 2 (Soundscape POV) Reels.
2. **The "I want the bonus" CTA.** "12 wallpapers free with the app. link in bio." Used on Pillar 3 (Aesthetic) Reels.
3. **The "save for later" CTA.** No bio click; saves itself. Used on Pillar 1 (Lock-In Meme) Reels — these don't need to drive bio clicks; they need to drive followers.

**Mix:** roughly 40% of Reels have an "I want it" CTA; 25% have an "I want the bonus" CTA; 35% have only "save for later."

---

## Step 2 — Profile bridge

The profile is the conversion machine, not the bio. Every visitor sees:

- Bio: *"the audio uniform of locking in. one purchase. yours forever. ↓ get the app"*
- Profile pic: clean cream "E" wordmark.
- Single bio link → bio page.
- Grid (first 9 posts): rotating, but always cohesive. The first 9 are the "store front."
- Highlights (5 always): Places, Mixes, Founders, Stack, Updates.
- Featured Reels (3): pin the top-3 best-performing Reels.

**Pinned Reels rule:** every Sunday batch, re-evaluate which 3 Reels to pin. Always pin (1) the highest-converting Pillar 2 Reel (Soundscape POV), (2) the highest-saved Pillar 1 Reel (Lock-In Meme), (3) the most recent Pillar 3 Reel that ties to the current bonus drop.

---

## Step 3 — The bio link page (self-hosted at `elseware.app/links`)

We **don't use Beacons or Linktree.** We ship our own page at `website/links.html` (served at `elseware.app/links` via Vercel's `cleanUrls`). Three reasons:
1. No subscription. (We don't preach the gospel of one-time purchases while paying $9/mo to a link aggregator.)
2. Brand consistency — same cream + serif typography as the App Store screenshots and the in-app paywall.
3. Built-in iOS auto-redirect to App Store with UTM-pass-through.

Page structure (already shipped):

```
ELSEWARE
put yourself somewhere.
the audio uniform of locking in.
one purchase. yours forever.

[ Get Elseware on the App Store ]       (primary; iOS auto-redirects in 250ms unless ?stay=1)
[ See the 6 Places                  →]
[ Read the Lock-In Protocol         →]
[ Founders Wall                     →]
[ DM us on Instagram               ↗ ]   (ig.me/m/elseware deeplink)
```

The page reads UTM query parameters and forwards them onto the App Store link, so a Reel CTA like `elseware.app/links?utm_campaign=reel_007` flows attribution all the way into Apple Analytics. If no UTM is provided, the page defaults to `utm_source=instagram&utm_medium=bio`.

To preview the page on iOS without auto-redirect: `elseware.app/links?stay=1`.

---

## Step 4 — App Store listing (this is where most apps die)

### App Store Connect — what we ship

**App Name (30 chars):** `Elseware: Lock-In Audio`
**Subtitle (30 chars):** `Sounds for deep work & focus`

(Apple matches keywords from the Title and Subtitle 2x weighted vs the keyword field. We use both wisely.)

**Keyword Field (100 chars exact):**
```
focus,study,sound,ambient,rain,coffee,lofi,jazz,white,noise,sleep,relax,deep,work,locked,in
```

**Promotional Text (170 chars, can update without re-review):**
```
The audio uniform of locking in. One purchase. Yours forever.
6 hand-built places. 18 channels. No subscription. The Lock-In Guarantee.
```

**Description (4000 chars):** see `02-GRAND-SLAM-OFFER.md` for the body text. We optimize for the *first 3 lines* because that's all anyone reads:

```
ELSEWARE — Put yourself somewhere.

The audio uniform of locking in. One purchase. Yours forever.
No subscription. No login. No ads. Ever.
```

### Screenshots — the conversion lever

Apple says 65% of installs come from keyword search. Of those, *almost all* convert based on screenshots without reading description. So screenshots are the real product page.

**Screenshot stack (8 total, in this exact order):**

1. **Headline screenshot** — Hero. Pure cream background. Big serif headline: *"Put yourself somewhere."* Below it: a single phone bezel showing "Tokyo Kissaten" preset playing. Caption underneath: *"6 hand-built places. 18 channels."*
2. **Place gallery** — Cream background, 2x3 grid of all 6 place names with associated time-of-day icons. Caption: *"Pick a place. Lock in."*
3. **Mixer detail** — Show the mixer screen from the app (the existing `MixerScreen.tsx`). Caption: *"Mix any of 18 channels at once."*
4. **Save mix** — Show the "save" interaction. Caption: *"Save unlimited mixes. Yours forever."*
5. **One purchase, no subscription** — Big text: *"$9.99. Once. Yours forever."* Below: small comparison: "Endel: $99/yr. Brain.fm: $99/yr. Calm: $69.99/yr. Elseware: $9.99 once."
6. **The Lock-In Guarantee** — Big text: *"60-day money-back guarantee."* Sub: *"Lock in deeper or your money back. Keep the bonuses regardless."*
7. **Bonuses revealed** — Mini grid: wallpapers, focus timer, secret presets, Founders Wall. Caption: *"$147 of stuff. Yours for $9.99."*
8. **Brand close** — Cream background, single line: *"elseware. lock in."*

These are shipped as SVG sources at `assets/app-store/01-08-*.svg` (regenerate with `npm run gen:app-store`). Same brand system as the IG profile — visual continuity across IG → App Store is itself a conversion lever. Convert to PNG before uploading via `rsvg-convert` (see `assets/app-store/README.md`).

### App Preview video (15 seconds)

We ship one App Preview video. Same content as Reel #14 (the day-in-elseware long Reel) trimmed to 15s.

---

## Step 5 — Keyword strategy & ASO mechanics

### Primary keyword targets (rank top-30 within 60 days)

These are the keywords we hunt. Each is realistic for an indie app with the right metadata.

| Keyword | Estimated US iOS difficulty | Why we hunt it |
|---|---|---|
| `lock in` | low (under-targeted by ambient apps) | brand-anchor; the entire campaign trains users to search this |
| `focus sounds` | medium | high intent, fits product |
| `rain sounds` | high but we can rank top-30 with reviews | volume play |
| `coffee shop sounds` | low-medium | unique fit; we have a Tokyo Kissaten preset |
| `study sounds` | medium-high | direct ICP |
| `lofi study` | medium | trending; we have the lo-fi channel |
| `ambient mixer` | low | exact-fit |
| `sound mixer focus` | low | exact-fit |
| `deep work music` | medium | high intent |

### Long-tail bets (rank top-10 fast)

| Keyword | Why |
|---|---|
| `audio for locking in` | brand-driven, will rank top-3 within 2 weeks of campaign |
| `sounds like a tokyo cafe` | poetic, unique to us |
| `study sound mixer one time purchase` | rare format, easy ranking |

### Review and rating velocity

Apple ranks apps higher based on rating velocity (new reviews in last 30 days). Tactics:

1. **In-app review prompt** triggers on day 7 of usage if the user has saved at least 2 mixes (high-engagement segment).
2. **Founders email** asks for an honest review on day 14.
3. **DM nudge** to engaged IG followers who have purchased: "if Elseware locked you in this week, an App Store review would be huge."

We never beg. We ask once. We thank everyone who reviews.

### A/B testing on Apple's Product Page Optimization (PPO)

Apple now lets us run up to 3 variants of icon, screenshots, and preview. We run:

- **PPO test 1 (week 4–7):** screenshot order — does Place Gallery slide 2 outperform "$9.99 once"?
- **PPO test 2 (week 8–11):** icon — does the soft serif "E" outperform a 6-place mosaic icon?
- **PPO test 3 (week 12–15):** subtitle — "Sounds for deep work & focus" vs "Soundscapes for the locked-in"?

One test at a time. 90% confidence floor before declaring a winner.

---

## Step 6 — In-app conversion (where we close)

The user has installed. Now we have ~3 minutes before they decide if Elseware is part of their life.

### First-launch UX (ship this if not already)

1. **Skip onboarding entirely.** No "welcome" screens. Open → mixer → tap a place.
2. **Default place: Tokyo Kissaten.** Plays automatically on first launch.
3. **First text on screen:** the place name as a quiet caption. Nothing else.
4. **Show the brand promise once,** as a 2-second pop-over the first time the user pauses: *"put yourself somewhere."*

### Paywall trigger (the conversion moment)

Currently the paywall blocks at "save your mixes." That's *too late*. The peak desire is when the user is *adding* their 4th channel — they're building atmosphere and feeling the product work.

**Recommended change to `MixerScreen.tsx`:** when free user has >3 channels at non-zero volume, show a non-blocking banner: *"this is the moment lifetime owners save it forever."* On 5th channel attempt, show the PaywallModal.

This is **conversion-grade** because it triggers on the user's most-engaged moment, not their most-frustrated.

### Soft paywall on bonus presets

The 4 secret presets (Reykjavik, Kyoto, Marfa, Berlin) appear in the place list with a small lock icon. Tapping shows a 5-second preview (loud audio), then fades + shows the paywall with text: *"unlock all 4 secret places + the rest of the toolkit. $9.99 once."*

Sampling drives conversion better than hiding does.

### Restore Purchase

The Restore button is in the paywall. We also surface it in Settings. Critical for the lifetime model — users will switch phones every 2 years and need to restore. Failing this = refund + bad review.

---

## Step 7 — Post-purchase

### The welcome email (auto-send)

Triggered 1 hour after purchase. Sent from `welcome@elseware.app`. Plain-text, no HTML, no images. Voice-on-brand.

```
Subject: you're in.

hi —

you just unlocked elseware. one purchase. yours forever.

three things for the first week:

1. the protocol — try the 90-minute lock-in once a day for 7 days.
   open the app. pick a place. start the focus timer (now unlocked for you).
   90 minutes, no checking the phone.

2. the wallpapers — 12 of them. one per place. download them here:
   [iCloud link]

3. the founders wall — first 1,000 lifetime owners get listed publicly.
   reply to this email with your IG handle (or X handle, or just your name)
   and we'll add you. price goes to $14.99 at #5,001.

we built elseware for ourselves first. now you have it too.

lock in.

— e
elseware.app
```

### The 30-day check-in (auto-send)

Single email, day 30:

```
Subject: 30 days in.

hi —

it's been 30 days since you unlocked elseware.

if it locked you in: an honest app store review would be huge.
if it didn't: refund@elseware.app, no questions asked, keep the bonuses.

next preset drop: reykjavik 4am. coming this quarter. free for you.

lock in.

— e
```

That's it. Two emails. No newsletter. No "engagement series." Subscription fatigue is the enemy and we don't violate that energy in our own emails.

---

## Step 8 — Attribution (so we know what's actually working)

### Tools (cheap stack)

- **App Store Connect** — install attribution by source (Apple's keyword vs other).
- **RevenueCat** (already in app per `package.json`) — subscription/purchase analytics, free tier under $10k MRR.
- **UTM pass-through** on `elseware.app/links` (already shipped). Append `?utm_campaign=reel_NNN` to bio link per campaign; UTM params are forwarded onto the App Store link automatically.
- **Google Analytics 4** on `elseware.app` — track `/links` page hits, founder page visits.
- **Apple Analytics** — for App Store impressions/installs by source.

### The attribution table

For every paid unlock, we want to know:

| Field | Source |
|---|---|
| Was it from IG? | Did Branch link fire? |
| Which Reel? | UTM campaign |
| Which day in funnel? | First-touch vs last-touch |
| Did they save before installing? | DM-based survey on day 7 |

This is enough attribution. We don't over-engineer.

### Weekly attribution review

Sunday Block A includes 10 minutes for: "of last week's unlocks, how many came from each Reel campaign?" If a campaign isn't producing unlocks, we kill its CTAs and shift to a different mix.

---

## Step 9 — Press & editorial (Month 2+)

We do not pitch press in Month 1. The asset isn't strong enough yet. Once we have:

- 25k IG followers
- 1 viral Reel
- 500 unlocks
- 5+ App Store reviews

…then we pitch:

1. **Product Hunt** — relaunch the app on PH with the new positioning. Aim for top 5 of day. We've already shipped, so this is a "rebranded" launch.
2. **App-focused newsletters** — Indie Hackers, Lenny's Newsletter, The Sweet Setup, Ben's Bites. Personal pitch, no PR firm.
3. **iOS reviewers on YouTube** — MacStories, MacRumors, AppleInsider. One personal email each, with a free Lifetime Unlock for review purposes.
4. **iOS press** — Apple App of the Day pitch via App Store Connect. Aesthetic-first apps win this regularly.

We do not chase NYT, WIRED, or GQ until we have a story to tell beyond launch. The story comes at 50k+ unlocks: "The indie iOS app that ate the focus-music subscription market."

---

## Step 10 — Paid acquisition (Month 4+, only if organic is working)

If organic ROAS is positive (CAC under $7 net per unlock at $7 net contribution), we test paid:

- **IG ads (Reels placement only)** — reuse the top 3 organic Reels as paid creatives. $20/day to start.
- **TikTok Spark Ads** — boost the same Reel as a Spark Ad. $20/day to start.
- **Apple Search Ads** — bid on the long-tail keywords (`audio for locking in`, `study sound mixer one time purchase`). $20/day cap.

Total paid test budget: $60/day for 14 days = $840. If CAC ends up under $7 organically already, paid is bonus. If paid CAC is under $5, we scale to $200/day.

We never run paid for the sake of running paid. The organic engine is the moat.

---

Read `08-KPIS-AND-DECISIONS.md` next. That's where we decide what to keep and what to kill.
