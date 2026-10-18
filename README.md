# Ironworks — Figma-aligned static site

A single-page HTML/CSS/JS prototype for a strength and conditioning gym. The
hero now uses the photograph embedded in the supplied Gym Design Figma copy.
Open `index.html` in a browser, or run a local static server from this folder.
See `AUDIT.md` for the Figma comparison, module mapping, priorities, and tests.
Read `LEARNING_GUIDE_UK.md` for a Ukrainian explanation of all eight modules
and a file-by-file walkthrough of the code.

## Prototype status

This is a visual prototype. Contact submission is temporarily disabled until a form service is connected. HTML field constraints remain in place.
Connect an approved form receiver before using it for real bookings. The
address, phone, prices, schedule, coaches, testimonials, and social destinations
still need owner verification. The separately supplied MP4 is used in the Training section with a poster, a CSS-only Hide video background checkbox, and a reduced-motion visual fallback. CSS hides the video but does not pause playback or prevent downloading.

## Files

```
web-course/
├── index.html      semantic markup for all 9 sections
├── css/fonts.css   local Anton and Inter font declarations
├── fonts/          WOFF2 fonts and SIL OFL licenses
├── img/*.png       supplied dumbbell and social icons
├── MAIN_JS_SIMPLE_UK.md current minimal JS and HTML/CSS video explanation
├── CSS_REFACTOR_UK.md palette usage, responsive simplification, code review
├── CHANGELOG_UK.md latest mobile layout changes and testing
├── css/style.css   tokens, base styles, components, sections, media queries
├── js/main.js      minimal mobile menu toggle and close-after-link behavior
├── video/training.mp4 supplied 27-second, 640×360 background clip
├── img/training-poster.jpg still frame extracted from the video
├── img/gym-floor.jpg  photograph extracted from the supplied Figma copy
├── img/favicon.svg    lightweight browser icon
├── AUDIT.md        gap analysis, plan, and verification
├── LEARNING_GUIDE_UK.md  module-by-module teaching guide
├── .gitignore      excludes generated system/editor files
└── README.md       this file
```

## Design tokens

Recreate these as Figma **local variables** first, then style everything
from them — same principle as the CSS custom properties below.

### Color

Five base colors: ink `#14140F`, paper `#F1EEE6`, paper-soft `#E7E2D6`, red `#AE1F1F`, muted `#625F55`. Borders/overlays use alpha variants of these colors. Button text on red has approximately 6.01:1 contrast. See `CSS_REFACTOR_UK.md` for the complete before/after usage analysis.

### Type

Two families, per the "one or two, clearly distinct" rule:

- **Display** — `Anton` (condensed, bold, uppercase-friendly). Headings only.
- **Body** — `Inter`, weights 400/500/600/700/800.

| Style | Size (desktop) | Size (≤480px) | Line-height |
|---|---|---|---|
| H1 / hero | 88px | 34px | 0.95 |
| H2 / section | 48px | 26px | 1.05 |
| H3 / card title | 24px | 20px | 1.25 |
| Body | 17px | 16px | 1.6 |
| Small / labels | 14px | 13px | 1.4 |

### Spacing (8px base rhythm)

`8 · 16 · 24 · 32 · 48 · 64 · 96 · 128` — named `--sp-1` through `--sp-8` in
the CSS. In Figma, set these as spacing variables and use them for every
padding/gap value; don't hand-type a number that isn't on this list.

### Radius & shadow

- `--r-sm: 4px` (icons, inputs) · `--r-md: 8px` (cards) · `--r-pill: 999px` (buttons, badges)
- One shadow, used once: `--shadow-lift` on the featured pricing card only —
  restraint per the brief; not every card gets a shadow.

## Layout

- Container: max-width **1200px**, centered, side padding 24px (desktop) /
  fluid padding from 16px to 24px via clamp().
- Card rows use wrapping **Flexbox** with a 24px gap. Programs and Coaches
  are 4-up; Reviews are 3-up. All become 1-up at ≤900px. The Figma frame can still use a 12-column reference grid.
- Breakpoints: **900px** (one layout breakpoint) (mobile floor 320px).

## Class → Figma layer naming

Classes follow **block / block\_\_element / block--modifier** (BEM). Use the
same names as Figma layer/frame names so the two stay traceable:

- `header`, `hero`, `programs`, `schedule`, `coaches`, `pricing`, `reviews`,
  `contact`, `footer` → top-level **frames**, one per section.
- `program-card`, `coach-card`, `plan`, `review-card` → **components**, with
  the modifier (`plan--featured`) as a component **variant**, not a
  separate layer tree.
- `btn`, `btn--primary`, `btn--accent`, `btn--ghost` → one button
  **component** with a "style" variant property.
- Never name a Figma layer `Frame 12` or `Rectangle 4` — match the CSS class.

## Recreating this in Figma

1. **Frames**: `Desktop — 1200` and `Mobile — 375`, per the course pattern —
   don't just scale the desktop frame down.
2. **Variables**: enter the color, spacing, and radius tokens above as
   Figma variables before placing any shapes.
3. **Text styles**: create 5 text styles matching the type scale table —
   H1, H2, H3, Body, Small.
4. **Components**: build `Button`, `Card` (with a "surface" variant for
   light/dark), and `Plan Card` (with a "featured" variant) as components
   before laying out sections, then instance them everywhere.
5. **Icons**: all icons in this prototype are inline SVG (barbell mark,
   program icons, social icons). Export each as a 24×24 SVG and import as
   Figma vector components — don't recreate them as PNG raster.
6. **Auto layout**: every card grid and the header/nav should use Figma
   auto layout with "wrap" enabled, so resizing the frame previews the
   responsive reflow described above.

## Accessibility notes carried into the design

- Visible focus ring (`--color-red`, 3px, 3px offset) on every interactive
  element — keep this as a documented focus style in Figma, not an
  afterthought.
- Color contrast checked at AA for body text and button labels.
- The mobile menu button and social icons are icon-only; each has a
  matching `aria-label` in code — annotate the same intent on the Figma
  component so it isn't lost in handoff.
- The schedule table uses real `<table>` markup with `scope` and a
  `caption`, and scrolls horizontally on narrow screens rather than
  reflowing into an unreadable stack.

## Current mobile design

See `CHANGELOG_UK.md`. The supplied PNG logos/icons are used directly. Mobile navigation and footer are centered; contact fields fill the container; pricing keeps the desktop order. Fonts are local, with no Google Fonts network dependency.

## Training video

The independent section follows Programs. HTML plays the supplied MP4 muted, inline, and in a loop. A keyboard-accessible checkbox hides the moving background through CSS and reveals the poster. Reduced-motion CSS also hides video. There is no script controlling video loading or pausing; hidden media may continue playback/downloading. The source is SD, so large-screen softness is expected.
