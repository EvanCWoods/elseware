# 06 — Daily Ops Playbook

> Plans don't fail because they're wrong. They fail because the operator burns out at week 3.

This playbook is built so a single person can run the whole growth engine in **2 hours/day on weekdays + a 4-hour Sunday batch session**. Total: ~14 hours/week. If it takes more, we cut.

---

## The Daily Cadence (Mon–Fri)

### Block 1 — 7:00 AM — Ship the Reel (15 minutes)

The Reel is already shot, edited, captioned, and scheduled (from Sunday batch). You're just confirming it dropped, logging the start metrics, and replying to early comments.

- 7:00 — open IG, confirm the morning Reel is live.
- 7:02 — log baseline (views=0, saves=0, shares=0) in the tracking spreadsheet (template below).
- 7:03 — reply to the first 5 comments with the voice rules from `01-POSITIONING-AND-ICP.md`.
- 7:05 — pin one earned comment to the top of the Reel (a comment that adds context, not just a "love this").
- 7:08 — share the Reel to your personal Story (or have a friend with audience-overlap share to theirs) — Story shares of your own Reels are a nontrivial reach signal.
- 7:13 — DONE. Phone away.

### Block 2 — 12:00 PM — Story drop + lunch DMs (20 minutes)

- 12:00 — Story drop: a single ephemeral piece. Either a poll ("which place do you lock in to?"), a behind-the-scenes shot of the next preset being designed, or a re-share of someone else's #lockedinwithelseware UGC.
- 12:05 — open the Reel from this morning. Log mid-day stats. (Views, saves, shares, profile visits, link clicks.)
- 12:08 — reply to the next 10 comments. Keep it conversational, voice-on-brand.
- 12:15 — close IG. Eat lunch. Walk.

### Block 3 — 5:00 PM — DM hour (only on Tue/Thu/Sun) (45 minutes)

- 5:00 — open IG DMs.
- 5:01 — clear inbox: hit every "request" message and approve or reject.
- 5:05 — for every save we can identify (recent IG analytics view shows top savers), DM them with template #2 (see `03-INSTAGRAM-STRATEGY.md`).
- 5:15 — for every Story-share of our Reel, DM with template #3.
- 5:25 — for every "is this real?" inbound, reply with template #4.
- 5:40 — for every refund/skeptic question, reply with template #5.
- 5:45 — DONE. Goal: 30 personal DMs sent.

### Block 4 — 9:00 PM — Tomorrow's Story drop + late comment cleanup (20 minutes)

- 9:00 — final pass on today's Reel: log final stats, screenshot the analytics, drop in the dashboard sheet.
- 9:05 — schedule tomorrow's Story (either repurposed Reel cut or a polled question).
- 9:10 — final comment reply pass. Goal: 0 unread comments by 9:20.
- 9:15 — write tomorrow's Reel caption (sometimes the caption needs to land tomorrow's news/cultural moment).
- 9:20 — DONE.

**Daily total: 100 minutes. Three of those blocks are 15-20 min. One is 45 min.**

---

## The Weekly Cadence (Sunday Batch)

This is the most important 4 hours of the week. It's **non-negotiable**. Block it on the calendar.

### Sunday Block A — 1:00 PM – 2:00 PM — Plan & Pre-Visualize

- 1:00 — open `04-90-DAY-CONTENT-CALENDAR.md` and `05-REELS-SCRIPT-BANK.md`.
- 1:05 — for each of the next 7 days, lock in the script number, the location, the time of day to shoot, the audio source, the caption.
- 1:30 — review last week's analytics dashboard. Identify the top 1 winner. Check if any rows in the upcoming week should be replaced with a clone of the winner. (See replacement rules in `04-…CALENDAR.md`.)
- 1:50 — write next week's caption block for all 7 Reels into a single doc.

### Sunday Block B — 2:00 PM – 4:00 PM — Shoot

- 2:00 — set up: tripod, iPhone, 3 different desk staging variations, app open, AirPods + screen-record running for audio captures.
- 2:10 — shoot all 7 Reels, back-to-back. Most are <30 seconds. Total raw shooting time: ~60 min including resets.
- 3:10 — shoot 2 carousels' worth of stills.
- 3:30 — shoot 14 short Story clips for the week (BTS, polls, repurpose footage).
- 4:00 — DONE shooting.

### Sunday Block C — 4:00 PM – 5:00 PM — Edit & Schedule

- 4:00 — import all 7 Reels into CapCut.
- 4:05 — apply the brand template (lower-right wordmark, captions style preset).
- 4:30 — export, name files `2026-04-29_reel_03_pillar1.mp4`.
- 4:40 — open Meta Business Suite. Bulk-schedule all 7 Reels at 7:00 AM their respective days. Schedule the carousels for Mon and Thu evening 9pm.
- 4:55 — verify all 7 are queued correctly.
- 5:00 — DONE.

**Sunday total: 4 hours. The week is now on rails.**

---

## The Monthly Cadence

### First Sunday of the month — Strategic Review (extra 2 hours)

- Review the month's analytics. Which pillar performed best? Which day-of-week worked? Which CTA converted?
- Write a 1-pager: what worked, what we kill, what we double down on.
- Update `08-KPIS-AND-DECISIONS.md` with the new floor/target numbers.
- Plan the next month's hero campaign (e.g., next quarterly drop).
- Schedule one Live for the month (3rd Wednesday, 8pm).

### Every Friday — Public Dashboard Update (90 seconds, automated)

Once `REVENUECAT_SECRET_KEY` and `REVENUECAT_PROJECT_ID` are exported in your shell or `.env.local` (see `marketing/11-REVENUECAT-AND-IAP-SETUP.md`):

```bash
npm run friday                                  # syncs unlocks + founders + date, then renders the page
npm run preview                                 # eyeball at http://localhost:3000/launch-status (ctrl+c to stop)
git commit -am "status: $(date +%Y-%m-%d)" && git push
```

That's the entire weekly drop. Pin a Story afterward: *"weekly status drop. [link]."* This trains the audience to come back every Friday for a build-in-public hit.

If the API is unreachable or you want to set the "right now" line:

```bash
npm run sync:analytics -- --now="shipping the day-1 reels"   # set the now_working_on line
node scripts/sync-analytics.js --unlocks=1247                # manual override when API is down
node scripts/sync-analytics.js --dry-run                     # preview the change without writing
```

If RevenueCat env vars aren't set yet, `npm run friday` still updates the date and the founders count — partial sync is acceptable; the public sees fewer stale numbers.

### Adding a founder (any time)

- Edit `scripts/founders.json` → append `{ "handle": "@handle" }` to `founders[]`.
- `npm run render:founders` — rewrites `website/founders.html` (alphabetical, HTML-escaped).
- Update `scripts/launch-status.json` → bump `counters.founders_named` to match the new array length.
- `npm run render:status` to keep the dashboard truthful.
- Commit + push.

### Pre-release dump (any time you've changed any source data)

- `npm run prerelease` — runs all generators (wallpapers, App Store screenshots, icon variants) + all renderers (founders, launch status).
- `npm run preview` — verify before committing.
- Commit + push.

### Mid-month — UGC Audit (1 hour)

- Search `#lockedinwithelseware` and DM 10 highest-quality posters asking permission to repost.
- DM 5 lifetime owners we'd like to feature.
- Schedule the next 4 Wed UGC slots.

### Month-end — App Store Audit (1 hour)

- Review App Store Connect: keywords ranking, conversion rate, ratings, reviews.
- A/B test new screenshot or new keyword set per `07-FUNNEL-AND-ASO.md`.
- Reply to all reviews (positive and negative) within the month.

---

## The Comment Reply Decision Tree

When a comment lands, ask in this order:

1. **Is it spam/bot?** Delete and block.
2. **Is it negative/hostile?** Don't engage. Hide if it's defamatory. Archive the screenshot for the "haters" reel idea bank.
3. **Is it a question about price/refund/feature?** Reply with the relevant template (see DM templates in `03-INSTAGRAM-STRATEGY.md`). Always include a tracked link in the bio reminder.
4. **Is it praise without question?** Reply with a single-sentence on-brand acknowledgement. Examples: "thank you. lock in." or "save it for sunday." or "tokyo at 4pm hits different."
5. **Is it a creator-grade comment that adds context?** Reply with care, then **pin** it to the top of the Reel. This is a major signal lever.

**Goal: 0 unread comments by 9pm daily. Reply rate target: 70%+ of comments get a personal reply in the first 24 hours.**

---

## The Tracking Spreadsheet (replicate exactly)

Spreadsheet name: `Elseware Growth Dashboard`. Sheet 1: "Daily Reels."

Columns:

| col | description |
|---|---|
| `date` | YYYY-MM-DD of post |
| `day_n` | day number from Day 1 of the campaign |
| `reel_id` | reel_001 etc. |
| `pillar` | P1 / P2 / P3 |
| `script_ref` | reel #N from the bank |
| `posted_at` | hh:mm |
| `views_24h` | views at 24h mark |
| `views_72h` | views at 72h mark |
| `views_final` | views at 7d mark |
| `saves_24h` | saves at 24h |
| `shares_24h` | shares at 24h |
| `comments_24h` | comments at 24h |
| `profile_visits` | profile visits attributed to the Reel |
| `follows_attributed` | follows attributed to the Reel |
| `link_clicks` | clicks from bio while this Reel was top |
| `installs_attributed` | from RevenueCat / App Store Connect tracking link |
| `unlocks_attributed` | paid unlocks attributed |
| `save_rate` | =saves_24h/views_24h |
| `share_rate` | =shares_24h/views_24h |
| `notes` | qualitative notes — any comment that surprised us, any DM that converted, etc. |

Sheet 2: "Weekly Summary." Roll-up: total views, total saves, total shares, total installs, total unlocks, top Reel, bottom Reel.

Sheet 3: "Monthly Strategy Notes." 1-pager per month.

---

## The 5 Daily Decision Rules (post on the wall)

1. **No skipping a Reel day.** If shooting goes wrong Sunday, ship a B-tier Reel. Don't ship nothing.
2. **No ghosting comments.** 70% reply rate on day 1. Pinned comment by 9am.
3. **No fake metrics.** Always tracked links from bio. Always log honestly.
4. **No content theft.** Originality score is real. Zero recycled audio, zero stolen formats. We borrow trends; we never copy creators.
5. **No begging.** No "follow for more." No "smash like." Bio CTA, in-app CTA, save CTA. That's it.

---

## Burnout protocol (this is a real thing)

If at any point during the 90 days you skip 2 days in a row:

1. Stop. Take Sunday off completely (no batch).
2. Audit: are we doing too much? Cut Stories first (lowest-leverage).
3. If still drowning: drop to 5 Reels/week. Lower the floor.
4. If still drowning: hire a part-time editor on Upwork ($300/mo for 7 Reels of editing/week).
5. **Never stop posting.** A B-tier Reel beats a missed day every time.

---

## The 12-week Energy Plan

The grind kills you in week 3 if you don't plan for it.

| Week | Energy state | Actions |
|---|---|---|
| 1 | Adrenaline | Ship daily. Build the system. |
| 2 | Adrenaline | Keep building. First wins land. |
| 3 | The Wall. Most quit here. | Reduce Story load. Pre-shoot 14 days of Reels. |
| 4 | Re-energize | First "this is working" data. |
| 5 | Plateau | Don't chase trends. Stay on plan. |
| 6 | Algorithm pickup | Save rate has stabilized. Double down. |
| 7 | Mental fatigue | Hire the part-time editor here if not already. |
| 8 | Compound start | Audience starts referring others. |
| 9 | First viral hit (likely) | Clear the calendar. Ship 5 clones. |
| 10 | Quarterly drop | Marrakech / next preset ships. |
| 11 | Peak press | This is the week to pitch journalists. |
| 12 | Recap & re-plan | Write the next 90-day plan. Keep going. |

---

## What you don't do (deliberately)

- Don't engage with influencers in your DMs. Build first. They will come.
- Don't pitch press in the first 30 days.
- Don't run paid ads in the first 30 days.
- Don't read every analytics dashboard daily. Once a week is enough.
- Don't change the brand voice. Once. Ever.
- Don't argue with negative comments. Hide and move.
- Don't try to "go viral." Ship the system. Viral is a side effect.

---

## The morning ritual (the operator's lock-in)

Every morning before you ship the day's Reel:

1. 6:55 — open Elseware. Tap "Lisbon Rainstorm." Start a 90-min focus timer.
2. 7:00 — ship the Reel.
3. 7:15 — Block 1 done.
4. 7:15–8:45 — work the actual product (code, design, the next preset). Phone on Do Not Disturb.
5. 8:45 — break the timer. Coffee.

You are your own ICP. Use the app every day. Every Reel you ship is a Reel you'd save.

---

Read `07-FUNNEL-AND-ASO.md` next. That's where the IG audience becomes installs.
