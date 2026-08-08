# eric.brah.ms — redesign notes

## Assumption stated up front (running unattended)

No human was available to pick a visual direction before delivery, so I derived one from the
brief and the existing content rather than guessing silently: **Eric is an aerospace-engineer-
turned-XR-technical-lead** whose work is precision measurement, robotics, and spec-driven
engineering (SAVV, HIL, calibration benchmarks). The old site was a generic dark-mode SaaS
portfolio — cyan/indigo gradient text, glassy rounded cards, glowing blobs, emoji section icons —
the exact "AI slop" pattern the design brief calls out to avoid, and not distinctive to Eric's
actual background.

**New direction: "Technical / Editorial."** A light, paper-toned page that reads like an
engineering spec sheet crossed with a design journal — hairline rules, ruler tick-marks,
crosshair registration marks on the photo, numbered highlight items instead of checkmarks/emoji,
a serif display face for authority paired with monospace for data/labels. One accent color
(amber) for emphasis, one secondary (blue) for links/tags — same chroma family, different hue,
per the palette rule. If this direction doesn't land, say so and I'll swing to a different one
(e.g. a darker "flight-log" variant) rather than iterating blindly on this one.

## Why this instead of the old dark/cyan theme

- The old palette (cyan/indigo/purple gradient text, glowing card shadows, glassmorphism) is a
  extremely common AI-generated-portfolio look — it doesn't differentiate Eric or reference
  anything about optics, robotics, or aerospace.
- Every stat, skill, and timeline entry was in a rounded glass card with a colored glow — high
  visual noise, low information hierarchy.
- Emoji as section icons (💻🏗️🤖👁️🎓🚀📊⚡🎢) read as unpolished for a technical-leadership resume.

## What the new system leans on instead

- **Type**: Newsreader (serif, editorial authority) for headings + italic pull-quote treatment;
  IBM Plex Sans for body; IBM Plex Mono for all labels, dates, tags, nav — ties directly to
  Eric's engineering/telemetry background without resorting to a literal "terminal" cliché.
  (Deliberately not Inter/Roboto/Arial/Fraunces — flagged as overused in the design brief.)
- **Color**: warm paper background, near-black ink text, one amber accent (CTAs, emphasis,
  section markers), one blue accent (links, tags) — same chroma/lightness family, different hue.
- **Motif**: crosshair corner marks on the one real photograph, ruler-tick dividers between
  section headers and content, numbered index badges (01/02/03) instead of icons or checkmarks,
  section progress counters ("01 / 06"). This is restrained — one motif, applied consistently,
  not decoration for its own sake.
- **No gradients, no drop-shadow glow, no glassmorphism, no rounded pill buttons.** Buttons and
  panels are sharp/near-sharp rectangles with 1px hairline or filled-ink borders.

## Mockup

`Homepage.dc.html` (mirrored here, live version in the Claude Design project) is the full single-
page layout: nav, hero, Magic Leap feature, Theme Park Predictor showcase, experience timeline,
skills matrix, education, footer — all existing copy carried over verbatim.

See `HANDOFF.md` for the file-by-file implementation spec.

## Known gaps in the mockup (call these out to the implementer)

1. **Mobile nav** — the mockup hides the nav links below 720px width but doesn't wire up a
   working hamburger menu (the current CSS-only mockup has no toggle interaction). The existing
   `src/main.js` hamburger logic can be reused; give it new classes.
2. **Theme Park Predictor screenshot** — the showcase uses a labeled striped placeholder
   ("PRODUCT SCREENSHOT — REPLACE WITH LIVE CAPTURE"). Drop in a real capture of parks.brah.ms.
3. **Dark mode** — the old site had a light/dark toggle; this redesign commits to one confident
   light theme and drops the toggle. Flagging this as a deliberate scope decision, not an
   oversight — say if dark mode should come back as a second pass.
4. **No automated visual verification** — this loom has no browser/screenshot tool available, so
   the render was not gate-checked by screenshot. The human should confirm the live preview looks
   right before an implementer starts wiring it into `src/`.
