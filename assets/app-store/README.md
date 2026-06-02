# App Store Screenshots

8 SVG screenshots at 1290 × 2796 (iPhone 15 Pro Max — Apple's primary device size). Apple derives the smaller device sizes from the primary, so the operator only needs to upload one set.

These are generated from `scripts/generate-app-store-screenshots.js`. Don't edit by hand — re-run the generator.

## The 8 screenshots (ordered as they appear in App Store Connect)

| # | File | Hook | Purpose |
|---|---|---|---|
| 01 | `01-hero.svg` | "Put yourself somewhere." | Default page-1 conversion. Big serif headline + iPhone mockup of Tokyo Kissaten preset. |
| 02 | `02-place-gallery.svg` | "Pick a place. Lock in." | Lists all 6 places with mood lines so the buyer instantly understands what they're buying. |
| 03 | `03-mixer-detail.svg` | "Mix any of 18 channels." | Full mixer screen mockup with active channels lit. |
| 04 | `04-save-mix.svg` | "Save unlimited mixes. Yours forever." | Shows saved-mix list (first chapter, shipping at 2am, etc.) — proof of value. |
| 05 | `05-anti-subscription.svg` | "$9.99. Once." | Comparison table: Calm $69/yr · Headspace $69/yr · Endel $99/yr · Brain.fm $99/yr · Elseware $9.99 once. |
| 06 | `06-lock-in-guarantee.svg` | "60 days. Money back." | Guarantee seal + reassurance copy. |
| 07 | `07-bonus-stack.svg` | "Worth more than $147. Yours for $9.99." | The Hormozi value-stack revealed. |
| 08 | `08-brand-close.svg` | "lock in." | Brand closer for users who scroll all the way through. |

## Convert SVG → PNG before uploading

App Store Connect requires PNG/JPG. Convert with `librsvg` (recommended):

```bash
brew install librsvg
cd assets/app-store
for f in *.svg; do
  rsvg-convert -w 1290 -h 2796 "$f" -o "${f%.svg}.png"
done
```

Or open each SVG in Figma/Sketch and export at 1290×2796 PNG.

## Upload to App Store Connect

1. App Store Connect → Your App → App Store tab → "iPhone 6.7-inch Display"
2. Drag all 8 PNGs in numbered order. Apple keeps the order you upload.
3. Save.
4. (Optional) Repeat for 6.5" (1242×2688) and 5.5" (1242×2208) slots — re-run `rsvg-convert` with those dimensions.

## Update cadence

Update screenshots every quarter when a new place ships. Specifically:
- `02-place-gallery.svg` — add the new place to the list (edit the `places[]` array in the generator).
- `03-mixer-detail.svg` — no change needed, mockup is generic.
- `07-bonus-stack.svg` — bump "future places, free forever" copy if value perception shifts.

Re-run the generator and re-upload. Apple lets you update screenshots without a re-review.

## Why these 8 and not others

The order matters. Apple shows the first 3 screenshots above-the-fold on the App Store listing. So:

- **Screenshot 1** must hook with the brand promise.
- **Screenshot 2** must give the buyer a concrete picture of the product (the 6 places).
- **Screenshot 3** must show *the actual app* (the mixer) so they trust this is real.

Screenshots 4–8 close the buyer who's scrolled through. By then the question is "why this and not Calm/Endel" — that's screenshots 5 (price), 6 (guarantee), and 7 (bonus stack). Screenshot 8 is the brand mark.

This ordering is engineered. Don't shuffle without A/B testing.

## Product Page Optimization (PPO)

Apple lets you run up to 3 variants. Per `marketing/07-FUNNEL-AND-ASO.md`:

- **PPO test 1 (week 4–7):** does swapping screenshot 5 (anti-subscription) into slot 2 outperform place gallery?
- **PPO test 2 (week 8–11):** test alternative icon (the soft serif "E" vs a 6-place mosaic).
- **PPO test 3 (week 12–15):** test alternative subtitle.

One test at a time. 90% confidence floor before declaring a winner.
