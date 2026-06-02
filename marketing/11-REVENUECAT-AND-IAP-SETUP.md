# 11 — RevenueCat & App Store IAP Setup

> The Grand Slam Offer doesn't matter if Apple won't take the money.

This is the paste-ready operator checklist for shipping the Lifetime Unlock IAP through App Store Connect and wiring it into RevenueCat. Every step has a verification check. If a verification fails, do not proceed.

---

## What we're shipping

**Two IAP products** — one for now, one pre-staged for the price ladder per `02-GRAND-SLAM-OFFER.md`.

| Product | Type | Price | When |
|---|---|---|---|
| `com.blocksoftware.elseware.lifetime_unlock` | Non-Consumable | **$9.99** | Now (unlocks 1–5,000) |
| `com.blocksoftware.elseware.lifetime_unlock_v2` | Non-Consumable | **$14.99** | Auto-cutover at unlock #5,001 |

**Why two products, not a price change on one product:** Apple lets you change a non-consumable's price, but it changes for *everyone* including users mid-purchase-flow, which can fail purchases that were already showing a different price. Shipping a second product avoids that. The first product becomes "Available: No" after the cutover.

---

## Step 1 — App Store Connect: Banking, Tax, Agreements (skip if already live)

Apple won't release IAP earnings until these three are signed. Set them up *before* creating the IAP product.

1. **App Store Connect → Agreements, Tax, and Banking.**
2. Sign the **Paid Apps Agreement** (this is the gating one).
3. Add **Bank Account** (US: ACH; international: SWIFT). Verification takes 2–5 business days.
4. Complete **Tax Forms** (US: W-9; international: W-8BEN).

**Verification:** Status reads "Active" on all three. If "Pending," proceed to step 2 in parallel — the IAP can be created before agreements clear, but cannot ship to users.

---

## Step 2 — Create the Lifetime Unlock IAP

App Store Connect → Your App → **Monetization** → **In-App Purchases** → **+** to add.

### Configuration for `com.blocksoftware.elseware.lifetime_unlock`

| Field | Value |
|---|---|
| **Type** | Non-Consumable |
| **Reference Name** (internal only) | Elseware Lifetime Unlock |
| **Product ID** | `com.blocksoftware.elseware.lifetime_unlock` |
| **Cleared for Sale** | Yes |
| **Price** | Tier 10 (USD $9.99) — Apple uses tier numbers; tier 10 = $9.99 in the US, regional equivalents elsewhere. Or use Apple's new "Custom Price" picker to set $9.99 exactly. |
| **Display Name (English – US)** | Elseware Lifetime Unlock |
| **Description (English – US)** | The audio uniform of locking in. Mix all 18 channels, save unlimited mixes, background playback, secret presets, wallpapers, the focus timer, and all future places — yours forever. |
| **Review Notes** | Non-consumable lifetime unlock. Single one-time purchase grants permanent access to all features. No subscription. Restore Purchase available in app Settings and on the paywall. |
| **Review Screenshot** | Use `assets/app-store/01-hero.svg` exported to PNG at 1290×2796 (any of our screenshots works for review). |

### Localizations (do these for top 5 markets at minimum)

Set up English (US) first, then duplicate and translate for: English (UK), French, German, Japanese, Spanish (Latin America). Keep the brand voice — lowercase, no emoji, no exclamation points. Use a translator who reads the ICP doc; do not pay for cheap localization that shifts tone.

**Verification:** IAP shows "Ready to Submit" or "Approved" status before TestFlight build is uploaded.

---

## Step 3 — Create the price-ladder IAP (pre-staged, not yet for sale)

Repeat Step 2 with these differences:

| Field | Value |
|---|---|
| **Product ID** | `com.blocksoftware.elseware.lifetime_unlock_v2` |
| **Cleared for Sale** | **No** (toggle to Yes when we hit 5,000 unlocks) |
| **Price** | Tier 15 (USD $14.99) |
| **Display Name** | Elseware Lifetime Unlock |
| **Description** | (same as v1) |

We submit this for Apple review at the same time as v1 so it's pre-approved. We just keep it "Cleared for Sale: No" until cutover day.

**Cutover procedure (do at unlock #5,000):**
1. App Store Connect → v1 IAP → toggle "Cleared for Sale: No."
2. App Store Connect → v2 IAP → toggle "Cleared for Sale: Yes."
3. RevenueCat → swap the package's product reference (see Step 5 below).
4. Tweet/IG post: "founders wall closed at 5,000. price is $14.99 forever."

The price ladder is HONEST scarcity (per `02-GRAND-SLAM-OFFER.md`). Don't reverse it.

---

## Step 4 — Create a Sandbox Tester for QA

App Store Connect → **Users and Access** → **Sandbox Testers** → **+**.

| Field | Value |
|---|---|
| Email | `qa+sandbox@elseware.app` (or any email you control) |
| First/Last name | QA Tester |
| Country/Region | United States (matches your IAP price tier) |
| Date of Birth | 1990-01-01 |

**Verification:** The tester shows up in the list. Then on a test device:
- Settings → App Store → Sandbox Account → Sign In with the sandbox tester credentials.
- Sandbox accounts NEVER work with the production App Store — different password, different Apple ID.
- Sandbox accounts get test-mode purchases (no real money charged).

---

## Step 5 — RevenueCat Configuration

RevenueCat dashboard → Project Settings → Apps → iOS app already exists (per `src/config/constants.ts` API key `appl_FJNZSoYWWFCPJMTbuibMXLCJpes`).

### 5a. Add the IAP products

RevenueCat → **Products** → **+ New Product**. Add both:

| Identifier | Store | Type |
|---|---|---|
| `com.blocksoftware.elseware.lifetime_unlock` | App Store | Non-Consumable |
| `com.blocksoftware.elseware.lifetime_unlock_v2` | App Store | Non-Consumable |

### 5b. Define the entitlement

RevenueCat → **Entitlements**. The existing entitlement is `pro` (legacy ID — see `src/config/constants.ts`). Don't rename it; existing/historical purchases would break. Customer never sees the ID.

Attach **both** products to the `pro` entitlement. This way, no matter which version of the IAP a user purchased, they get access.

### 5c. Build the offering

RevenueCat → **Offerings** → **+ New Offering**.

- **Identifier:** `default`
- **Display Name:** "Elseware Lifetime Unlock"
- **Set as Current Offering:** Yes

Add a **Package** to the offering:
- **Identifier:** `lifetime`
- **Package Type:** Lifetime (this maps to RevenueCat's `$rc_lifetime` package)
- **Product:** `com.blocksoftware.elseware.lifetime_unlock` (active product)

When we cutover at unlock #5,000, edit this package and swap to `..._v2`.

### 5d. Webhooks (for the welcome email)

RevenueCat → **Integrations** → **Webhooks** → **+ New Webhook**.

| Field | Value |
|---|---|
| **URL** | `https://api.elseware.app/webhooks/revenuecat` (your serverless endpoint — Cloudflare Worker or Vercel Edge) |
| **Authorization Header Value** | A long random string. Generate with `openssl rand -hex 32`. Save it as `REVENUECAT_WEBHOOK_SECRET` env var on the endpoint. |
| **Events to send** | `INITIAL_PURCHASE`, `RENEWAL` (just in case), `CANCELLATION`, `BILLING_ISSUE`, `PRODUCT_CHANGE` |

The endpoint validates the auth header, then enqueues the welcome email per `emails/README.md`.

**Skeleton endpoint (paste into Cloudflare Worker / Vercel Edge):**

```typescript
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const auth = req.headers.get('authorization');
    if (auth !== env.REVENUECAT_WEBHOOK_SECRET) return new Response('forbidden', { status: 403 });
    if (req.method !== 'POST') return new Response('method not allowed', { status: 405 });

    const body = await req.json() as RcEvent;
    if (body.event.type === 'INITIAL_PURCHASE') {
      const email = body.event.subscriber_attributes?.['$email']?.value;
      if (email) {
        await sendWelcomeEmailIn1Hour(email, env);
      }
    }
    return new Response('ok');
  },
};
```

(See `emails/README.md` for the full transactional-email plumbing.)

---

## Step 6 — Local StoreKit testing (no sandbox needed)

For day-to-day development, use Xcode's StoreKit Configuration File so you can test purchase flows without signing into a sandbox account every time.

A pre-built config is shipped at `scripts/Products.storekit`. Wire it into the Xcode build:

1. Open `ios/Elseware.xcworkspace` in Xcode.
2. **File → Add Files** → select `scripts/Products.storekit`. Add to the Elseware target.
3. **Product → Scheme → Edit Scheme** → Run → Options → **StoreKit Configuration** → choose `Products.storekit`.
4. Now `expo run:ios` triggers the StoreKit overlay with synthetic purchases that cost nothing.

The synthetic StoreKit purchase still hits RevenueCat in dev mode; we can verify entitlement state end-to-end.

---

## Step 7 — Pre-submit smoke test

Before clicking "Submit for Review," run the full flow on a real iPhone, with a real sandbox account.

1. Install via TestFlight (latest build).
2. Sign in to sandbox tester on the device (Settings → App Store → Sandbox Account).
3. Open Elseware. Tap UNLOCK FOREVER.
4. Verify the paywall shows the correct price (`$9.99`) — pulled from RevenueCat live.
5. Tap "Unlock Forever — $9.99." Apple sandbox dialog → **Buy**.
6. Wait for the success state → paywall closes.
7. Verify entitlement: locked presets (Kyoto Tea House, Marfa Desert, etc.) become tappable and play.
8. Verify entitlement: focus timer card shows the 25/45/90-min preset buttons (instead of the locked card).
9. Verify entitlement: "My Mixes" section appears with the "+ Save Current" button.
10. Force-quit. Reopen. Entitlement persists.
11. Reset device or use a different sandbox tester to confirm "Restore Purchase" path. Tap Restore on the paywall, sign in with the original purchaser's sandbox account → entitlement restores.
12. Verify webhook fired by checking the welcome email queue (check the serverless endpoint's logs).

If **any** of those 12 fail, **do not submit.** Diagnose, fix, re-test.

---

## Step 8 — Submit for Apple Review

Submit the build with:

| Item | Where |
|---|---|
| Build with new PaywallModal, secret presets, focus timer, links page | TestFlight → "Submit for Review" |
| Both IAPs (v1 and v2) attached to the build | App Store Connect → App Store tab → In-App Purchases section |
| Screenshots, description, keywords | Pasted from `marketing/10-APP-STORE-COPY-TO-SHIP.md` |
| Demo account credentials for review | Sandbox tester credentials so Apple's reviewer can buy without paying |
| Review notes | "This is a non-consumable lifetime unlock. To test, tap UNLOCK FOREVER on the paywall and complete the purchase. Verify locked presets become tappable, focus timer becomes usable, and Restore Purchase works. The Lock-In Guarantee in the paywall references our refund policy at refund@elseware.app — we honor refunds via Apple's standard refund flow." |

Apple reviews in 24–48 hours typical. If rejected: fix and resubmit. Don't argue. Most rejections are missing review notes or not making the IAP testable.

---

## Step 9 — Post-launch monitoring

| Metric | Where | Threshold |
|---|---|---|
| Install-to-unlock conversion | RevenueCat dashboard → Charts → Conversion | Floor: 8%. See `08-KPIS-AND-DECISIONS.md`. |
| Refund rate (Apple-reported) | RevenueCat → Refunds | Healthy: <5%. >10% = paywall over-promised. |
| Sandbox vs Production split | RevenueCat → Sources | Sandbox should be tiny after launch; if it's >10%, attribution is misconfigured. |
| Welcome email send-rate | Postmark/Resend dashboard | One per `INITIAL_PURCHASE` event, no retries needed. |

---

## Step 10 — Cutover at unlock #5,001

This is a real, advertised event. Follow the plan ruthlessly per `02-GRAND-SLAM-OFFER.md`:

1. **Detection** — RevenueCat → Charts → cumulative paying users. Or query the API directly. Watch from unlock #4,800 onward.
2. **At unlock #4,990** — pin a Reel: "10 left at $9.99."
3. **At unlock #5,000** — toggle v1 IAP "Cleared for Sale" to NO. Toggle v2 to YES. Update RevenueCat package product reference.
4. **Verify** — open the live App Store on a fresh phone (not an existing buyer's): the IAP price should now read $14.99.
5. **Announce** — IG Reel: "founders wall closed at 5,000. price is $14.99 forever."
6. **Update website** — `index.html` and `paywall` copy already display $9.99 dynamically from RevenueCat; no change needed there. Update `marketing/00-EXECUTIVE-SUMMARY.md` if you want to log the milestone.

If we hit unlock #5,001 and v2 isn't cleared for sale yet, sales pause until we toggle. Acceptable, brief — but pin the 5,000-Reel before sales pause, not after.

---

## Reference: file map

| File | Purpose |
|---|---|
| `scripts/sync-analytics.js` | Pulls `cumulative_unlocks` from RC REST API into `launch-status.json`. Requires `REVENUECAT_SECRET_KEY` + `REVENUECAT_PROJECT_ID` env vars (RC → Project Settings → API keys → "Secret API key" — distinct from the public SDK key). |
| `src/config/constants.ts` | RevenueCat *public* API key + entitlement ID (`pro`) |
| `src/context/PurchaseContext.tsx` | Loads offerings, exposes `purchase()`, `restore()`, `isPro` |
| `src/components/PaywallModal.tsx` | Renders the offer; price comes from RevenueCat |
| `scripts/revenuecat-config.json` | Paste-ready reference for the RevenueCat dashboard |
| `scripts/Products.storekit` | Xcode StoreKit configuration for local testing |
| `emails/welcome.txt` | Welcome email body (triggered by webhook) |
| `emails/README.md` | Full transactional-email wiring guide |
| `marketing/02-GRAND-SLAM-OFFER.md` | Why the offer is structured this way |
| `marketing/07-FUNNEL-AND-ASO.md` | Where this fits in the funnel |
| `marketing/10-APP-STORE-COPY-TO-SHIP.md` | The strings that go on the App Store listing |

---

## What can go wrong (and what to do)

### "RevenueCat shows the offering as 'no current offering'"
Most common: the offering is created but not marked **Current**. Mark it. Or the iOS app isn't pointing at the right project — double-check the API key.

### "The paywall shows blank price"
Either RevenueCat isn't returning the offering (network, API key, missing offering) or the iOS device isn't logged into a sandbox account when running the dev build. Check Xcode console for "RevenueCat init error."

### "Sandbox purchase succeeds but entitlement doesn't unlock"
Almost always: the product isn't attached to the entitlement in RevenueCat dashboard. Double-check Step 5b.

### "Welcome email never arrives"
Webhook auth header mismatch (most common), webhook URL is HTTP instead of HTTPS, or the `INITIAL_PURCHASE` event filter is unchecked. Check the RevenueCat → Integrations → Webhook → "Last Delivery" status.

### "Apple rejected for 'IAP product not provided'"
Reviewer notes weren't clear enough about how to trigger the paywall. Add explicit step-by-step ("1. Open app. 2. Tap UNLOCK FOREVER button at top. 3. Tap purchase button.").

### "User says they paid but the app doesn't unlock"
Tap Restore Purchase. If still no entitlement, it usually means they bought on a different Apple ID. RevenueCat's customer dashboard can search by email or by RC user ID — find their record and confirm purchase landed.

---

When this is fully shipped, the Grand Slam Offer is live. Then the only thing between you and unlocks is whether the Reels actually convert. Which is `04-90-DAY-CONTENT-CALENDAR.md`'s job.

---

## Email capture for the welcome email — shipped

Apple's IAP doesn't expose the user's email. RevenueCat fires the `INITIAL_PURCHASE` webhook regardless, but the payload only contains an email address if we've explicitly set one via `Purchases.setEmail(email)`.

This is shipped via:

- `src/components/EmailCaptureCard.tsx` — inline card (not a modal) that renders right after `isPro` flips true. Voice on-brand: "you're in. one last thing. want the 12 wallpapers + your spot on the founders wall? drop your email."
- `src/context/PurchaseContext.tsx` — `needsEmailCapture` state, `captureEmail(email)` calls `Purchases.setEmail()` then persists `captured`. `dismissEmailCapture()` persists `dismissed`. Either way the card hides and never re-shows.
- Persistence key: `@elseware/email_capture_state` in AsyncStorage. Values: `captured` | `dismissed` | absent.
- Edge case handled: if a user purchased on a previous app version *before* this card existed, the next launch will see `isPro && !captureState` and surface the card once. They can still skip.
- Edge case handled: `restore()` also surfaces the card if `isPro` becomes true and no state is recorded — so a user restoring on a new device gets the prompt.

Webhook flow once email is captured:
1. Client calls `Purchases.setEmail(email)`.
2. RevenueCat stores `$email` as a subscriber attribute.
3. Next event sent to the webhook (often `INITIAL_PURCHASE` itself if `setEmail` is called fast enough; otherwise a follow-up `SUBSCRIBER_ATTRIBUTE_UPDATE`) carries the email.
4. Webhook handler reads `body.event.subscriber_attributes.$email.value` and queues the welcome email via Postmark/Resend.

Realistic capture rate at the post-purchase moment: ~50–70% based on similar one-shot prompts. The 30–50% who skip still own Lifetime; they get the wallpapers via the IG DM thread when they ask for them.
