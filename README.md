# Ironworks — Figma-aligned static site

A single-page HTML/CSS/JS prototype for a strength and conditioning gym. The
hero now uses the photograph embedded in the supplied Gym Design Figma copy.
Open `index.html` in a browser, or run a local static server from this folder.
See `AUDIT.md` for the Figma comparison, module mapping, priorities, and tests.

## Prototype status

This is a visual prototype. The contact form uses native browser validation
and displays a clear demo notice instead of sending personal information.
Connect an approved form receiver before using it for real bookings. The
address, phone, prices, schedule, coaches, testimonials, and social destinations
still need owner verification. No background video was supplied in the Figma
file, and this project has no video section yet.

## Files

```
ironworks/
├── index.html      semantic markup for all 9 sections
├── css/style.css   tokens, base styles, components, sections, media queries
├── js/main.js      mobile nav and demo-form feedback
├── img/gym-floor.jpg  photograph extracted from the supplied Figma copy
├── img/favicon.svg    lightweight browser icon
├── AUDIT.md        gap analysis, plan, and verification
└── README.md       this file
```

## Design tokens

Recreate these as Figma **local variables** first, then style everything
from them — same principle as the CSS custom properties below.

### Color

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#14140F` | Headings, dark section backgrounds |
| `--color-ink-soft` | `#2A2A22` | Raised panels on dark sections |
| `--color-paper` | `#F1EEE6` | Light section background, text on dark |
| `--color-paper-soft` | `#E7E2D6` | Card fill on light sections |
| `--color-concrete` | `#8B887D` | Secondary / muted text |
| `--color-red` | `#D62828` | Primary accent — CTAs, links, badges |
| `--color-red-dark` | `#AE1F1F` | Red hover state |
| `--color-olive` | `#565A3C` | Secondary accent (used sparingly) |
| `--color-line` | `rgba(20,20,15,.12)` | Hairline borders on light backgrounds |
| `--color-line-dark` | `rgba(241,238,230,.16)` | Hairline borders on dark backgrounds |

Contrast: body text (`--color-ink` on `--color-paper`) and all button labels
meet WCAG AA. `--color-red` is used at text size only on large/bold text or
as a solid button fill with light text — not for small body copy on paper.

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
  20px (≤1024px) / 16px (≤480px).
- Grid: **12 columns**, 24px gutter. Programs and Coaches cards span 3
  columns (4-up); Reviews cards span 4 columns (3-up). Both collapse to
  2-up at ≤1024px and 1-up at ≤768px — recreate as Figma auto-layout
  wrapping frames, not fixed columns, so it's obvious how they reflow.
- Breakpoints: **1024px**, **768px**, **480px** (mobile floor 320px).

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
