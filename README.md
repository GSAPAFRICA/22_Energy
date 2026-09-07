# 22 Energy — Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build: `npm run build && npm run start`.

## Where to edit things

- **Contact info (phone / WhatsApp / email)** — `src/data/company.ts`. Every "Call/WhatsApp/Email"
  button on the site reads from here, so updating it once updates everywhere.
- **Home package pricing (Starter/Home/Business/Custom)** — `src/data/packages.ts`. Prices are
  placeholders (`From $XXX`) since real figures weren't supplied — swap them in directly.
- **Commercial inverter & lithium battery pricing** — `src/data/products.ts`. Contains the exact
  supplied Naira prices; add/remove/edit line items here and the pricing tables update automatically.
- **Projects/installations gallery** — `src/data/projects.ts`. Replace the placeholder art variant
  with real photos (drop them in `public/images/` and swap the illustration for a `next/image`).
- **Testimonials** — `src/data/testimonials.ts`. Clearly marked as placeholders — replace with real,
  permissioned customer quotes before launch.
- **Quote form submission** — `src/components/forms/QuoteForm.tsx`, inside `handleSubmit`. Currently
  simulates a request; replace with a real `fetch()` to your API/server action when ready.
- **Colors, spacing, radius tokens** — `src/app/globals.css` (`:root` and `@theme inline` blocks).

## Notes

- All photography-style visuals are original SVG illustrations (no stock photos), since real
  installation photography wasn't supplied. Swap them for real photos via `next/image` whenever
  you have them.
- The logo is stored at `public/images/logo.png` (original) and `public/images/logo-transparent.png`
  (background removed, used on dark sections).
