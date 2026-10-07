# ATI MEC Website — Design Mock

A working, responsive HTML/CSS/JS prototype of a redesigned ATI MEC site. It shows **layout, hierarchy, interactions and visual direction**. It is not production code for the CMS. Port the patterns into the ALPA platform's templates and components.

**No build step and no dependencies.** Serve the folder with any static server, for example `python3 -m http.server`, then open `http://localhost:8000`.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero video, quick actions, Contract 2026 tracker, communications and events, all-pilot calls, leadership, DART/app, volunteer CTA |
| `about.html` | About the MEC, common goal, values, officers, LEC reps |
| `contract-2026.html` | Negotiations hub: status timeline, executive summary, FAQs, document library, email sign-up |
| `communications.html` | Filterable, searchable feed (MEC Alert, Skypointer, Hotline, SPSC, calls) plus recordings |
| `resources.html` | Filterable, searchable resource cards with "login required" badges |
| `committees.html` | Committees grouped by area, expandable cards, deep links (`committees.html#hims`), volunteer CTA |

## Structure

```
css/styles.css   Design tokens (top of file) → components → pages
js/data.js       All content as structured arrays. Each one maps to a CMS collection.
js/site.js       Header/footer injection, mega menus, mobile drawer, ⌘K search,
                 hero video, filter/search lists, scroll reveals
assets/video/    Drop hero.webm + hero.mp4 here (not included)
```

The header and footer are injected by JS only so that the six mock pages stay in sync. In production they should be server-rendered CMS partials.

## Hero video

- Add `assets/video/hero.webm` and `assets/video/hero.mp4`. Use a 15–25 s seamless loop with no audio, 1920×1080, under 6 MB. Also add a poster frame (`poster="assets/img/hero-poster.jpg"` on the `<video>`).
- Until a video loads, an **animated CSS/SVG fallback** (dusk sky with a 767) is shown. The same fallback is used for `prefers-reduced-motion`.
- A visible **Pause** control is included. WCAG 2.2.2 requires one for auto-playing motion longer than 5 s.
- **Footage:** ATI- or ALPA-owned B767 footage is best (ramp ops at night, takeoff, cockpit). Confirm the licensing and image rights for anyone who appears in it.

## Design tokens

- **Colors:** Navy `#071633` / `#0b2148` / `#17428f`, ALPA red `#c8102e`, neutrals `#0c1a2e` / `#5d6d84` / `#dfe6f0`
- **Type:** Barlow Condensed 600/700 (display, uppercase) and Inter 400–700 (body), both from Google Fonts. If ALPA brand standards say otherwise, swap these for the brand fonts.
- **Radius** 8/14/22px · **Container** 1200px · **Breakpoints** 1180 (nav to drawer), 960, 600px

## Placeholders to replace before launch

Search the code for `tag-sample` and `sample: true`.

- [ ] **Logo:** the "ATI PILOTS | ALPA" text lockup stands in for the official ALPA/ATI MEC logo
- [ ] **Contract 2026 status** (`SITE.contract.current`), session counts, executive summary, FAQ answers
- [ ] **All communications, events and call recordings** in `data.js` are sample copy
- [ ] **The feed must be ATI-only.** The current site's "Recent Communications" shows ALPA-wide items (62,031 results, including Envoy and other councils' posts).
- [ ] **Committees** marked *Verify* (Security, Scheduling, Retirement & Insurance, Pilot Peer Support, Professional Standards, Jumpseat) weren't visible in the current dropdown. Confirm the full list, chairs and contacts with the MEC.
- [ ] **Leadership headshots** (initials are shown now) and **LEC representatives**
- [ ] **Every `href="#"`:** DART, DTS, Member Login (ALPA SSO), app store links, ALPA national links, policy manual, documents
- [ ] **Email sign-up form:** it's a mock and sends nothing. Wire it to ALPA's email platform.

## Accessibility notes

Skip link, landmark roles, `aria-current` on nav, keyboard-reachable mega menus (`:focus-within`), Esc closes overlays, visible focus rings, reduced-motion support, native `<details>` for accordions. Run an axe/WAVE pass after porting.
