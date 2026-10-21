# P3 Coffee Shop website

Static one-page site (HTML + CSS + vanilla JS), English and Arabic (RTL). No build step.

## Run it
Open `index.html` directly, or from the parent folder run `node serve.js` and visit http://localhost:5500.

## Structure
- `index.html` – all content. English text lives here; each element has a `data-i18n*` key.
- `js/i18n.js` – Arabic strings, same keys.
- `js/main.js` – header, mobile menu, reveal-on-scroll, language toggle, lightbox.
- `css/styles.css` – design tokens at the top (`:root`).
- `images/` – original downloads. `images/web/` – resized copies the site actually uses.
- `images/p3-photo-06.jpg` is **not** used (blurry, has a phone timestamp watermark).

## Fill in before launch (marked "Placeholder" on the page)
1. **Opening hours** – `index.html`, search `data-placeholder="hours"` (and the Arabic in `i18n.js`, `visit.hours.v`).
2. **Full menu & prices** – `index.html`, search `data-placeholder="menu"`; replace with a link/PDF.
3. Not on the site because unconfirmed: online ordering, delivery, reservations, Google rating/review count. The reviews link just opens Google Maps.

## Confirm with the owner
- Photos 02, 03 and 08 look like marketing renders: confirm they are real P3 assets.
- Photos 04, 05, 07, 09, 10 came from Google customer uploads: confirm usage rights, or swap in the café's own photos (keep the same filenames in `images/web/`).
- `storefront.jpg` shows customers and a sign reading "Peak Perfection Pro": confirm it is the right storefront.
- "The Essence of Kashmir" is used only as a tagline (from the P3 Instagram and cup packaging), with no claims about sourcing or heritage.
- Arabic copy was written for this site; have a native speaker review it.
