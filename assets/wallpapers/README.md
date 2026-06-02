# Lock-In Wallpapers

12 wallpapers shipped as part of the Elseware Lifetime Unlock bonus stack ($12 of stated value).

These SVG sources are generated from `scripts/generate-wallpapers.js`. Don't edit them by hand — re-run the script and regenerate. Output dimensions: 1170 × 2532 (iPhone 15 Pro / 14 Pro / 13 Pro / 12 Pro). iOS auto-scales to other devices.

## Contents

| # | File | Place |
|---|---|---|
| 01 | `01-tokyo-kissaten.svg` | Tokyo Kissaten |
| 02 | `02-lisbon-rainstorm.svg` | Lisbon Rainstorm |
| 03 | `03-library-in-seoul.svg` | Library in Seoul |
| 04 | `04-trans-siberian.svg` | Trans-Siberian |
| 05 | `05-bali-morning.svg` | Bali Morning |
| 06 | `06-tulum-beachfront.svg` | Tulum Beachfront |
| 07 | `07-kyoto-tea-house.svg` | Kyoto Tea House (lifetime-only) |
| 08 | `08-marfa-desert.svg` | Marfa Desert (lifetime-only) |
| 09 | `09-berlin-backroom.svg` | Berlin Backroom (lifetime-only) |
| 10 | `10-reykjavik-4am.svg` | Reykjavik 4am (lifetime-only) |
| 11 | `11-elseware-mark.svg` | Brand wordmark wallpaper |
| 12 | `12-lock-in.svg` | "lock in" minimalist text wallpaper |

## Convert to PNG before shipping

iOS doesn't accept SVG as a wallpaper. Convert with `librsvg` (recommended) or any SVG → PNG tool.

```bash
brew install librsvg
cd assets/wallpapers
for f in *.svg; do
  rsvg-convert -w 1170 -h 2532 "$f" -o "${f%.svg}.png"
done
```

Or open each SVG in Figma and export at 1170 × 2532 PNG.

## How they ship to the user

After Lifetime Unlock, the welcome email contains a single iCloud-share link to a folder containing all 12 PNGs. Operator workflow:

1. Convert all 12 to PNG with the command above.
2. Drag the 12 PNGs into a folder in iCloud Drive (e.g. `Elseware/Lock-In Wallpapers`).
3. Right-click → Share → Copy Link. Set permission to "Anyone with the link".
4. Paste the link into `emails/welcome.txt` where it says `[wallpapers iCloud link]`.

That's the entire fulfillment pipeline.

## Regenerating

If you want to add a new place wallpaper or tweak the design:

```bash
# edit scripts/generate-wallpapers.js (palette, layout, accent kinds, or wallpapers[] config)
node scripts/generate-wallpapers.js
# then re-export PNGs and re-share the iCloud folder.
```

The script is idempotent — re-running cleans previously generated SVGs and writes fresh ones.
