# 03 — Instagram Strategy (the brand bible for @elseware)

> Instagram is the channel where the locked-in identity *forms*. Win Instagram and you don't need any other channel.

This document is the operating manual for `@elseware` on Instagram. Visual system, voice, content pillars, growth loops, account hygiene, and the engineering of *saves and shares* — the only metrics that matter on Reels in 2026.

---

## Why Instagram, not TikTok (a deliberate choice)

We will cross-post to TikTok and YouTube Shorts (free leverage) but **Instagram is the home base.** Reasons:

1. **Aesthetic-first audience.** Instagram users come to Instagram to curate identity. TikTok users come to be entertained. Identity > entertainment for our funnel.
2. **Reels deliver 1.3× higher conversion to purchase than TikTok** for ecommerce/app brands.
3. **DM-driven distribution.** IG 2026 weights DM-shares as the #1 distribution signal. We optimize for that.
4. **The "save" mechanic.** IG users save Reels and carousels to private collections. Our content is *exactly* what gets saved (presets, wallpapers, study setups). TikTok has no equivalent.
5. **Discovery > entertainment.** Maya/David/Sarah open IG in search of the version of themselves they want to become. We are that version.

We are NOT abandoning TikTok or YouTube Shorts. We *cross-post natively* (re-shoot vertical, no watermarks) but the content is *engineered for IG* and the cross-post is bonus impressions.

---

## Account hygiene (do this first, today)

Before a single piece of content ships:

1. **Handle:** `@elseware` (claim it now if not already).
2. **Display name:** "Elseware — Put yourself somewhere"
3. **Bio (160 chars exact):**
```
the audio uniform of locking in.
one purchase. yours forever.
↓ get the app
```
4. **Profile photo:** A 1024×1024 cream-on-cream "E" wordmark on `#f4f1ec` background. Generated from the existing app icon. Single character, soft serif.
5. **Link in bio:** `elseware.app/links` — our self-hosted bio page (`website/links.html`). Auto-redirects iOS visitors to the App Store, forwards `utm_*` query params for attribution. Per Reel campaign, append `?utm_campaign=reel_NNN`. No Beacons/Linktree subscription. (See `07-FUNNEL-AND-ASO.md` Step 3.)
6. **Highlights (set up day 1):**
   - "Places" — preset reveals
   - "Mixes" — user-shared setups
   - "Founders" — first 1k unlocks
   - "Stack" — bonus pack reveals
   - "Updates" — new drops
7. **Grid plan:** First 9 posts must be cohesive. We pre-build all 9 before launching publicly. (Cover image of profile = first impression conversion.)
8. **Settings:**
   - Business / Creator account on day 1 (we need analytics).
   - Cross-posting to Threads + Facebook ON (free leverage).
   - DMs open. Quick replies pre-loaded (see `06-DAILY-OPS-PLAYBOOK.md`).
   - "Hide like counts on others" OFF (we want to see comp numbers).

---

## Visual system — the brand bible

The visual rule that unifies everything: **warm, calm, sparse, intentional.** If a frame doesn't read as *quietly disciplined*, it's wrong.

### Palette (locked, never changes)

| Token | Hex | Use |
|---|---|---|
| `bg-cream` | `#f4f1ec` | Default background, IG carousels, app shell |
| `bg-warm` | `#ede8df` | Card surfaces, secondary panels |
| `text-primary` | `#2e2a24` | Headlines, body |
| `text-muted` | `#7a6f60` | Subtitles, supporting copy |
| `accent-burnt` | `#b15c2a` | Single accent — buttons, CTAs, brand wordmark in dark mode |
| `accent-soft` | `#e6d3bc` | Hover states, soft fills |
| `night` | `#1a1714` | Dark-mode hero shots only |

No other colors. No gradients except in app/photo overlays. No black, no pure white.

### Typography

- **Wordmark / hero:** A clean modern serif (e.g. Editorial New, GT Sectra, or self-hosted Fraunces). 1 weight, 1 style.
- **Body / captions on graphics:** A neutral grotesque (Inter, GT America). Light to medium weight. Generous tracking.
- **Tone of typography:** like a New Yorker pull-quote, not like a startup landing page.

### Layout rules for Reels

1. **First frame must read at 1.7 seconds.** Cold-stop hook, large readable text, single visual anchor. Background defocused, text in bg-cream or text-primary, never both.
2. **Aspect ratio always 9:16, 1080×1920.** No exceptions. Never re-upload a square.
3. **Captions on screen always.** 80%+ of viewers watch with sound off, but the *audio* is the actual product, so we use captions to make the audio *feel earned*. Caption "Tokyo Kissaten — light rain, lo-fi, distant chatter, vinyl crackle" while playing the soundscape.
4. **Length: 7–22 seconds default.** Under 30s outperforms for cold-traffic discovery. We make ONE long Reel per week (45–60s) for narrative content.
5. **Loop-engineered.** First and last frame are visually identical so the Reel reads as one infinite loop. Algorithm rewards loop-watches.
6. **Brand mark always in lower-right last 3 seconds.** Subtle. ~15% opacity overlay. "elseware.app" in the corner.

### Layout rules for carousels

- 4:5 ratio, 1080×1350.
- Slide 1 = the *quote*. A single sentence, generous margins, serif headline. No app shown.
- Slide 2–6 = *places*. One place per slide. Photo of the place (sourced from licensed Unsplash + curated) with text overlay: "Tokyo Kissaten — 56°F, 11pm, light rain"
- Last slide = quiet CTA. "elseware. one purchase. yours forever."
- Carousels save like crazy on IG; this is our highest-save content format.

### Layout rules for Stories

- 1:1 ratio of effort: 50% repurposed Reel cuts, 50% behind-the-scenes (sound recording, preset designing, "what I'm working on at 1am" first-person).
- One Story-native poll/question/quiz per day (algo loves Story interactions — saves replies as DM-equivalent signal).

---

## Content pillars (only three, ever)

### Pillar 1 — Lock-In Memes (40% of output)

The hook content. The reason someone follows.

These are short Reels that *feel* like a study/lock-in meme but are subtly Elseware-coded. The format is borrowed from Studygram and StudyTok but the audio is always Elseware audio, captioned with the place name.

Examples (full scripts in `05-REELS-SCRIPT-BANK.md`):
- "POV: it's Sunday at 4pm and you're locking in for the next 4 hours."
- "How to lock in when your brain feels like 47 open Chrome tabs."
- "the way 'Tokyo Kissaten' makes the LSAT feel doable."
- "Lock-in protocol: phone in another room, Lisbon Rainstorm in your ears."

CTA on these Reels: NEVER "buy the app." Always "save this for when you need to lock in."

### Pillar 2 — Soundscape POV (35% of output)

This is where the app *is* the content. We show the app on screen, layering sounds to *build* the place in real time. The user watches the place be created.

Format:
- 0:00 — silent shot of a desk, a window, a notebook.
- 0:01 — fingertip taps "Tokyo Kissaten" on the iPhone.
- 0:02 — sound builds. Captions on screen call out each layer: "lo-fi… coffee shop… distant chatter… vinyl crackle… light rain."
- 0:08 — fade to a wide shot of the desk from across the room. The audio plays.
- 0:14 — text overlay: "elseware. put yourself somewhere."
- 0:15 — loop.

These are the highest-conversion-to-install Reels because they *show* what the app does without explaining it.

### Pillar 3 — Place Drops & Aesthetic (25% of output)

The branding content. The carousels and Reels that show "Tokyo Kissaten" or "Lisbon Rainstorm" as if it's a poster, a film still, a magazine spread.

This is what gets *saved* (high algorithm weight) and *shared to Stories* (highest algorithm weight).

Format examples:
- A 6-slide carousel: each slide is one place, photo + atmosphere caption.
- A 9-second Reel that's pure b-roll of rain on a window with the place name and a 3-second sound clip.
- A wallpaper drop: "all 12 lock-in wallpapers — free with Lifetime Unlock, link in bio."

CTA: subtle. "save for later." "tag the friend who needs to lock in."

---

## Growth loops we are deliberately engineering

Growth is not a thing that happens. It's a thing you *design*.

### Loop 1 — The "Save → Reuse" loop

Every Pillar 1 (meme) Reel ends with: "save this for when you need to lock in." When the user comes back to study, they reopen the Reel, increasing watch time on a piece of content the algo has already weighed positively. Every save is a future re-watch.

### Loop 2 — The "Tag a friend" loop

Pillar 1 Reels frequently end with: "tag your study friend." This is the cheapest possible way to generate DM-share signal, which is the #1 ranking factor.

### Loop 3 — The "Carousel-screenshot-share" loop

Carousels are the most-screenshotted format on IG. Maya screenshots the "Lisbon Rainstorm" slide and posts it to her Story with a sticker pointing back to us. If we make screenshot-worthy carousels, we get free reach forever.

### Loop 4 — The "User-Generated Content" loop

We invite owners of Lifetime Unlock to post their desk + Elseware setup with the hashtag `#lockedinwithelseware`. We repost the best every week to our grid (with consent and credit). This makes the brand feel collective and keeps content cost low.

### Loop 5 — The "Drop creates content" loop

Every quarterly preset drop is a content event. We pre-build a full week of Reels around the drop. The drop is the content; the Reels promote the drop; the drop justifies new owners; the new owners post UGC; the UGC fuels the next week. Forever.

---

## Posting cadence (locked, ruthless)

| Day | 7am | 12pm | 5pm | 9pm |
|---|---|---|---|---|
| Mon | Reel (Pillar 2 — Soundscape POV) | Story poll | — | Carousel (Pillar 3) |
| Tue | Reel (Pillar 1 — Meme) | Story BTS | DM replies hour | — |
| Wed | Reel (Pillar 1 — Meme) | Story repost UGC | — | — |
| Thu | Reel (Pillar 2 — Soundscape POV) | Story BTS | DM replies hour | Carousel (Pillar 3) |
| Fri | Reel (Pillar 1 — Meme) | Story poll | — | — |
| Sat | Reel (Pillar 3 — Aesthetic) | Story BTS | — | — |
| Sun | Reel (long-form / weekly recap, 45–60s) | Story poll | DM replies hour | Story drop teasing Mon |

That's **7 Reels/week, 2 Carousels/week, 7+ Stories/week**. Above the algorithm sweet spot of 4–7 Reels/week, deliberately, because we're starting cold and need velocity.

**Batch-shoot Sunday 1pm–5pm.** All 7 Reels for the next week. Edit Sunday 5pm–9pm. Schedule via Meta Business Suite or Buffer.

---

## DM strategy (this is the secret)

The most under-used IG growth lever in 2026 is DMs. Every comment we get becomes a DM. Every save we see becomes a DM. Every share we see becomes a DM.

**Default DM templates** (loaded as Quick Replies in the app):

1. **Comment-to-DM follow-up** (when someone comments "I need this" or similar):
> hey [name] — saw your comment. here's a tracked link to the app: [link]. one purchase, yours forever. let me know how Tokyo Kissaten lands. — e

2. **DM bridge after a save** (we can't see saves, but we can see saves on our analytics dashboard. When a user we already follow saves, we DM):
> just saw you saved the [reel name] reel. if you ever want to actually use it, the app is $9.99 once: [link]. genuinely worth it for what you said you're working on. — e

3. **DM after a story share**:
> thank you for sharing — that's the highest compliment you can give us. as a thank you, here are 3 wallpapers on the house: [iCloud link]. if you want the app, here it is: [link]. — e

4. **Cold inbound — "is this real?"**:
> 100% real. no subscription, no signup, no login. open, pick a place, lock in. [link]. let me know how it lands. — e

5. **Cold inbound — refund question**:
> the lock-in guarantee is real. 60 days. if you don't lock in deeper, longer, or more often, email refund@elseware.app and we refund you. keep the bonuses. we only want regulars. — e

DM hour is 5pm Tue/Thu/Sun. **Goal: 30 DMs sent, every one personal, every one with a tracked link.** Each DM-conversation becomes a "share-by-extension" signal to the algorithm.

---

## Hashtag strategy (yes, hashtags still matter for Reels in 2026, but only for surfacing)

5 hashtags per post. Mix of branded + niche + cultural:

**Branded (always include):**
- `#lockedinwithelseware`
- `#elseware`

**Niche (pick 1 per post, rotate):**
- `#studygram`
- `#studywithme`
- `#deepworkritual`
- `#lockinmode`
- `#focusmusic`
- `#ambientsound`
- `#1amfounder`
- `#mfawriter`
- `#prelaw`
- `#lsatprep`

**Cultural / aesthetic (pick 1 per post, rotate):**
- `#quietluxury`
- `#oldmoneystudy`
- `#desksetup`
- `#deskaesthetic`
- `#lofi`
- `#cafe`

We never spray 30 hashtags. 5 well-chosen tags > 30 spammy ones for the 2026 originality score.

---

## Audio strategy

**Use Elseware audio as the Reel audio whenever possible.** Upload the soundscape as a 22-second clip (export from app via screen-record or AirPlay capture). When viewers tap the audio, it shows our brand mark and they can re-use it on their own Reels — *we are seeding our own trending audio*.

Once a sound clip from Elseware crosses 1,000 uses, we have engineered a viral feedback loop: every Reel using our audio is free promotion forever.

For Pillar 1 (memes), we *can* use trending audio (when we cross-cut a study clip with a comedic trending sound) but never if it would dilute brand voice.

---

## Cross-platform leverage

After every Reel ships, we cross-post (no watermark, native upload) to:

1. **TikTok** — same content, retitled for TikTok hooks (more direct, less serif).
2. **YouTube Shorts** — same content, but include a longer description that mentions the app and links to the App Store.
3. **Threads** — Reel as a video post + a single-sentence caption. Threads is high-organic-reach in 2026 for new accounts.
4. **Pinterest** — pin the carousel slides as a "lock-in setup" board. Pinterest sends free traffic for years.

The IG-first content does ~70% of work. The cross-post does another ~30%. Total effort beyond the Reel: 15 minutes per platform if templated.

---

## What we measure (preview)

We measure exactly five things on IG, weekly. (Full dashboard in `08-KPIS-AND-DECISIONS.md`.)

1. **Save rate per Reel** — saves / views. Floor: 4%. Target: 7%+.
2. **Share rate per Reel** — shares / views. Floor: 1.5%. Target: 3%+.
3. **DM-share equivalent** (visible in IG insights) — should be growing weekly.
4. **Profile-visit-to-follow rate** — should be 5%+ once content is dialed.
5. **Link clicks from bio (tracked)** — every click is a candidate install.

If save rate and share rate are healthy, every other metric follows.

---

Read `04-90-DAY-CONTENT-CALENDAR.md` next. That's where this strategy turns into a 90-day execution plan, day by day.
