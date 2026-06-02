# 15 — Crisis Runbook

> The plan covers the success path. This covers what happens when something breaks.

10 failure modes you'll likely hit at some point. Each entry is a short triage card: how to recognize it, what to check first, what to do in the first hour, what to do over the next few days, and what not to do.

If you're in a crisis right now: scan the table of contents, jump to your card, follow it. Don't read this top to bottom in the moment — read it once, now, before anything's broken, so you recognize the pattern when it arrives.

---

## Table of contents

1. Apple rejects the build or IAP
2. IG sudden-reach-drop / shadowban
3. Viral Reel goes wrong (negative pile-on)
4. RevenueCat / payment processor freeze
5. Refund rate >10%
6. App Store Editorial picks a competitor (or ignores us)
7. Founder burnout (week 3–4)
8. Negative review pile-on
9. Webhook / welcome-email outage
10. Brand voice drift via UGC

---

## 1. Apple rejects the build or IAP

**Symptom.** Email from App Store Connect: "Your submission has been rejected." Specific guideline cited.

**Root cause (in order of likelihood).**
1. **Reviewer couldn't trigger the IAP** (~50% of rejections). Notes weren't explicit enough.
2. **Restore Purchase missing or broken** (~20%). Apple verifies you can restore on a fresh device.
3. **Privacy / data-collection language** (~15%). Often a mismatch between privacy.html and what the app actually does.
4. **IAP description language that "implies guaranteed outcomes"** (~10%). Apple sometimes flags "lock in deeper" as a health/wellness claim.
5. **Other** (~5%) — UI bugs the reviewer found, broken links, misuse of Apple branding.

**First hour.**
- Read the rejection. Re-read it. Don't reply until you've read it twice.
- Open `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 7 (12-step smoke test) and run it again on a real device.
- Identify the exact guideline cited.

**Recovery sequence.**
- Day 0: fix the underlying issue. Add explicit step-by-step in App Review Notes ("1. Open app. 2. Tap UNLOCK FOREVER. 3. Tap purchase button.").
- Day 0 evening: resubmit with clear notes describing what changed.
- Day 1–2: Apple re-reviews (faster on resubmits, often <24h).
- Repeat until accepted.

**What not to do.**
- ❌ Don't argue in App Review responses. Apple's reviewers don't move because you wrote a paragraph.
- ❌ Don't change the brand voice to placate. We're not removing "lock in." We're adding clearer review notes.
- ❌ Don't disable the IAP in the build. Apple wants to test it.
- ❌ Don't escalate to App Review Board on the first rejection. Use that lever once, ever, for a real disagreement.

---

## 2. IG sudden-reach-drop / shadowban

**Symptom.** Reels that previously hit 10k views are hitting 500. Story view counts halved. Profile visits dropped 80% in 48h.

**Root cause (in order of likelihood).**
1. **Originality Score downgrade** — IG flagged a Reel as recycled (TikTok watermark, stolen audio, near-duplicate of another creator's hook).
2. **Hashtag spam flag** — same hashtags too aggressively, banned hashtags inadvertently used.
3. **Banned audio** — a song or sound got banned for licensing; Reels using it got buried.
4. **Account violation flag** — you replied to a comment that triggered a content filter (rare).
5. **Algorithmic seasonal change** — IG just shifted their distribution; everyone's reach dropped, not just yours. Verify by checking 2–3 peer accounts.

**First hour.**
- Audit the last 5 Reels: any TikTok watermark, any stolen audio, any near-duplicate?
- Check the hashtag list against IG's banned-hashtag list (publicly searchable).
- Open Settings → Account Status. If anything's flagged, IG tells you.

**Recovery sequence.**
- Day 0: stop posting Reels for 72 hours. Don't fight the algorithm.
- Day 0–3: post only Stories (lower-stakes, separate distribution path) to keep the audience engaged.
- Day 3: post a fresh Reel using **only your own audio** (Elseware soundscape, exported and uploaded as original audio). Keep it under 15 seconds. No hashtags.
- Day 4–7: if reach restores, gradually re-add hashtags (3 per post, niche only).
- Day 8+: back to normal cadence.

**What not to do.**
- ❌ Don't delete the flagged Reel — you confirm IG's signal that it was problematic.
- ❌ Don't switch to a personal account temporarily. Stick with `@elseware`.
- ❌ Don't buy followers, run engagement-pods, or use third-party "boost" services. All make the shadowban worse.
- ❌ Don't message IG support. They don't respond. The path is patience + cleaner content.

---

## 3. Viral Reel goes wrong (negative pile-on)

**Symptom.** A Reel hits 100k+ views fast, but the comments turn hostile — "this is just rebranded Calm," "boomer aesthetics," "scam," "AI-generated," etc. Your DMs fill with screenshot-and-quote tweet attacks.

**Root cause.** A piece of content read differently than intended. Often: someone with reach screenshotted it as a critique, the context collapsed, and the original audience came in hot.

**First hour.**
- **Don't reply to anyone individually.** Engagement amplifies the cycle.
- Read the top 30 comments. Decide: is the criticism valid? Or is this a context-collapse pile-on?
- If valid (e.g., we did over-promise something): pin a calm reply at the top of the Reel acknowledging the point.
- If pile-on: do nothing. Let the wave pass.

**Recovery sequence.**
- Day 0: keep posting on schedule. Don't change cadence. Don't reference the Reel.
- Day 0–3: mute the Reel's notifications (Settings → Posts → Mute). Read once a day, max.
- Day 3+: ship 3 Reels in a row that demonstrate the brand's substance — Pillar 2 (Soundscape POV) is best because it shows the actual product, not the messaging that triggered the wave.
- Day 7: most pile-ons fade in 5–7 days. The Reel still racks up views; the comment ratio normalizes.

**What not to do.**
- ❌ Don't delete the Reel. Deletion confirms guilt and forfeits the views/saves you've earned.
- ❌ Don't "explain yourself" in a Story. It pours fuel on the fire.
- ❌ Don't fight critics in their own DMs.
- ❌ Don't apologize in brand voice if the criticism isn't valid. We don't apologize for honest scarcity, the price ladder, or the no-subscription stance.
- ✅ Do apologize *only* if we got something materially wrong. Apologize cleanly, once, at the top of the Reel.

---

## 4. RevenueCat / payment processor freeze

**Symptom.** RevenueCat dashboard shows no new purchases for 6+ hours. Your test purchase fails. Customers DM "I bought but the app didn't unlock."

**Root cause (in order of likelihood).**
1. **RevenueCat outage** — service-level issue, usually <2hrs. Check status.revenuecat.com.
2. **Apple payment hold** — Apple flagged something (high refund rate, unusual purchase velocity). Email lands in App Store Connect.
3. **Webhook backlog** — purchases happening but the webhook isn't firing welcome emails (separate issue from purchase processing).
4. **API key rotated / expired** — usually self-inflicted, you regenerated a key and didn't update the app.

**First hour.**
- Check status.revenuecat.com. If it's red, wait 30 min and check again.
- Check App Store Connect → App Information → Status. If Apple's holding, you'll see it.
- Run a test purchase in TestFlight with a sandbox account. If it succeeds in sandbox but fails in production, it's an Apple issue, not yours.
- Check Customer Support DMs — capture user IDs of anyone who reports a paid-but-locked state.

**Recovery sequence.**
- Hour 0–2: monitor. Don't ship code changes.
- Hour 2+: if RevenueCat is up but purchases still fail in production: contact Apple Developer Support (24h response).
- Day 0+: for users stuck in paid-but-locked: in RevenueCat dashboard, manually grant the entitlement on their RC user ID. Email them: "fixed. open the app and tap Restore Purchase." This works.
- Day 1+: post-incident, write a single post-mortem note in the public dashboard's `now_working_on` if it affected enough users.

**What not to do.**
- ❌ Don't refund users who didn't ask. We grant the entitlement, we don't reverse the transaction.
- ❌ Don't change the app to "force-unlock" anything. You'll create a real bug.
- ❌ Don't panic-email every user. Reply to the ones who reach out.

---

## 5. Refund rate >10%

**Symptom.** App Store Connect → Sales and Trends → Refunds shows >10% of purchases refunded.

**Root cause (in order of likelihood, all on us).**
1. **Paywall over-promised.** The Hormozi stack copy implies more than the product delivers.
2. **Screenshot mismatch.** The App Store screenshot showed something the app doesn't actually do (e.g., a screenshot of a feature that's lifetime-only without flagging it).
3. **Bug.** Audio fails to play, secret presets fail to unlock, app crashes on launch — buyers refund.
4. **Wrong audience.** Marketing brought people who want a guided meditation, not an ambient mixer.

**First hour.**
- Open 5 most recent refunds. Apple sometimes shares the user-stated reason. Read them.
- Run the 12-step smoke test from `marketing/11-REVENUECAT-AND-IAP-SETUP.md` Step 7 on a fresh device.

**Recovery sequence.**
- Day 0: identify which root cause is dominant.
- If paywall over-promise: rewrite the bonus stack to be more concrete (numbers, durations, exact deliverables) — don't soften, sharpen.
- If screenshot mismatch: regenerate `assets/app-store/`, re-export PNGs, re-upload to App Store Connect (no re-review needed).
- If bug: fix and ship a build immediately.
- If audience: re-read `marketing/01-POSITIONING-AND-ICP.md`. The Reel content is too broad; tighten back to the named ICPs.
- Day 7: re-measure. Refund rate should drop to <5% within 14 days of fix.

**What not to do.**
- ❌ Don't lower the price to compensate. The price is part of the brand.
- ❌ Don't add features that buyers expected. The product is the product.
- ❌ Don't take refund requests personally. Per `02-GRAND-SLAM-OFFER.md`, the Lock-In Guarantee is real; we honor refunds; we want regulars not strangers.
- ❌ Don't argue with refund requests. Reply with `emails/refund-confirmation.txt` body and move on.

---

## 6. App Store Editorial picks a competitor (or ignores us)

**Symptom.** A competitor (e.g., Endel, Brain.fm, a new entrant) gets featured in "App of the Day" or "We Love." We don't.

**Root cause.** Apple's editorial team makes subjective calls. We're aesthetically distinct, but Apple sometimes prefers the louder pitch.

**First hour.**
- Don't post about it. Editorial-FOMO posts read as resentful.
- Open the competitor's listing. Note what their screenshots / video / copy is doing differently.

**Recovery sequence.**
- Week 0: nothing. Editorial cycles. We pitch again next quarter.
- Week 0–4: double down on the channels we own (IG + X). Editorial is a *bonus* surface, never the goal.
- Week 4: re-pitch via App Store Connect → "Pitch Your App." This time lead with: (a) one viral Reel screenshot, (b) revenue numbers if presentable, (c) the place metaphor + lifetime-not-subscription wedge as the editorial angle.
- Quarter 2: re-pitch with quarterly drop as the news hook.

**What not to do.**
- ❌ Don't change the brand to look more like the featured competitor.
- ❌ Don't pay an "App Store optimization agency" who promises editorial. They have no influence.
- ❌ Don't post about being snubbed. Off-brand and undignified.
- ✅ Do — when we eventually get featured — capture a screenshot of the feature, save to a brand archive, never bring it up unprompted on social.

---

## 7. Founder burnout (week 3–4)

**Symptom.** You're skipping Reel days. The Sunday batch is sliding. You're checking analytics 10×/day and feeling worse each time. You'd rather scroll than ship.

**Root cause.** This is the single most common failure mode in indie content businesses. It's structural, not personal. The Wall is real. `marketing/06-DAILY-OPS-PLAYBOOK.md` Week 3 calls it out by name.

**First hour.**
- Stop scrolling. Close all analytics tabs.
- Open `marketing/SUMMARY-ONE-PAGER.md`. Read it once. Tape it to the wall if you haven't.
- Open `marketing/06-DAILY-OPS-PLAYBOOK.md` "Burnout protocol" section.

**Recovery sequence.**
- Today: ship one B-tier Reel from `marketing/05-REELS-SCRIPT-BANK.md`. Any of the 50 will do. Don't think; ship.
- Today (after that): take Sunday off completely. No batch. No analytics.
- This week: pre-shoot 14 days of Reels. Pull from the script bank. Don't stress quality; just shoot.
- This week: hire a $300/mo Upwork editor. Send them the brand template + 14 days of raw clips + the next 14 captions. They edit; you approve and schedule.
- Week 4: re-evaluate. Reduce Stories load (lowest leverage). Keep daily Reels.
- Week 5+: should feel manageable again.

**What not to do.**
- ❌ Don't disappear. A week of silence is a 30% follower-velocity reset.
- ❌ Don't apologize publicly. Don't post "I needed a break." That's a brand violation.
- ❌ Don't pivot the strategy. The strategy is fine. The throughput is what's hurting.
- ❌ Don't quit. Week 3 is the wall. Week 8 is the compound. Week 4 is the bridge.

---

## 8. Negative review pile-on

**Symptom.** App Store ratings drop from 4.7 to 3.9 over 48 hours. New reviews are 1-stars with similar complaints (often coordinated).

**Root cause (in order of likelihood).**
1. **Brigading.** A subreddit or X thread points the wrong audience at us. They install, hate it, leave 1-stars, refund.
2. **A bug shipped that broke the experience for many users.** Usually traceable to a recent build.
3. **Apple algorithm change** (rare) — not actually a pile-on, just lower visibility for older 4-star reviews.

**First hour.**
- Read the 1-star reviews. Are they on the same complaint? If yes, brigading or bug. If varied, audience misalignment.
- Check the timestamp pattern. If 30 reviews land in 6 hours, brigading. If steady drip, bug.

**Recovery sequence.**
- If bug: fix and ship today. Reply to each 1-star review: "fixed in v1.X.X — open the app and pull-to-refresh. genuinely sorry. — e"
- If brigading: don't reply individually. Apple has an "appeal review" mechanism — use it for any review that violates Apple's review guidelines (offensive language, misrepresentation, etc.). Get those removed.
- If audience misalignment: tighten the IG hooks back to the named ICPs (`01-POSITIONING-AND-ICP.md`).
- Day 0–14: actively prompt happy users for reviews. The app already has the in-app review prompt on day 7 with 2+ saved mixes; reinforce via IG DMs to engaged followers: *"if elseware locked you in this week, an honest app store review would be huge."*
- Day 14: average rating should recover to 4.5+ as new reviews dilute the pile.

**What not to do.**
- ❌ Don't reply to 1-stars defensively. Use the template from `marketing/10-APP-STORE-COPY-TO-SHIP.md` review reply section.
- ❌ Don't bribe reviews. App Store TOS violation, account-level risk.
- ❌ Don't pull the app off sale. Visibility resets are punishing.

---

## 9. Webhook / welcome-email outage

**Symptom.** Buyers DM "I bought but didn't get the welcome email / wallpapers." Your serverless function logs show webhook events not being processed, or Postmark/Resend is bouncing.

**Root cause (in order).**
1. **Postmark/Resend rate-limit hit** — too many sends in too short a window.
2. **Domain auth dropped** — DNS records changed; SPF/DKIM/DMARC failing.
3. **Webhook auth header mismatch** — RC sending with one secret, function expecting another.
4. **Function deploy failure** — bad commit broke the endpoint.
5. **Email landed in spam** — not actually an outage; just landed wrong.

**First hour.**
- Check Postmark/Resend dashboard: any bounces, any rate-limit errors, any domain warnings?
- Check Cloudflare Worker / Vercel Edge logs: are events arriving but failing? Or not arriving at all?
- Check RC → Integrations → Webhooks → Last Delivery — green or red?

**Recovery sequence.**
- Hour 0: identify the broken layer.
- Hour 0–2: fix it. Postmark domain re-auth, redeploy function, rotate webhook secret, etc.
- Hour 2+: replay missed events. Postmark + RC both let you manually replay. Fire welcome emails for the lost window.
- Day 0–1: DM affected buyers individually: "fixed. wallpapers + protocol email in your inbox now. sorry for the lag."
- Day 1+: add a basic monitor. Even a Cron job that pings the webhook URL daily and Slack-pings you on failure is enough.

**What not to do.**
- ❌ Don't refund users for an email lag. Grant the wallpapers manually.
- ❌ Don't ship a complex retry queue. The simple solution is monitoring + manual replay.

---

## 10. Brand voice drift via UGC

**Symptom.** A creator with 200k followers reposts our preset Reel with the caption "morning self-care vibes ✨" or "the most relaxing app for anxiety." Their audience pours into our DMs.

**Root cause.** Cultural translation. Our voice is calm/disciplined; their audience reframes us as wellness/anxiety. Not malicious, but corrosive if amplified.

**First hour.**
- Don't reshare the post.
- Don't comment "thanks!" on the creator's post (you'd legitimize the framing).
- Read the inbound DMs. Anyone worth converting will use language consistent with our ICPs anyway.

**Recovery sequence.**
- Week 0: ignore. The original post fades.
- Week 0+: ship 5 Reels in a row that lean *harder* into the lock-in / discipline / not-wellness angle. Don't react; recalibrate the brand surface.
- Week 1: if a recurring set of creators keep reframing us as wellness, consider a pinned Story or a Pillar 1 Reel: "we are not a wellness app. that's the whole point." Address the audience directly, in our own voice.
- Long-term: this is why brand voice rules in `01-POSITIONING-AND-ICP.md` are non-negotiable. Every drift is either resisted or compounded.

**What not to do.**
- ❌ Don't repost the misframing on our own grid hoping to "ride the wave." The wave brings the wrong audience.
- ❌ Don't DM the creator asking them to change the caption. Doesn't work; reads as defensive.
- ❌ Don't relax brand rules to capture the inbound. Convert the ones who fit; lose the rest.

---

## The single shared rule for all 10

> *Don't change the brand to fix the crisis. Fix the crisis without changing the brand.*

The brand is the moat. Almost every recovery here keeps the brand intact. The few that don't (a real bug, a real over-promise) we fix the underlying mechanic, not the voice. We never apologize in someone else's voice. We never become Calm or Endel to escape a critic.

When in doubt: re-read `marketing/01-POSITIONING-AND-ICP.md` and `marketing/SUMMARY-ONE-PAGER.md`. The voice survives the crisis. We survive because the voice survives.

Lock in.
