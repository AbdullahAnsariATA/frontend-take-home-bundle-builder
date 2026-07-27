# Build Your Security System — Bundle Builder

EcomExperts frontend take-home: a multi-step security-system **bundle builder** with a live review panel.

**Brief:** [Frontend Take-Home Bundle Builder](https://ecomexperts-io.notion.site/Frontend-Take-Home-Bundle-Builder-3809ca8db0d78021b013da55f3f99acc)  
**Design:** [Figma desktop](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=74-19845) · [Figma mobile](https://www.figma.com/design/JYf61etQVqeseX7oY5alGz/Frontend-Test-Figma?node-id=68-9663)

---

## Quick start

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

```bash
npm run build      # production build
npm run preview   # preview build
npm run lint      # oxlint
npm run test:e2e  # Playwright (desktop + mobile)
```

First-time Playwright setup:

```bash
npx playwright install chromium
```

---

## Requirements checklist

Verified against the [Notion brief](https://ecomexperts-io.notion.site/Frontend-Take-Home-Bundle-Builder-3809ca8db0d78021b013da55f3f99acc) and Figma frames. Covered by Playwright (`e2e/bundle-builder.spec.ts`) — **26 passing**.

| Requirement | Status |
| --- | --- |
| Pixel-faithful UI (colors, typography, layout tokens) | Done — Gilroy, `#4E2FD2`, 768 / 399 columns, mobile heading |
| Desktop + mobile responsive layouts | Done |
| Data-driven UI from JSON (`src/data/products.json`) | Done |
| 4-step accordion (cameras open by default) | Done |
| Product cards (badge, image, variants, stepper, pricing) | Done |
| Per-variant quantities (independent; review lists qty &gt; 0) | Done |
| Card image updates with active color variant | Done |
| “N selected” counter per step | Done |
| Live review panel (categories, plan, shipping, totals, savings) | Done |
| Steppers synced between cards and review | Done |
| Save for later → `localStorage` restore | Done |
| Checkout placeholder (styled modal, not native `alert`) | Done |
| React Context + `useReducer` state | Done |
| React + Vite + Tailwind CSS v4 | Done |

**Intentional product choices**

- Starts **empty** (nothing pre-selected) so items only appear in review after the shopper adds them — clearer UX than a seeded Figma cart.
- Savings banner **reserves space** when hidden so the checkout CTA does not jump.
- Motion + branded alert modal are polish beyond the minimum brief.

---

## Features

- **Guided accordion** — Choose cameras → plan → sensors → extra protection
- **Variant isolation** — Each color has its own quantity; active variant drives the card stepper and product image
- **Live pricing** — Compare-at, active total, free shipping, “as low as $/mo”, savings callout
- **Persistence** — “Save my system for later” stores quantities, active variants, and current step
- **Motion** — Entrance, accordion, selection, and review list animations (`framer-motion`, respects `prefers-reduced-motion`)

---

## Project structure

```
src/
  components/
    builder/       Accordion steps + product cards
    review/        Live review panel, line items, totals
    typography/    Text + Price primitives
    ui/            Button, steppers, variants, AlertModal
    layout/        App shell
    icons/         SVG icons
  constants/       Colors, typography, motion, bundle config
  context/         Bundle + Alert providers / reducers
  hooks/           useBundle, pricing, selection, save, alert
  utils/           cn, formatPrice, quantityKey, lineItems
  data/            products.json + variant image map
  types/
```

---

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` tokens)
- Framer Motion
- Playwright (desktop 1440 + mobile)

---

## Design decisions

- **Context + `useReducer`** — Enough for builder ↔ review sync without a state library
- **JSON as source of truth** — Products, prices, and variants are not hardcoded in JSX
- **Unit price × quantity** — Totals are derived from data for consistency (Figma review numbers can look hand-tuned)
- **Semantic class hooks** — Classes like `.product-card` / `.review-panel` kept alongside Tailwind for stable e2e selectors
- **Tokens** — Brand colors live in `src/constants/colors.ts` and `@theme` in `src/index.css`

---

## Testing

```bash
npm run test:e2e
```

Covers Figma token fidelity, accordion, counters, variants, stepper sync, save/restore, checkout modal, and empty → select → review flows on desktop and mobile.
