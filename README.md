# 22 Energy — Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build: `npm run build && npm run start`.

The standard Next.js server does not provide Cloudflare bindings, so quote submission intentionally
fails closed under `npm run dev`. To test the complete quote flow with simulated email delivery:

```bash
copy .env.example .env.local
copy .dev.vars.example .dev.vars
npm run dev:vinext
```

Open http://localhost:3001. The committed example values use Cloudflare's always-pass localhost
Turnstile test pair. Wrangler's local `send_email` binding logs/saves the message and does not deliver
real email. Do not add `remote: true` to the binding for ordinary development.

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
- **Quote form submission** — `src/components/forms/QuoteForm.tsx` posts to
  `src/app/api/quote/route.ts`. Shared field rules live in `src/lib/quote.ts`.
- **Colors, spacing, radius tokens** — `src/app/globals.css` (`:root` and `@theme inline` blocks).

## Cloudflare Workers deployment

This project uses Cloudflare's current Next.js 16 automatic-deployment path: vinext plus the
Cloudflare Vite plugin. The vinext compatibility check reports all used framework features as
supported. The Cloudflare production build command is:

```bash
npm run build:vinext
```

For a manual deployment, use `npm run deploy`. In Workers Builds, use `npm run build:vinext` as the
build command and `npm run deploy:vinext` as the deploy command if the dashboard asks for explicit
commands. Do not use `npm run build` as the Worker build command; that script remains available for
the standalone Next.js runtime.

### Required production configuration

1. **Fixed quote destination:** `wrangler.jsonc` sets both `QUOTE_EMAIL_TO` and the binding's
   enforced `destination_address` to the Cloudflare-verified destination
   `22energyorg@gmail.com`. The browser never supplies this value. If the verified destination ever
   changes, update both values together.
2. **Sending domain:** Onboard `22energy.org` in Cloudflare Email Service for outbound sending if it
   is not already enabled. Keep the code's fixed sender, `marketing@22energy.org`, and publish the
   SPF/DKIM/DMARC records Cloudflare generates for that sending domain. Those record targets/values
   are account-specific and must be copied exactly from the dashboard. Do **not** replace Google
   Workspace MX records and do **not** disable or recreate Email Routing.
3. **Turnstile widget:** Create a managed Turnstile widget allowing `22energy.org` and
   `www.22energy.org`. In **Workers Builds > Settings > Build variables and secrets**, add its public
   site key as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` so it is present while the client bundle is built.
4. **Turnstile runtime secret:** In the deployed Worker's **Settings > Variables and Secrets**, add
   the matching secret as an encrypted secret named `TURNSTILE_SECRET_KEY`. Never add the production
   secret to `wrangler.jsonc`, `.env.local`, or source control.
5. **Hostname rule:** `TURNSTILE_ALLOWED_HOSTNAMES` is committed as
   `22energy.org,www.22energy.org`. Update that Wrangler variable only if the production hostname set
   changes; do not add localhost to the production value.

Deployment creates a `send_email` binding named `QUOTE_EMAIL`. Its Wrangler configuration restricts
delivery to the single configured recipient and restricts the sender to `marketing@22energy.org`.
The route also uses only those server-side values and sets Reply-To to the validated customer email.

After changing `wrangler.jsonc`, run `npm run cf-typegen` on a normal local machine and commit the
regenerated Worker types if your workflow uses them.

## Notes

- All photography-style visuals are original SVG illustrations (no stock photos), since real
  installation photography wasn't supplied. Swap them for real photos via `next/image` whenever
  you have them.
- The logo is stored at `public/images/logo.png` (original) and `public/images/logo-transparent.png`
  (background removed, used on dark sections).
