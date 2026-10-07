# Ironworks: Figma and modules 1–8 audit

Date: 7 October 2026. Source of truth: the supplied `Gym Design (1).fig`, the two Figma node links, and the eight [9 DOTS Academy modules](https://9.lviv.ua/academy/web-development/#modules). The README in this repository describes an earlier *Figma handoff* and is project documentation, not an instruction to change the task.

## Inventory

The supplied folder contains `.vscode/launch.json` (a Chrome launch configuration pointing to `localhost:8080`) and `ironworks/` with `index.html`, `css/style.css`, `js/main.js`, and `README.md`. There was no `.git`, package manifest, build script, test runner, image folder, or video folder. All logos and icons were inline SVG, and fonts came from Google Fonts. The delivered changes add `img/gym-floor.jpg` and this audit. The project remains plain HTML/CSS/JS with no build step.

`index.html` contains header/navigation, hero, programs, schedule table, coaches, pricing, reviews, contact form, and footer. Reusable components are the BEM-style `btn`, `program-card`, `coach-card`, `plan`, `review-card`, form fields, and menu toggle. `style.css` holds tokens, a 12-column grid, component styles, and media queries at 1024, 768, and 480 px. `main.js` handles the mobile menu and now the demo-form response.

The `.fig` archive contains one gym photograph in two resolutions plus duplicate render sizes of a dumbbell mark, close icon, Instagram icon, and play icon. It contains no video. The 1024 × 683 photograph was copied into `img/` without a new download.

## Gap analysis by view and component

| View / width | Component | Initial gap versus Figma | Result / remaining gap |
|---|---|---|---|
| Desktop, 1025–1920 px | Hero | Flat dark background and large barbell SVG instead of the gym photograph with overlaid copy. | Photo, gradient, top-left heading, and lower-right copy/CTA/stats implemented. Exact pixel measurements and image crop need final Figma Inspect review. |
| Desktop | Header | Navigation and logo content already aligned with the visible Figma frame. | Retained. |
| Desktop | Programs | Cards existed; SVG symbols differed from the visible S/C/M/O badges. | Badges now match the Figma treatment. |
| Desktop | Schedule, coaches, pricing, reviews, contact, footer | Section order, wording, and card structure broadly matched the Figma overview. Muted small text was weak on light and dark surfaces. | Preserved composition and strengthened muted-text contrast. Detailed spacing comparisons remain for Figma Inspect. |
| Tablet, 769–1024 px | Grids and hero | Two-column card rules existed, but the former side-by-side hero could crowd the heading. | Photo hero now uses a single overlay composition; grids remain two columns. |
| Mobile, 320–768 px | Header/menu | JS toggle existed with Escape/outside/link closing; resize back to desktop did not clear the open state. | Added resize reset. Keyboard and screen-reader behavior still needs physical-device review. |
| Mobile, 320–768 px | Hero | Old rule put the SVG *before* the title, unlike the photographic mobile layout. | Removed SVG and added mobile photo crop/gradient and stacked copy. Verify crop at 320, 375, and 768 px. |
| Mobile, 320–768 px | Cards, pricing, table, form | Single-column cards, highlighted pricing card, horizontal table scrolling, and stacked contact layout already existed. | Kept; table must be checked on a real phone. |
| All | Form/interactions | `novalidate` disabled native checks; `action="#"` had no receiver and could imply a successful request. Social links and phone were fake click targets. | Native required/email validation restored; visible demo notice and submit status added; fake links removed. A real receiver and final contact data are still missing. |
| All | Media/animation | No video/poster section; only hover and menu transitions, no keyframe. | Added a restrained hero entrance that respects reduced-motion. Video awaits an approved asset. |

The Figma editor was visible but did not expose Inspect values without signing in. The comparison above uses its rendered desktop and mobile views, the archive thumbnail, and embedded assets; it is a visual/structural comparison, not a claim of pixel-perfect equality.

## Module-to-file mapping

| Module | Requirement from course | File/task | Status |
|---|---|---|---|
| [1 · Figma](https://9.lviv.ua/academy/web-development/figma-design/) | Desktop and mobile frames, content, typography, imagery | `.fig`, `index.html`, `css/style.css`, `img/gym-floor.jpg` | Frames supplied; photo integrated. Final dimensions need Inspect review. |
| [2 · HTML/CSS/Flexbox](https://9.lviv.ua/academy/web-development/html-css-flexbox/) | Semantic layout, reusable classes, manual markup | `index.html`, `css/style.css` | Implemented; BEM-style names used. |
| [3 · Responsive menu](https://9.lviv.ua/academy/web-development/responsive-burger-menu/) | 320–1920 px, collapsed menu, no page overflow | `css/style.css`, `js/main.js` | Implemented in code; mobile visual/device check pending. JS menu provides `aria-expanded` and Escape behavior. |
| [4 · Images/video](https://9.lviv.ua/academy/web-development/images-video/) | Responsive image and background video with poster/overlay | `img/gym-floor.jpg`, hero CSS; future `video/` | Image/overlay implemented; video and poster absent from supplied design/assets. |
| [5 · Forms/tables](https://9.lviv.ua/academy/web-development/forms-tables/) | Labeled validated form and readable data table | Contact and schedule in `index.html`; `main.js` | Markup, validation, table implemented; real submission service missing. |
| [6 · UI components](https://9.lviv.ua/academy/web-development/ui-components/) | Buttons, cards, three price plans, interactive states | `index.html`, `css/style.css` | Implemented. |
| [7 · Animation](https://9.lviv.ua/academy/web-development/css-animation/) | Transitions, transforms, keyframes, reduced-motion respect | `css/style.css` | Menu/button/card transitions and restrained hero keyframe implemented. If the course requires three separate keyframe effects, two remain. |
| [8 · Git/Pages](https://9.lviv.ua/academy/web-development/git-github-pages/) | Version history, README, public deployment | Git history, `README.md` | Local Git commit created; no remote or GitHub Pages configured. |

## Prioritized implementation plan

Estimates are focused developer hours. Completed items were executed in this pass; open items require content, access, or device verification.

| Priority | Task and files | Hours | State | Risk |
|---|---|---:|---|---|
| P0 | Replace hero illustration with supplied image; restructure copy; adjust desktop/tablet/mobile CSS (`index.html`, `style.css`, `img/`). | 2–3 | Done | Source photo is 1024 px wide and may soften on very large screens. |
| P0 | Restore native form validation and make demo behavior explicit (`index.html`, `main.js`). | 0.5–1 | Done | Real bookings require a receiver and privacy/anti-spam decision. |
| P1 | Match program badges, muted text, anchor offsets, responsive menu reset (`index.html`, `style.css`, `main.js`). | 1–2 | Done | Exact visual measurements still need Inspect access. |
| P1 | Review at 320/375/768/1024/1440/1920 px and test keyboard, overflow, and Safari/Firefox. | 2–3 | Open | Headless Chrome/Edge failed on this machine; a real phone is recommended. |
| P1 | Confirm business copy, prices, schedule, testimonials, address, phone, and social URLs, then wire a form service. | 2–4 | Open | Current content is prototype copy and must not be published as verified business data. |
| P2 | Add a Figma-approved short video, poster, `autoplay muted loop playsinline`, overlay, compression, and reduced-data/reduced-motion fallback (`index.html`, `style.css`, `video/`). | 2–4 | Open | No video or poster was supplied; adding stock footage would depart from the design. |
| P2 | Complete a measured Figma Inspect pass and tune spacing, type, and image crop across breakpoints. | 2–4 | Open | Editor view without Inspect data limits pixel accuracy. |
| P2 | Add two further purposeful animations if strict module-7 rubric requires three separate effects. | 0.5–1 | Open | Excess motion could reduce usability. |
| P2 | Configure GitHub remote and Pages after repository destination is chosen. | 0.5–1 | Open | Publishing is external and needs the target account/repository. |

## Standards, changelog, and verification

Semantic landmarks, headings, `article`, labeled form controls, table `caption`/`scope`, `aria-expanded`, live status, visible focus, and reduced-motion support are retained. BEM-style class names are consistent. No framework or build dependency was introduced. The image is a single local JPEG from the supplied Figma file; fonts are the only external runtime request. CSS uses broadly supported layout features and offers system-font fallbacks.

Changes: photo-backed hero and responsive overlay; Figma-like program badges; higher-contrast secondary text; native form validation and truthful demo feedback; removal of placeholder clickable phone/social destinations; menu resize reset; subtle motion; updated README.

Verified in local browser at desktop width 1280 px: photo loads, visible hero composition aligns with the rendered Figma desktop frame, and there is no document-level horizontal overflow. Empty form submit focuses the required Name field; valid test values show the demo status without a network submission. Remaining: mobile/tablet visual screenshots, keyboard navigation on a phone, Firefox/Safari, and production form delivery.

### Manual testing instructions

1. Open `index.html` or run `python -m http.server 8080` from `ironworks/`; visit `http://localhost:8080/`.
2. In DevTools, check widths 320, 375, 768, 1024, 1440, and 1920 px. Confirm no horizontal page scroll, legible hero copy, one/two/four-column card layouts, and scrollable schedule table.
3. At 375 px, tab to the menu button; activate it with Space, tab through links, close with Escape, then resize above 768 px and confirm the mobile menu state clears.
4. Submit the empty form and an invalid email; browser validation should stop submission. Enter a valid name/email; the page should state that the request was not sent.
5. Test reduced-motion preference and inspect focus rings, text contrast, and network failures in Chrome, Firefox, and Safari where available.
