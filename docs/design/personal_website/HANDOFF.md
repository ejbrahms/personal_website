# HANDOFF — eric.brah.ms redesign

Mockup: `docs/design/personal_website/Homepage.dc.html` (also live at the Claude Design project,
`Homepage.dc.html`). Full content spec below — copy is final, values are tokens to wire in.

## Files this touches in the repo

| File | Change |
|---|---|
| `index.html` | Replace Google Fonts `<link>`, restructure body markup per section table below, drop theme-toggle button (see Decisions) |
| `src/style.css` | Replace `:root` token block, rewrite component classes per table below |
| `src/main.js` | Remove theme-switcher block (lines 4–22); keep/rewire hamburger + scroll-highlight logic to new nav markup |
| `public/` | No change — resume PDF, favicon stay where they are |

## Design tokens — replace `:root` in `src/style.css`

| New token | Value | Replaces |
|---|---|---|
| `--paper` | `oklch(97.3% 0.012 85)` | `--bg-primary` |
| `--paper-raised` | `oklch(99.2% 0.006 85)` | `--bg-card` |
| `--ink` | `oklch(19% 0.02 265)` | `--text-primary` |
| `--ink-soft` | `oklch(40% 0.02 265)` | `--text-secondary` |
| `--ink-faint` | `oklch(58% 0.014 265)` | `--text-muted` |
| `--line` | `oklch(85% 0.012 85)` | `--border-color` |
| `--line-strong` | `oklch(70% 0.014 85)` | `--border-color-hover` |
| `--amber` | `oklch(63% 0.17 48)` | `--accent-cyan` (primary accent) |
| `--blue` | `oklch(58% 0.15 250)` | `--accent-indigo` (secondary accent / links) |
| `--serif` | `"Newsreader", Georgia, serif` | *(new — headings)* |
| `--sans` | `"IBM Plex Sans", system-ui, sans-serif` | `--font-sans` |
| `--mono` | `"IBM Plex Mono", ui-monospace, monospace` | `--font-mono` |

Drop entirely: `--accent-blue`, `--accent-purple`, `--bg-secondary`, `--bg-tertiary`,
`--bg-card-hover`, `--card-shadow`, `--glow-shadow`, the `[data-theme="light"]` override block,
`.bg-glow`, `.bg-glow-1/2`, `.bg-grid`, `.text-gradient`. This design has one theme, no glow, no
grid overlay, no gradient text.

**Google Fonts `<link>` in `index.html`** — replace the existing Inter/Plus Jakarta Sans/JetBrains
Mono request with:
```
https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap
```

## Section-by-section spec

Anchor IDs must stay in sync with `.nav-link` `href`s (the scroll-highlight JS in `main.js`
matches on exact id). Keep the **existing** ids (`#hero`/`#about`, `#featured`, `#side-projects`,
`#experience`, `#skills`, `#education`) rather than the mockup's `#project` — the mockup renamed
it for its own copy; don't propagate that rename into the real site.

1. **Nav** — sticky, blurred paper background, hairline bottom border. Logo: `EB` in a bordered
   26×26 box + "Eric Brahms" in Plex Sans 600. Links in Plex Mono, uppercase, tracked, amber
   underline on hover/active (replaces cyan). Two actions: outlined "Resume PDF" button, filled-
   ink "Contact" button (`mailto:eric@brah.ms`). Keep the existing hamburger + mobile slide-down,
   restyle to match (ink text, hairline border, no gradient).
2. **Hero** (`#hero`/`#about`) — very-faint dot-grid background (`radial-gradient`, 1px dots,
   26px spacing, `--line` color, no opacity trick needed beyond the color itself). Kicker line
   with a small amber square "status dot" (blinking, gated on `prefers-reduced-motion`) + the
   existing badge copy. Headline in Newsreader, ~4rem, with "AI workflows." set in amber italic.
   Same subhead copy. Same three CTAs. Stats become a **4-up ledger row** (hairline top border,
   vertical dividers between cells, no card backgrounds) — not the old glass stat-cards.
3. **Featured — Magic Leap** (`#featured`) — keep the real photo
   (`https://cdn.prod.website-files.com/.../hq-2025-einstein-robo-test-savv-...jpg`). Add amber
   crosshair marks at top-left/bottom-right corners of the image (two overlapping 1px lines,
   `::before`/`::after`, no SVG needed) and a bordered mono caption chip
   ("SAVV Robotic Test Fixture") bottom-left. Quote becomes the `h3` headline (serif, not
   italicized body copy). The three highlights get numbered badges (01/02/03, bordered squares)
   instead of the cyan checkmark circles. CTA becomes an underlined mono link with `↗`, not a
   filled button.
4. **Theme Park Predictor** (`#side-projects`) — subtle raised-panel background with hairline
   top/bottom border (same idea as old `.alt-bg`, just the new tone). Add a **browser-chrome
   placeholder frame** above the feature grid: a bordered box with a top bar showing
   `GET parks.brah.ms` in mono, and a diagonally-striped body with a centered label
   "PRODUCT SCREENSHOT — REPLACE WITH LIVE CAPTURE" — swap this for a real screenshot before
   ship. Three feature cards keep their copy, drop the emoji (📊⚡🎢) for numbered mono badges
   (01/02/03) in a hairline-divided 3-up grid (no per-card shadow/radius). Tech pills become
   bordered rectangles, no filled background.
5. **Experience** (`#experience`) — ledger-style rows, not glowing timeline dots: each entry is
   `[mono date range] | [company (serif) + role + team sub + bullets]` on a hairline top border,
   full-width. Bullet marker is a blue em-dash, not a cyan triangle. All four roles, same copy,
   unchanged.
6. **Skills** (`#skills`) — 4-panel grid, hairline-divided (panels share 1px lines via a
   `background:var(--line)` grid gutter trick — see mockup CSS), each with a mono index number
   (01–04) instead of an emoji, category title, hairline rule, then bordered mono tag chips. Same
   four categories/tags as today; primary tag (Python) gets an amber border instead of cyan fill.
7. **Education** (`#education`) — two panels with drafting-style corner brackets (two opposite
   corners only, via `::before`/`::after` L-shaped borders) instead of icon+card. Same copy.
8. **Footer** — ink-bordered top rule, name in serif, tagline, right-aligned mono link list, mono
   copyright line. Same links (email, Magic Leap article, Theme Park Predictor, Resume PDF).

## What must NOT change

- All resume content: role titles, dates, bullet copy, company names, degree names, schools,
  graduation dates — copied verbatim into the mockup, keep verbatim in the real markup.
- All outbound links: `mailto:eric@brah.ms`, `https://www.magicleap.com/display-integration`,
  `https://parks.brah.ms`, the resume PDF path (currently
  `/wispfield-files/EricBrahms_Resume_11JUL26_main (1).pdf` — mirror served the PDF at
  `public/EricBrahms_Resume.pdf`; use whichever is the real deployed path, not the mockup's `#`).
- Section anchor ids (see note above — don't adopt the mockup's `#project` rename).
- The real Magic Leap photo — don't replace it with a placeholder.

## How to tell it worked

- Page loads on warm white/paper background, near-black text — no dark background, no cyan/
  indigo/purple gradient text anywhere, no glow/blur box-shadows, no glassmorphism.
- Headlines render in a serif (Newsreader); nav/labels/dates/tags render in monospace (IBM Plex
  Mono); body copy in IBM Plex Sans.
- One amber accent used for emphasis/CTAs/section markers, one blue accent used for links/tags —
  no other accent colors present.
- The Magic Leap photo has visible amber crosshair marks at two corners.
- Highlight items, feature cards, and skill panels show numbered badges (01/02/03/04) — zero
  emoji anywhere on the page.
- Stats and experience entries read as hairline-divided ledger rows, not rounded glowing cards.
- Mobile (<720px): nav collapses behind a working hamburger toggle (needs wiring — see README
  gap #1); content stacks to one column; no horizontal scroll.
