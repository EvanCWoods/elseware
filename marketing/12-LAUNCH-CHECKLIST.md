# 12 — The Launch Checklist (the only doc you read on launch week)

> One file. Top to bottom. Every action that closes the gap between "we wrote a plan" and "money is in the bank."

This doc consolidates everything operator-side from `00`–`11` and the shipped codebase. It does not introduce new strategy — strategy is in those docs. This is **the runbook**.

If you are starting from scratch, allocate **2 weeks of calendar time** end-to-end. Most of the clock time is waiting on Apple, DNS, and yourself shooting Reels. The active work below is ~25 hours.

---

## Phase 0 — Infrastructure (start 14 days before launch)

Most of this is "submit and wait." Kick it all off on Day 1, then do other phases in parallel.

### 0.1 — Apple Developer & App Store Connect
- [ ] Apple Developer Program membership active ($99/yr).
- [ ] App Store Connect → Agreements, Tax & Banking → **sign Paid Apps Agreement**.
- [ ] Add bank account (US: ACH; international: SWIFT). _Verification takes 2–5 business days._
- [ ] Submit tax forms (US: W-9; international: W-8BEN).
- [ ] All three statuses must read **Active** before IAP can pay out. Per `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 1.

### 0.2 — Domain & DNS
- [ ] `elseware.app` registered + pointed at Vercel.
- [ ] `welcome@elseware.app` mailbox provisioned (Google Workspace, Fastmail, or any IMAP provider with SPF/DKIM).
- [ ] `refund@elseware.app` mailbox provisioned.
- [ ] `support@elseware.app` mailbox provisioned (used in `support.html`).

### 0.3 — Transactional email provider
- [ ] Postmark or Resend account created. ($15/mo Postmark, free tier on Resend.)
- [ ] Domain authentication (SPF, DKIM, DMARC) verified. _Allow 24h for DNS propagation._
- [ ] API key stored as `POSTMARK_TOKEN` in your serverless function's env.

### 0.4 — Webhook endpoint
- [ ] Cloudflare Worker or Vercel Edge Function deployed at `https://api.elseware.app/webhooks/revenuecat`.
- [ ] Endpoint validates the `Authorization` header (per `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 5d).
- [ ] Endpoint sends `emails/welcome.txt` body via Postmark/Resend on `INITIAL_PURCHASE` events that include `$email`.
- [ ] Endpoint schedules `emails/30-day-checkin.txt` for `now + 30 days`.
- [ ] `REVENUECAT_WEBHOOK_SECRET` env var = output of `openssl rand -hex 32`.

### 0.5 — Social handle claims
- [ ] `@elseware` claimed on Instagram (Business/Creator account).
- [ ] `@elseware` claimed on TikTok.
- [ ] `@elseware` claimed on Threads.
- [ ] `@elseware` claimed on YouTube (Shorts channel).
- [ ] `@elseware` claimed on Pinterest.
- [ ] All five point profile-link → `elseware.app/links`.

### 0.6 — RevenueCat configuration
- [ ] Two IAP products created in App Store Connect: `com.blocksoftware.elseware.lifetime_unlock` ($9.99, **Cleared for Sale: Yes**) and `..._lifetime_unlock_v2` ($14.99, **Cleared for Sale: No** — pre-staged for cutover).
- [ ] Both products attached to RevenueCat entitlement `pro`.
- [ ] Offering `default` set as **Current** with package `lifetime` pointing at `..._lifetime_unlock`.
- [ ] RevenueCat webhook configured pointing at `0.4` endpoint.
- [ ] Sandbox tester account created in App Store Connect → Users and Access → Sandbox Testers. Email: `qa+sandbox@elseware.app`.

> Full walkthrough: `marketing/11-REVENUECAT-AND-IAP-SETUP.md`.

---

## Phase 1 — Asset finalization (1 day)

You can do this any time after the codebase is in your hands. No external waits.

### 1.1 — Regenerate everything from source

```bash
cd /Users/evan23first/code/projects/murmur-mobile
npm install
npm run prerelease
```

This runs `gen:wallpapers`, `gen:app-store`, `gen:icons`, `render:founders`, and `render:status` in sequence. Output: 12 wallpaper SVGs, 8 App Store screenshot SVGs, 2 icon-variant SVGs, populated `founders.html` + `launch-status.html`.

- [ ] Command exits 0.
- [ ] `git status` shows the regenerated files (a no-op diff is fine — it means everything was already in sync).

### 1.2 — Convert SVGs to PNGs

Apple wants PNGs for screenshots and icons. iOS wants PNGs for wallpapers (it doesn't accept SVG).

```bash
brew install librsvg

# Wallpapers (12)
( cd assets/wallpapers && for f in *.svg; do
    rsvg-convert -w 1170 -h 2532 "$f" -o "${f%.svg}.png"
  done )

# App Store screenshots (8)
( cd assets/app-store && for f in *.svg; do
    rsvg-convert -w 1290 -h 2796 "$f" -o "${f%.svg}.png"
  done )

# Icon variants (2) for PPO test 2
( cd assets/icon-variants && for f in *.svg; do
    rsvg-convert -w 1024 -h 1024 "$f" -o "${f%.svg}.png"
  done )
```

- [ ] All 22 PNGs land where expected.
- [ ] Open one wallpaper PNG and one screenshot PNG to eyeball-check rendering.

### 1.3 — Host wallpapers in iCloud
- [ ] Drag the 12 PNGs into a folder named `Elseware - Lock-In Wallpapers` in iCloud Drive.
- [ ] Right-click → Share → "Anyone with the link".
- [ ] Copy the URL.
- [ ] Paste it into `emails/welcome.txt` where it reads `[wallpapers iCloud link]`.

### 1.4 — Preview the website locally
```bash
npm run preview
```
- [ ] Open http://localhost:3000/ — homepage renders, place gallery looks right.
- [ ] http://localhost:3000/launch-status — counters all read 0, dashboard intact.
- [ ] http://localhost:3000/founders — empty-state copy showing.
- [ ] http://localhost:3000/protocol — Lock-In Protocol renders.
- [ ] http://localhost:3000/links?stay=1 — bio link page renders (`?stay=1` bypasses iOS auto-redirect).

---

## Phase 2 — Build & ship to TestFlight (1 day)

### 2.1 — Build the iOS bundle
- [ ] `npx expo prebuild --platform ios` (regenerate native iOS).
- [ ] Open `ios/Elseware.xcworkspace` in Xcode.
- [ ] In Xcode: **Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration** → choose `scripts/Products.storekit`. (Local dev testing only — won't affect TestFlight build.)
- [ ] `eas build --platform ios --profile production` (or your equivalent EAS command).

### 2.2 — Local smoke test against StoreKit synthetic IAP
- [ ] Run the dev build with the StoreKit configuration enabled.
- [ ] Tap UNLOCK FOREVER. Paywall renders with stacked offer copy.
- [ ] Buy via synthetic flow. Locked presets unlock. Focus Timer card shows 25/45/90 buttons.
- [ ] EmailCaptureCard appears with "you're in. one last thing." copy.
- [ ] Submit a test email. Card transitions to "you're in. check your inbox."
- [ ] Dismiss/skip variant: tap "skip" — card disappears, doesn't return on next reload.

### 2.3 — Upload to TestFlight
- [ ] Build uploaded via EAS or Xcode → Archive → Distribute.
- [ ] Apple processes the binary (~15 min).
- [ ] Add yourself + 1–2 trusted testers as Internal Testers.
- [ ] Install via TestFlight on a real iPhone.

### 2.4 — Real-device smoke test (12-step from `marketing/11-…`)
- [ ] Sign sandbox tester into device (Settings → App Store → Sandbox Account).
- [ ] Run the 12-step smoke test from `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 7.
- [ ] **Critical:** confirm welcome email arrives within ~1 hour at the sandbox email.
- [ ] Confirm webhook fired in your serverless function logs.
- [ ] If any step fails: fix, rebuild, re-test. **Do not submit until all 12 pass.**

---

## Phase 3 — Pre-launch IG / social (1 day, day -4)

Per `marketing/09-LAUNCH-WEEK.md` Day -4 in detail. Compressed here.

### 3.1 — Instagram setup
- [ ] Profile pic uploaded (control icon — `assets/icon.png`).
- [ ] Bio copy:
  ```
  the audio uniform of locking in.
  one purchase. yours forever.
  ↓ get the app
  ```
- [ ] Bio link → `https://elseware.app/links`.
- [ ] Highlights covers set up: Places, Mixes, Founders, Stack, Updates.
- [ ] First 9 grid posts pre-loaded (use any Pillar 3 carousel from `05-REELS-SCRIPT-BANK.md`).
- [ ] Quick Reply DM templates loaded from `03-INSTAGRAM-STRATEGY.md`.

### 3.2 — Reel batch (Sunday ritual)
Per `marketing/06-DAILY-OPS-PLAYBOOK.md` Sunday Block A–C. Compressed:
- [ ] Read upcoming 7 days from `marketing/04-90-DAY-CONTENT-CALENDAR.md`.
- [ ] Pull matching scripts from `marketing/05-REELS-SCRIPT-BANK.md`.
- [ ] Shoot all 7 vertically (1080×1920).
- [ ] Edit in CapCut (brand template: lower-right wordmark, captions burned in, loop-engineered first/last frame).
- [ ] Schedule via Meta Business Suite for 7:00 AM each day.
- [ ] Cross-post each to TikTok / YouTube Shorts / Threads (no watermarks).

### 3.3 — Tracking & dashboard
- [ ] Google Sheet created from the schema in `marketing/06-DAILY-OPS-PLAYBOOK.md` "Tracking Spreadsheet" section.
- [ ] Per-Reel tracked links pre-generated. Format: `elseware.app/links?utm_campaign=reel_NNN`.

---

## Phase 4 — Submit to App Store (day -3 → -1)

### 4.1 — App Store Connect listing
- [ ] App Name set: `Elseware: Lock-In Audio` (per `marketing/10-APP-STORE-COPY-TO-SHIP.md`).
- [ ] Subtitle: `Sounds for deep work & focus`.
- [ ] Promotional Text pasted.
- [ ] Description pasted.
- [ ] Keyword field pasted: `focus,study,sound,ambient,rain,coffee,lofi,jazz,white,noise,sleep,relax,deep,work,locked,in`.
- [ ] All 8 screenshot PNGs uploaded in numbered order to **iPhone 6.7" Display** slot.
- [ ] App Preview video uploaded (15s).
- [ ] Privacy URL: `https://elseware.app/privacy.html`.
- [ ] Support URL: `https://elseware.app/support.html`.
- [ ] Marketing URL: `https://elseware.app/`.
- [ ] Both IAPs attached to the build.
- [ ] Sandbox tester credentials added to **App Review Information**.
- [ ] Review notes: "This is a non-consumable lifetime unlock. To test: tap UNLOCK FOREVER on the paywall and complete purchase. Verify locked presets become tappable, focus timer becomes usable, and Restore Purchase works."

### 4.2 — Submit
- [ ] Click **Add for Review** → **Submit for Review**.
- [ ] Apple review takes 24–48 hours typically.
- [ ] If rejected: read carefully. Most rejections are missing review notes or non-testable IAP — fix and resubmit. Don't argue.

### 4.3 — While you wait (do not skip these)
- [ ] Send 20 personal DMs to friends/acquaintances via personal IG: "we're launching elseware on instagram on [date]. if it lands for you, an early follow + share would mean a lot." (per `marketing/09-LAUNCH-WEEK.md` Day -1)
- [ ] Personal IG Story announcing launch.
- [ ] Re-read `marketing/00-EXECUTIVE-SUMMARY.md`, `02-GRAND-SLAM-OFFER.md`, `01-POSITIONING-AND-ICP.md`. Re-anchor.
- [ ] Sleep early. Don't ship-doom-spiral.

---

## Phase 5 — Day 1 (the launch)

### 5.1 — 6:55 AM — your own ritual first
- [ ] Open Elseware. Tap "Lisbon Rainstorm." Start the 90-min focus timer. (You are the ICP. The brand starts with you.)

### 5.2 — 7:00 AM — public launch
- [ ] Reel #1 (Pillar 3 carousel — "put yourself somewhere") scheduled to publish at 7:00 — verify it dropped.
- [ ] Share it to your personal IG Story.
- [ ] Send 3 DMs to friends with the link.
- [ ] Reply to first 5 comments using the voice rules in `01-POSITIONING-AND-ICP.md`.
- [ ] Pin one earned comment.

### 5.3 — Throughout Day 1
- [ ] **12:00 PM:** Story drop + 10 comment replies (per `06-DAILY-OPS-PLAYBOOK.md` Block 2).
- [ ] **5:00 PM:** DM hour (45 min). Goal: 30 personal DMs.
- [ ] **9:00 PM:** Final comment cleanup. Log day-1 stats in the Google Sheet.

### 5.4 — Day 1 success criteria (low ceiling, deliberate)
- [ ] 50+ followers gained.
- [ ] Reel #1 hits >500 views.
- [ ] At least 1 paid unlock.
- [ ] 0 unread DMs by 9 PM.

If you hit these — you're on the curve. If not — **don't panic.** Day 2 ships another Reel. The system compounds.

---

## Phase 6 — Days 2 onward (the daily/weekly cadence)

### 6.1 — Every weekday (~2 hours active work)
- [ ] **7:00 AM:** Ship Reel + first 5 comment replies (15 min).
- [ ] **12:00 PM:** Story drop + 10 comment replies (20 min).
- [ ] **5:00 PM Tue/Thu/Sun:** DM hour (45 min).
- [ ] **9:00 PM:** Tomorrow's Story scheduled + final comment cleanup + log stats (20 min).

> Source: `marketing/06-DAILY-OPS-PLAYBOOK.md`.

### 6.2 — Every Sunday (4-hour batch)
- [ ] **1:00 PM:** Plan upcoming week from `04-90-DAY-CONTENT-CALENDAR.md`.
- [ ] **2:00 PM:** Shoot all 7 Reels back-to-back.
- [ ] **4:00 PM:** Edit and schedule.
- [ ] **5:00 PM:** Done.

### 6.3 — Every Friday (90-second build-in-public update, automated)
- [ ] `REVENUECAT_SECRET_KEY` + `REVENUECAT_PROJECT_ID` exported in shell or `.env.local`.
- [ ] `npm run friday` (syncs unlocks + founders + date, then renders the page).
- [ ] `npm run preview` (verify at `localhost:3000/launch-status`).
- [ ] `git commit -am "status: $(date +%Y-%m-%d)" && git push`.
- [ ] Pin a Story: "weekly status drop. [link]."

If you want to set the "right now" line: `npm run sync:analytics -- --now="shipping reykjavik 4am"`.

### 6.4 — When a founder reply lands at `welcome@`
- [ ] Edit `scripts/founders.json` → append `{ "handle": "@theirhandle" }`.
- [ ] `npm run render:founders`.
- [ ] Bump `counters.founders_named` in `scripts/launch-status.json`.
- [ ] `npm run render:status`.
- [ ] `git commit -am "founders: +@theirhandle" && git push`.
- [ ] Reply in 24h: "you're on the wall. lock in."

### 6.5 — First Sunday of every month (extra 2 hours)
- [ ] Strategic review per `06-DAILY-OPS-PLAYBOOK.md`.
- [ ] Update `08-KPIS-AND-DECISIONS.md` floors and targets if anything shifts.
- [ ] Plan next month's hero campaign (next quarterly drop).

### 6.6 — Quarterly preset drop
- [ ] Add new preset to `src/config/presets.ts` with `lifetimeOnly: true`.
- [ ] Add corresponding wallpaper config to `scripts/generate-wallpapers.js`.
- [ ] `npm run gen:all`.
- [ ] Re-export PNGs (re-run rsvg-convert from Phase 1.2).
- [ ] Update iCloud wallpaper folder.
- [ ] Update `roadmap.shipped` in `scripts/launch-status.json`.
- [ ] `npm run prerelease && npm run preview`.
- [ ] Commit + push + EAS build + submit.
- [ ] Pre-build 14 days of Reels around the drop per `04-90-DAY-CONTENT-CALENDAR.md` Month 3 example.

### 6.7 — At unlock #5,000 — the cutover
- [ ] App Store Connect → `..._lifetime_unlock` → Cleared for Sale: **No**.
- [ ] App Store Connect → `..._lifetime_unlock_v2` → Cleared for Sale: **Yes**.
- [ ] RevenueCat → Offering `default` → Package `lifetime` → swap product ref to `..._lifetime_unlock_v2`.
- [ ] Verify on a fresh device that price now reads $14.99.
- [ ] Verify Restore Purchase still works for existing $9.99 owners.
- [ ] Pin a Reel: "founders wall closed at 5,000. price is $14.99 forever."
- [ ] Update `scripts/launch-status.json` → `phase: "post-cutover"`, `current_price_usd: 14.99`.
- [ ] `npm run render:status && git commit && git push`.

> Full cutover runbook: `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 10.

---

## Master cheat-sheet (printable / pin to wall)

```
DAILY:    npm run preview                        # verify before push
SUNDAY:   shoot Reels, schedule for the week
FRIDAY:   npm run friday && git commit -am "status: $(date +%Y-%m-%d)"
NEW FOUNDER: $EDITOR scripts/founders.json
             npm run render:all && git commit
NEW PRESET:  $EDITOR src/config/presets.ts
             $EDITOR scripts/generate-wallpapers.js
             npm run gen:all && rsvg PNG export
             EAS build → submit
CUTOVER:  flip IAP "Cleared for Sale" + RC package + announce
```

---

## What can go wrong (and what to do)

### Apple rejects with "IAP not testable"
Reviewer didn't see how to trigger the paywall. Add explicit step-by-step in App Review Notes: "1. Open app. 2. Tap UNLOCK FOREVER. 3. Tap purchase button." Resubmit. (Per `marketing/11-…` troubleshooting.)

### Paywall shows blank price
RevenueCat offering not `Current`, or API key wrong, or device not signed into sandbox. (Per `marketing/11-…` troubleshooting.)

### Welcome email never arrives
Webhook auth header mismatch, HTTP not HTTPS, or `INITIAL_PURCHASE` event filter unchecked. Check `Last Delivery` in RevenueCat → Integrations → Webhooks.

### Day 7 has 100 followers and 0 unlocks
This is normal. Trust the curve. Save rate matters more than follower count in week 1. If save rate >4%, you're winning even at 100 followers. (Per `marketing/06-…`)

### You miss a Sunday batch
Don't disappear. Drop to 5 Reels for the week. Pull from `05-REELS-SCRIPT-BANK.md` and run through CapCut at any time. A B-tier Reel beats a missed day every time.

### Day 14 you want to quit
Read `marketing/06-DAILY-OPS-PLAYBOOK.md` "12-week Energy Plan". Week 3 is The Wall. Pre-shoot 14 days. Hire a $300/mo Upwork editor if needed. Never stop posting.

---

## What success looks like at Day 90

From `marketing/00-EXECUTIVE-SUMMARY.md`:
- 75k IG followers who associate Elseware with "lock-in" before they associate it with "ambient sound."
- 10k installs, 2k paid unlocks — break-even or better on dev costs.
- 1 viral Reel (>1M views) that we can re-cut into 5 variants forever.
- App Store top-50 in **Lifestyle > Focus**, top-100 in **Health & Fitness > Sleep/Relax**.
- A documented system: this directory, updated weekly with what worked and what we killed.

---

This is the last document in the marketing directory. Everything after this is execution. Lock in.
