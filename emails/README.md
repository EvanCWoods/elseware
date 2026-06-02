# Transactional Emails

Three operator-pasteable plain-text email bodies. No HTML, no tracking pixels, no "engagement series." Per the brand voice rules: lowercase, calm, no exclamation points.

## Files

| File | Trigger | When |
|---|---|---|
| `welcome.txt` | New Lifetime Unlock purchase | 1 hour after RevenueCat fires the `INITIAL_PURCHASE` webhook |
| `30-day-checkin.txt` | 30 days post-unlock | Cron / scheduled, day 30 since unlock |
| `refund-confirmation.txt` | Manual reply | Sent by hand from `refund@elseware.app` after we acknowledge the refund |

## Setup (one-time)

1. **Email addresses.** Create `welcome@elseware.app` and `refund@elseware.app` in Google Workspace (or Fastmail, or any IMAP provider). Add MX records for the domain.

2. **Transactional sender.** Sign up for **Postmark** (best deliverability for plain-text; ~$15/mo for our volume) or **Resend** (cheaper, also fine).

3. **Domain auth.** Add the SPF, DKIM, and DMARC records the provider gives you to the `elseware.app` DNS. Wait until status reads "verified" before sending live mail.

4. **Webhook for welcome.txt.**
   - In RevenueCat → Integrations → Webhooks, add a webhook URL pointing at a tiny serverless function (Cloudflare Worker / Vercel Edge Function) that listens for `INITIAL_PURCHASE` and `RENEWAL`-but-actually-our-product-is-non-renewing-so-just-`INITIAL_PURCHASE`.
   - The function calls Postmark/Resend with the body of `welcome.txt`.
   - Schedule it for `now + 1 hour` so the user has settled in before the email arrives. (Postmark supports scheduled-send via `MessageStream`.)

5. **30-day check-in.** Same webhook, but on `INITIAL_PURCHASE` schedule a second send for `now + 30 days` using the same Postmark message-stream feature. Or run a daily cron that queries the customer-info table for "purchased 30 days ago" and sends.

6. **Refund replies.** Manual. When a refund email lands at `refund@elseware.app`:
   - Acknowledge within 24h with a single `mailto` reply.
   - Confirm the refund through Apple's Reportabug / refund flow (Apple handles the actual money).
   - Send `refund-confirmation.txt` once Apple confirms.

## Token replacement

The bodies contain placeholders the operator (or webhook) substitutes:

- `[wallpapers iCloud link]` — paste the iCloud share URL once after generating wallpapers (see `assets/wallpapers/README.md`). Same link for every customer.
- `[ELSEWARE_APP_ID]` — replace with the App Store ID once Apple assigns it.

There are no per-customer tokens. We don't personalize beyond "hi —" because the brand voice is calm-not-warm.

## What we deliberately don't ship

- Newsletter. We are not Calm. No weekly digest.
- Re-engagement series. If a user stops using the app, that's their decision.
- Birthday emails. Off-brand.
- Upsell emails. There is nothing to upsell. The whole point.
- HTML emails. Plain text outperforms for our voice and sends faster.
- Open tracking pixels. We don't surveil customers.

## Test send before launch

Run a dummy purchase through TestFlight, confirm welcome.txt arrives 1 hour later, confirm the iCloud wallpaper link works, confirm reply-to is set to `welcome@elseware.app`. Then ship.
