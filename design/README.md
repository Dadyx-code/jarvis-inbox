# Design

Sprint 5c.0 + 5c.1 design package for the JARVIS Dashboard rebuild (the new shell that replaces the current `jarvis-inbox` PWA).

- **Status:** awaiting Dario review of `mockups/home.html` before Sprint 5c.2 (production shell rebuild)
- **Files:**
  - `design-system.md` — PRISM visual tokens (color, type, depth, components, status pill taxonomy). Drop-in `:root` block at the end.
  - `structure-spec.md` — GRID structural spec (nav, page templates, component anatomy, accessibility, ASCII wireframes for every page).
  - `inventory.md` — catalogue of every existing PWA surface (data sources, user actions, patterns to keep / discard). Input to PRISM+GRID briefs.
  - `mockups/home.html` — static review artifact. Open in any browser, resize across the 768px breakpoint to see both shells.
- **Last touched:** 2026-04-30

## Why this folder lives in jarvis-inbox (not dadyx-skills/memory/)

Memory in `~/dadyx-skills/memory/` is for reflections, rules, and references the agent uses across projects. Project artifacts (HTML mockups, app-specific specs, design systems for a particular app) live with the codebase they govern. This folder is single-source-of-truth for the dashboard rebuild and ships in the same repo as the production code.

## Pickup point

Sprint 5c handoff code: `5C-DESIGN-30` (in `work_sessions`). Next chat:
1. Open `mockups/home.html` in a browser, resize across 768px
2. If the design + responsive shell pass, sign off on Sprint 5c.2
3. 5c.2 implements `design-system.md` + `structure-spec.md` against `index.html`
