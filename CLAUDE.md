# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML/CSS/JS site for **UngeKunstnere**, a Danish online gallery platform where emerging artists present themselves and sell original artwork. There is no build step, package manager, or test suite — it's plain HTML/CSS/JS served as-is.

## Development

There is no build/lint/test tooling in this repo. To preview changes, serve the directory root and open `index.html`, e.g.:

```
python3 -m http.server 8000
```

## Architecture

- `index.html` — the single page currently implemented (the site's front page). Other nav items (`Kunstnere`, `Kunstværker`, `Om os`, `Sælg kunst`) currently point to in-page anchors (`#kunstnere`, etc.) rather than separate pages — those pages don't exist yet. When adding them, follow the existing multi-page convention referenced in nav (`kunstnere.html`, `kunstvaerker.html`, `om-os.html`, `saelg-kunst.html`, `kurv.html`) and update `index.html`'s links from anchors to real file hrefs.
- `assets/css/style.css` — all styling, structured as CSS custom properties (design tokens) declared once on `:root` and re-declared under `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]` for light/dark theme support. Components reference tokens (`--paper`, `--ink`, `--muted`, `--pigment`, `--line`, etc.) rather than literal colors — keep new styles consistent with that pattern.
- `assets/js/main.js` — a single self-invoking function wiring up: header scroll state, mobile hamburger nav, search overlay open/close, a demo newsletter form (`[data-demo-form]`, intercepts submit and shows a static confirmation message — no real backend), and scroll-reveal (`.fade-in` elements observed via `IntersectionObserver`, falls back to showing everything immediately if unsupported).

## Design system

- Fonts (loaded from Google Fonts in `index.html`'s `<head>`): **Oswald** for nav/labels/uppercase UI text, **Fraunces** for headings and artist/artwork names, **IBM Plex Mono** for prices, catalog numbers, and other data-like text.
- `.plate` is the placeholder-artwork convention used everywhere a real photo isn't available yet: a textured panel with corner "registration marks" (CSS custom property `--reg`, an inline SVG cross) and centered artist initials (`.plate-initials`). Replace a `.plate` with a real `<img>` once actual artwork/artist photography exists — don't leave the placeholder in production content.
- Nav links carry a `data-index` attribute (e.g. `data-index="01"`) rendered via `::before { content: attr(data-index) }` on hover — this encodes the section's real position in the page, so keep it in sync with actual section order.
