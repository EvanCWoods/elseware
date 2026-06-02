# 09 — Launch Week (Day -7 to Day 1)

> Eight days from now, the campaign goes live. This is the prep. Every hour is accounted for.

You should not start the public 90-day calendar until everything in this document is done. The plan is worth zero if the offer in the app doesn't match the offer on Instagram.

---

## Day -7 (Monday) — Foundation Day

**Goal:** offer is shipped in the app, build is in TestFlight.

The PaywallModal, the 4 secret presets, the 90-minute focus timer, the email-capture card, and the locked-state UI are all **already shipped in the codebase**. This day is verification + native build, not implementation.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 10:00 | Open `src/components/PaywallModal.tsx` — verify the Hormozi stack copy matches `02-GRAND-SLAM-OFFER.md`. Run on simulator. | [ ] |
| 10:00 — 11:00 | Open `src/config/presets.ts` — verify the 4 lifetime-only presets are present (Kyoto Tea House, Marfa Desert, Berlin Backroom, Reykjavik 4am). On simulator, confirm they show a lock icon for free users and play for unlocked users. | [ ] |
| 11:00 — 12:00 | Open the focus timer in the simulator — verify 25/45/90 buttons appear for unlocked users; locked card with "part of the Lifetime Unlock" appears for free users. | [ ] |
| 12:00 — 13:00 | Lunch. Use Elseware. (Eat your own dog food.) | [ ] |
| 13:00 — 15:00 | Update App Store listing in App Store Connect: Name, Subtitle, Keywords, Promotional Text, Description — paste from `10-APP-STORE-COPY-TO-SHIP.md`. | [ ] |
| 15:00 — 17:00 | Wire the StoreKit configuration into Xcode (`Product → Scheme → Edit Scheme → Run → Options → StoreKit Configuration → scripts/Products.storekit`). Test a synthetic purchase end-to-end. | [ ] |
| 17:00 — 18:00 | `eas build --platform ios --profile production`. Wait for the build to land in TestFlight. | [ ] |

End of day: code is verified, App Store listing is updated, TestFlight build is processing.

---

## Day -6 (Tuesday) — Brand & Asset Day

**Goal:** all visual assets exist.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 11:00 | The 8 App Store screenshots already ship as SVG sources (`assets/app-store/`). Run `npm run gen:app-store` to regenerate, then convert to PNG via `rsvg-convert` per `assets/app-store/README.md`. Inspect each PNG. Tweak `scripts/generate-app-store-screenshots.js` if anything needs adjusting. | [ ] |
| 11:00 — 12:00 | The 12 lock-in wallpapers already ship as SVG sources (`assets/wallpapers/`). Run `npm run gen:wallpapers` to regenerate, then convert to PNG via `rsvg-convert` per `assets/wallpapers/README.md`. | [ ] |
| 12:00 — 13:00 | Lunch. | [ ] |
| 13:00 — 14:00 | Upload wallpapers to a single iCloud-shared folder. Generate the share link. | [ ] |
| 14:00 — 16:00 | IG profile pic: use `assets/icon.png` (control) — or A/B test variants from `assets/icon-variants/`. 9 grid posts: design these as carousels using your phone — pillar mix per `04-90-DAY-CONTENT-CALENDAR.md`. | [ ] |
| 16:00 — 17:00 | Design the App Preview video (15s, mirrors Reel #14). Shoot with iPhone, edit in CapCut. Upload to App Store Connect. | [ ] |
| 17:00 — 18:00 | The Founders page is already shipped at `website/founders.html` (rendered from `scripts/founders.json` via `npm run render:founders`). Verify it deploys at `elseware.app/founders` and the empty-state copy reads correctly. | [ ] |

End of day: visual identity is consistent across IG, App Store, and website.

---

## Day -5 (Wednesday) — Email & Tooling Day

**Goal:** automation is in place.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 10:00 | Set up `welcome@elseware.app` and `refund@elseware.app` mail addresses (Google Workspace, Fastmail, or any). | [ ] |
| 10:00 — 11:00 | Configure the welcome email auto-send via RevenueCat webhook → Postmark/Resend. Use the exact body from `emails/welcome.txt`. Wire per `emails/README.md`. | [ ] |
| 11:00 — 12:00 | Schedule the 30-day follow-up using `emails/30-day-checkin.txt` body. | [ ] |
| 12:00 — 13:00 | Lunch. | [ ] |
| 13:00 — 14:00 | Set up the analytics stack: RevenueCat dashboard configured, App Store Connect Analytics opened, GA4 on `elseware.app`. | [ ] |
| 14:00 — 15:00 | Verify `elseware.app/links` is live (we ship it ourselves at `website/links.html` — no Beacons subscription). Test on a non-iOS browser. | [ ] |
| 15:00 — 16:00 | Pre-write 30 tracked URLs of the form `elseware.app/links?utm_campaign=reel_NNN` for the first 30 Reels. Save in the Google Sheet. UTM pass-through on the page forwards them onto the App Store link automatically. | [ ] |
| 16:00 — 17:00 | Build the Google Sheet "Elseware Growth Dashboard" per the schema in `06-DAILY-OPS-PLAYBOOK.md`. Pre-fill columns. | [ ] |
| 17:00 — 18:00 | Test end-to-end: a friend installs from a tracked link → buys → email-capture card appears → enters email → welcome email arrives → friend replies with their handle → you add to `scripts/founders.json` → `npm run render:all && git push` → handle on `elseware.app/founders` within 5 min. | [ ] |

End of day: any unlock that happens triggers the right downstream events.

---

## Day -4 (Thursday) — Instagram Foundation Day

**Goal:** @elseware account is built and ready to launch.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 9:30 | Claim `@elseware` (Business / Creator account). | [ ] |
| 9:30 — 10:00 | Bio, profile pic, display name as per `03-INSTAGRAM-STRATEGY.md`. | [ ] |
| 10:00 — 10:30 | Set up Highlights covers (5 covers in cream-on-cream design). Pre-populate placeholder content into each. | [ ] |
| 10:30 — 12:00 | Pre-load 9 grid posts so when launch happens, the profile *looks* mature. Schedule them to publish on Day 1 morning, 5 minutes apart. | [ ] |
| 12:00 — 13:00 | Lunch. | [ ] |
| 13:00 — 14:00 | Cross-post: claim `@elseware` on TikTok, Threads, YouTube (Shorts channel), Pinterest. Cross-post the 9 IG grid posts to TikTok/Threads. | [ ] |
| 14:00 — 16:00 | Set up Quick Reply DM templates per `06-DAILY-OPS-PLAYBOOK.md`. Configure auto-DM to anyone who follows ("hi — thanks. when you're ready to lock in, the app is in our bio. — e"). | [ ] |
| 16:00 — 17:00 | Engage 50 accounts in our ICP (study, lock-in, focus, MFA, pre-law) — like 2 of their recent posts and follow. This is the "warm warm-up" for our follow-back base. | [ ] |
| 17:00 — 18:00 | Pre-write the captions for Reels #1 through #14 (first two weeks). Save in a single Google Doc. | [ ] |

End of day: profile is ready. Quick Reply templates are loaded. Cross-platform handles are claimed.

---

## Day -3 (Friday) — Shoot Day 1

**Goal:** all 7 Reels for Week 1 are shot, edited, and ready.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 10:00 | Set up the shooting environment: tripod, iPhone, single warm lamp, cream backdrop, app open on a second iPhone. | [ ] |
| 10:00 — 13:00 | Shoot all 7 Reels for Week 1 (scripts #1, #2, #3, #4, #5, #6, #7 from `05-REELS-SCRIPT-BANK.md`). Plus Reel #8 (the long-form). | [ ] |
| 13:00 — 14:00 | Lunch. | [ ] |
| 14:00 — 17:00 | Edit all 7 Reels in CapCut. Apply brand template (lower-right wordmark, captions in SF Pro Bold). Loop-engineer first/last frame. | [ ] |
| 17:00 — 18:00 | Schedule via Meta Business Suite at 7:00 AM Mon-Sun. Schedule cross-posts to TikTok/YouTube Shorts. | [ ] |

End of day: a full week of content is queued.

---

## Day -2 (Saturday) — Test Day

**Goal:** verify everything works.

| Time | Task | Done? |
|---|---|---|
| 9:00 — 10:00 | Submit App Store update with the new metadata + binary. Apple review takes 24–48 hrs typically; build that buffer. | [ ] |
| 10:00 — 11:00 | Final QA on the in-app paywall: friend taps a free preset, layers 4 sounds → paywall fires at 4th channel; pays; receives welcome email; handle added to founders page. | [ ] |
| 11:00 — 12:00 | Test `elseware.app/links` → App Store on an iPhone with no Apple ID logged in (cold simulation). Use `?stay=1` to bypass the auto-redirect for inspecting the page. | [ ] |
| 12:00 — 13:00 | Lunch. | [ ] |
| 13:00 — 16:00 | Pre-write Stories for the launch week: 7 stories pre-staged, one per day (poll, BTS, repost). Use Stories scheduler. | [ ] |
| 16:00 — 18:00 | Buffer day. Catch up on anything that slipped from Days -7 to -3. | [ ] |

End of day: every system is tested.

---

## Day -1 (Sunday) — Soft Launch & Energy

**Goal:** quiet pre-launch to friends + final mental prep.

| Time | Task | Done? |
|---|---|---|
| 10:00 — 11:00 | Send a personal message to 20 friends + 20 acquaintances: "we're launching elseware on instagram tomorrow. if it lands for you, an early follow + share would mean a lot." Don't beg. State the fact. Move on. | [ ] |
| 11:00 — 12:00 | Personal post on your *personal* IG announcing the launch. One paragraph. Calm. No fireworks. | [ ] |
| 12:00 — 13:00 | Lunch. | [ ] |
| 13:00 — 14:00 | Re-read `00-EXECUTIVE-SUMMARY.md`, `02-GRAND-SLAM-OFFER.md`, `01-POSITIONING-AND-ICP.md`. Re-anchor. | [ ] |
| 14:00 — 16:00 | Walk. Eat. Hydrate. Sleep early. | [ ] |

---

## Day 1 (Monday) — LAUNCH

| Time | Task | Done? |
|---|---|---|
| 6:55 | Open Elseware. Tap "Lisbon Rainstorm." Start the 90-min focus timer. (Ritual.) | [ ] |
| 7:00 | The 9 grid posts publish in the background. Reel #1 (P3 Carousel — "put yourself somewhere") goes live. | [ ] |
| 7:05 | Share to your personal IG Story. Send 3 DMs to friends with the link. | [ ] |
| 7:10 | Reply to first 5 comments. | [ ] |
| 7:15 | Begin Day 1 of the 90-day calendar. | [ ] |
| 12:00 | Block 2: Story drop + lunch DMs (per `06-DAILY-OPS-PLAYBOOK.md`). | [ ] |
| 17:00 | DM hour. (Tuesday is the first scheduled DM day, but Day 1 = high-volume DMs to incoming traffic.) | [ ] |
| 21:00 | Block 4: tomorrow's Story drop + final comment cleanup. Log Day 1 stats. | [ ] |

End of Day 1: the system is running. You execute the same pattern for the next 89 days.

---

## The Day-1 success criteria (low ceiling, deliberate)

- 50 followers gained.
- Reel #1 hits >500 views.
- 1 paid unlock.
- 0 unread DMs.

If you hit these by 9pm Day 1 — you're on the curve. If not, **don't panic.** Day 2 ships another Reel. The system compounds.

---

## What goes wrong (and what to do about it)

### "Apple rejected my app submission"

Almost always a metadata or screenshot issue. Apple is fast (24h reviews common). Fix and resubmit. Don't delay launch — Reels can launch first; the *new* paywall and bonuses will go live once Apple approves. This is a 3–5 day desync at worst. Live with it.

### "RevenueCat webhook didn't fire / welcome email didn't send"

Test with a dummy purchase before launch. If still broken on Day 1: send the welcome email manually for the first 50 buyers. It's a feature ("personal touch from the founder"), not a bug.

### "I have 100 followers and 0 unlocks after Day 7"

This is normal. Most apps have <500 followers in week 1. Trust the curve. Save rate matters more than follower count in week 1. If save rate is >4%, you're winning even at 100 followers.

### "I want to skip Sunday batch this week"

Don't. The Sunday batch is the single most important 4 hours of the week. Skip it once and you'll skip it forever. If you're sick, do the minimum: schedule 3 Reels from the script bank. Don't disappear.

---

## What you'll feel during launch week

- Day -7: dread.
- Day -6: clarity.
- Day -5: small wins (the welcome email arrives in a test inbox).
- Day -4: doubt (the IG profile feels small).
- Day -3: exhaustion (shoot day is long).
- Day -2: confidence (everything works).
- Day -1: silence.
- Day 1: the day.
- Day 2: anticlimax. (Most launches feel quiet on Day 2. Trust the curve.)

---

## The mantra (for when you want to stop)

> **One Reel a day. For 90 days. No exceptions.**

That's the whole plan. The rest is detail.

---

## Last-mile checklist (run through this Day -1 evening)

- [ ] Lifetime Unlock paywall copy live in app.
- [ ] 4 secret presets gated.
- [ ] 90-min focus timer module shipped.
- [ ] App Store listing updated (or scheduled to update on next approval).
- [ ] App Store screenshots designed and uploaded.
- [ ] App Preview video uploaded.
- [ ] 12 wallpapers exported and hosted on iCloud.
- [ ] `welcome@elseware.app` set up and tested.
- [ ] `refund@elseware.app` set up.
- [ ] Welcome email auto-send working.
- [ ] 30-day follow-up email scheduled.
- [ ] `elseware.app/founders` page live.
- [ ] @elseware IG claimed, bio set, profile pic set, Highlights set.
- [ ] First 9 grid posts pre-loaded and scheduled for Day 1.
- [ ] Quick Reply DM templates loaded.
- [ ] `elseware.app/links` live and tested.
- [ ] 30 tracked URLs pre-written (`elseware.app/links?utm_campaign=reel_NNN`).
- [ ] Google Sheet dashboard built.
- [ ] Reels #1–#7 shot, edited, scheduled.
- [ ] Cross-platform handles (TikTok, Threads, YouTube, Pinterest) claimed.
- [ ] @elseware on Threads, TikTok, YouTube, Pinterest pre-populated.
- [ ] Personal IG Story pre-written for Day 1 launch.
- [ ] 20 personal DMs sent to friends asking for Day 1 share.
- [ ] Brain calm. Sleep schedule normal.

If every box is checked: launch tomorrow.

If not: **launch anyway with whatever's done.** Done > perfect. The plan is built to recover. The thing that kills it is delay.

---

This is the end of the plan. Read `00-EXECUTIVE-SUMMARY.md` once more to re-anchor. Then close this directory and ship.

The audio uniform of locking in. One purchase. Yours forever.

Lock in.
