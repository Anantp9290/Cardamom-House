# Cardamom House: menu page

A single-page, mobile-first menu for a fictional Lisbon brunch café. Built as a frontend trial task.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict, no `any`) · Tailwind CSS v4 · `next/font` (Fraunces + Instrument Sans). No backend, no CMS, no images.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

Deploy to Vercel by importing the repo. No configuration or env vars needed.

## The three states

Switch with a query param, or with the "Preview state" links in the footer.

| URL | What you see |
| --- | --- |
| `/?state=open` (default) | Tuesday 11:30. Open, special promoted. |
| `/?state=closed` | Monday. Banner above the hero with the next opening time; special hidden. |
| `/?state=special-sold-out` | Tuesday 11:30. Special callout becomes a "sold out" notice; Saffron French Toast is dimmed with a "Sold out" pill and struck-through price. |
| `/?state=live` | Real time in Lisbon (`Europe/Lisbon`), computed with `Intl`. |

The status logic (`src/lib/hours.ts`) works from the hours data, so it also handles "before opening" and "after closing" correctly, and skips closed days when finding the next opening.

## Structure

```
src/
  app/          layout (fonts, metadata), page (server component), globals.css (tokens)
  components/   Hero, ClosedBanner, SpecialCallout, MenuExplorer (client), CategoryNav (client),
                DietFilter (client), MenuSection, MenuItem, TagBadge, HoursBlock, Footer, PodOrnament
  data/menu.ts  the mock data from the brief, typed
  lib/          types, hours/status logic, scenario resolver, formatters, useScrollSpy
```

Only the menu area is a client component (scroll-spy nav and dietary filter). Everything else renders on the server.

## Design decisions

- **Palette.** Amber `#B45309` is the brand and carries the actions: buttons, the special callout, the active nav pill, accent rules, hover states, today's row in the hours table. It sits on a pale cardamom-green paper with deep green-black ink, so the amber reads as a spice against a leaf rather than as a generic "warm café" beige. Small amber text uses a darker variant (`#8F3F07`, lighter in dark mode) to stay above WCAG AA.
- **Type.** Fraunces (soft, high optical size) for the wordmark, headings and dish names; Instrument Sans for reading text.
- **Dish list.** Name, dotted leader, price, like a printed menu. Tags are small tinted pills with visually-hidden full words for screen readers.
- **Nav.** One `<nav>`, two layouts: a sticky horizontally-scrolling pill bar on phones (44px tap targets, active pill auto-scrolls into view) and a sticky side rail from `lg`. Active section is tracked with `IntersectionObserver`.
- **Motion.** One thing: the hero settles in on load. Disabled under `prefers-reduced-motion`.
- **Closed state.** The banner sits above the hero, so it's the first thing seen. The special is hidden rather than promised on a day nothing is served.
- **Sold-out state.** The callout changes tone (dashed outline, neutral surface) instead of disappearing, and offers a way back into the menu.

## Accessibility

Semantic landmarks (`header`-less hero section, `nav`, `main`, `section` with `aria-labelledby`, `address`, `footer`, a real `<table>` for hours), skip link, visible focus ring on everything, `aria-current` on the active nav link and today's row, `aria-pressed` on filter buttons, a live region announcing the filter result count, and decorative SVGs hidden from assistive tech. Colour is never the only signal: closed days say "Closed", today says "Today", sold-out says "Sold out".

## Stretch goals included

Dark mode (follows `prefers-color-scheme`), print stylesheet (two-column, controls hidden), dietary filter, one tasteful entrance animation. No photography: the page leans on type and colour.

## Trade-offs and what I'd build next

- Prices use `en-IE` formatting (`€11.50`) because the page is in English; a `pt-PT` version would render `11,50 €`.
- Hours don't support closing after midnight.
- No Portuguese translation yet; the data shape would need a `locale` layer.
- Next: real photography for the special, structured data (`schema.org/Restaurant`) for search, a Playwright smoke test per state, and testing the sticky nav on more real devices.
