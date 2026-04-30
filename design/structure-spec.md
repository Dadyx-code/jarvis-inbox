---
name: structure_jarvis_dashboard
type: reference-generic
description: >-
  GRID structural spec for the JARVIS Dashboard rebuild (Sprint 5c).
  Hamburger drawer mobile / horizontal pills desktop, capture-first Home,
  global FAB. Pairs with PRISM design tokens.
created_at: "2026-04-30T22:00:00+02:00"
location: ~/jarvis-inbox/design/structure-spec.md
purpose: >-
  Source-of-truth structural spec for Sprint 5c.2 shell rebuild. Every page
  template, component anatomy, a11y contract, interaction pattern lives here.
  Read before writing any HTML/CSS.
x-origin-session: 2aa64fb5-83bc-43ea-83e8-644c7050f976
---
## 0. Lane discipline

This doc is **structure / layout / responsive / accessibility / interaction only**. Where a visual token appears it is referenced as `var(--token-name)` and defined by PRISM. GRID does not pick colors, fonts, shadow values, or radius values. GRID picks: where things sit, how they move, how they collapse, and how a keyboard user navigates them.

**Icon library:** Heroicons (outline 24x24 stroke 1.5; solid 24x24 for active states). One library, no mixing. No emoji.

**Breakpoints:** 375 (mobile baseline) / 768 (mobile to desktop switch) / 1024 (comfortable desktop) / 1440 (max). The 768 line is the only behavioural break; 1024 and 1440 only widen content.

**Spacing:** 4pt grid. Tokens: `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (24px), `--space-6` (32px), `--space-7` (48px), `--space-8` (64px). PRISM owns the values; GRID references the names.

**Touch targets:** every interactive element >= 44x44pt hit area, even when the visible hitbox is smaller (use padding/`::before` overlay).

**Z-index scale (structural, GRID-owned):** `--z-base: 0`, `--z-sticky: 100` (top bar), `--z-fab: 200`, `--z-overlay: 900` (scrim), `--z-drawer: 950`, `--z-modal: 1000`, `--z-toast: 1100`.

---

## 1. Global shell anatomy

### 1.1 Mobile (<768px)

```
+-----------------------------------------------+
| [=]         JARVIS              [ ]           |  56px top bar, sticky, backdrop-blur
+-----------------------------------------------+
|                                               |
|             MAIN CONTENT                      |  scrolls
|             (page-specific)                   |
|                                               |
|                  [ + ]                        |  FAB, fixed bottom-center, hidden on Home
+-----------------------------------------------+
```

When drawer is open:

```
+--------------------------+------------------+
| JARVIS              [x]  |                  |
| --------------------     |   dark scrim     |
| HOME                     |   (tap to close) |
| --------------------     |                  |
| WORK                     |                  |
|   Tasks                  |                  |
|   Approvals      [3]     |                  |
|   Content                |                  |
| --------------------     |                  |
| PEOPLE                   |                  |
|   Team                   |                  |
|   Admin                  |  (owner only)    |
| --------------------     |                  |
| SETTINGS                 |                  |
| --------------------     |                  |
| [signed in as ...]       |                  |
| [Sign out]               |                  |
+--------------------------+------------------+
        80% of viewport          20%
```

**Top bar (mobile):**
- Height 56px, fixed top, full width
- Backdrop-filter: blur(12px); background `var(--surface-bar-translucent)`
- Border-bottom: 1px solid `var(--border-subtle)`
- Three slots, flex space-between:
  - Left: hamburger button (44x44, SVG bars-3 icon)
  - Center: JARVIS wordmark, tap = go Home
  - Right: reserved 44x44 slot (future: notifications). Empty placeholder for now to keep wordmark visually centered.
- Z-index: `--z-sticky`

**Drawer (mobile):**
- Slides in from left, width = 80% of viewport (max 320px)
- Background `var(--surface-elevated)`, full height, scrollable internally
- Scrim covers remaining 20%, `var(--scrim)`, fades in
- Close triggers: tap-outside on scrim, swipe-left gesture on drawer, Esc key, tap x button in drawer header
- Drawer header: 56px tall, JARVIS wordmark left, x close button right (44x44)
- Drawer body: section labels (HOME, WORK, PEOPLE, SETTINGS) as small uppercase headers, items below each
- Drawer footer (sticks to bottom of drawer): user email + Sign out button
- Animation: 200ms ease-out on open, 150ms ease-in on close
- Body scroll lock applied while open; restored on close
- When drawer is open: FAB hides (`opacity: 0; pointer-events: none`)

**Main content (mobile):**
- Padding: `var(--space-4)` horizontal, `var(--space-4)` top from below top bar (visual top of content = 56 + 16 = 72px from viewport top), `var(--space-7)` bottom (so FAB never overlaps last row)
- Max-width: 100% (no constraint at this BP)
- Scrolls within viewport; top bar stays sticky

**FAB (mobile):**
- Fixed, bottom-center horizontally, `bottom: max(20px, env(safe-area-inset-bottom) + 12px)`
- 56x56 visible (icon-only)
- Orange `var(--color-orange)` background, white "+" icon (SVG plus, 24x24, stroke 2)
- Drop shadow: `var(--shadow-fab)`
- Hidden on Home page (Home has the capture textarea inline)
- Hidden when drawer is open or any modal is open
- Tap -> opens capture overlay (see Section 3)
- Long-press: no-op (reserved future)

### 1.2 Desktop (>=768px)

```
+----------------------------------------------------------------------------+
| JARVIS    HOME  WORK v  PEOPLE v  SETTINGS                  [signed in v]  |  56px top bar, sticky
+----------------------------------------------------------------------------+
|                                                                            |
|                            MAIN CONTENT                                    |
|                          (max-width 1280px)                                |
|                                                                            |
|                                                          [ + ]             |  FAB, fixed bottom-right
+----------------------------------------------------------------------------+
```

**Top bar (desktop) -- Skladiste pattern:**
- Same 56px height, sticky, backdrop-blur, full-width container
- Inner container: `max-width: 1280px`, centered, `padding: 0 var(--space-5)`
- Three slots:
  - Left: JARVIS wordmark
  - Center-left: horizontal pills nav `<nav role="navigation" aria-label="primary">`
  - Right: signed-in user pill (email truncated) + dropdown arrow -> reveals account menu (Sign out, Settings shortcut)
- Pills:
  - HOME (single item)
  - WORK (parent pill; hover/click opens dropdown with Tasks, Approvals, Content)
  - PEOPLE (parent pill; dropdown with Team, Admin if owner)
  - SETTINGS (single item)
- Active pill: orange text + orange-tint background (`var(--color-orange)` / `var(--color-orange-tint)`)
- Hover pill: same as active but lighter
- Dropdown panel: appears below parent pill, 220px wide, 8px padding, items 36px tall each. Click-outside closes. Esc closes and returns focus to parent pill.
- Hamburger button is **not rendered** at >=768px

**Main content (desktop):**
- Max-width: 1280px, centered
- Padding: `var(--space-6)` horizontal, `var(--space-7)` top, `var(--space-8)` bottom
- Single column layout default; per-page templates can grid into 2-3 columns inside this container

**FAB (desktop):**
- Fixed, bottom-right: `right: max(24px, env(safe-area-inset-right) + 12px)`, `bottom: max(24px, env(safe-area-inset-bottom) + 12px)`
- Otherwise identical to mobile FAB
- Hidden on Home page, during modals

### 1.3 Auth gate (login screen)

Restyled but structurally unchanged from current PWA:
- Centered card, max-width 400px, vertically + horizontally centered in viewport
- JARVIS wordmark above the card
- Two-step form: email field -> submit -> 8-digit OTP field -> submit
- Status banner below form (`#loginSt`)
- No top bar, no nav, no FAB until authenticated
- Body has `class="locked"` until session bootstraps

---

## 2. Page templates

Every page below shows mobile (375px) ASCII first, then desktop (1024px+) notes.

### 2.1 Home (capture-first)

**Default page.** No FAB on Home (capture textarea is the FAB target inline).

**Mobile (375px):**
```
+-------------------------------------+
| [=]      JARVIS            [ ]      |
+-------------------------------------+
| What's on your mind?                |  H1 page title
|                                     |
| +---------------------------------+ |
| | Capture textarea                | |  pre-focused on load
| | (autogrows, min 4 lines)        | |  min-height: 96px
| +---------------------------------+ |
|                                     |
| [Idea] [Task] [Decision] [Note]     |  category chips, single-select
|                                     |
| Priority: [Low][Normal][High][Urg]  |  pill row, single-select
|                                     |
| Project: [select v]   Co: [v]       |  two compact selects, side-by-side
|                                     |
|        [    Send to Jarvis    ]     |  primary button, full width, 48 tall
|                                     |
| ----------------------------------- |
|                                     |
| Recent captures                     |  H2
| +---------------------------------+ |
| | list rows, last 5 by self       | |
| +---------------------------------+ |
|                                     |
| Today's briefing                    |  H2
| +---------------------------------+ |
| | briefing card                   | |
| +---------------------------------+ |
+-------------------------------------+
```

**Desktop (1024px+):**
- Capture column: max-width 720px inside centered main
- Recent captures + briefing: side-by-side in a 2-col grid below capture (gap `var(--space-5)`)
- Capture textarea is wider but caps at 720px (long-line readability)

**Behavior:**
- Textarea autofocus on page load
- Cmd/Ctrl+Enter submits
- Default category = Idea, default priority = Normal, project + company = last-used (localStorage)
- After submit: textarea clears, status banner shows "Captured", chips reset to defaults, recent list refetches
- Recent list polls every 60s while page visible (Page Visibility API)

### 2.2 Tasks

**Mobile (375px):**
```
+-------------------------------------+
| [=]      JARVIS            [ ]      |
+-------------------------------------+
| Tasks  - 12 active                  |  H1 + count meta
|                                     |
| [Active] [Completed]                |  segmented filter, 44pt tall
|                                     |
| +---------------------------------+ |
| | [ ] Task title                  | |  list row, 56pt min
| |     meta: deadline - company    | |
| +---------------------------------+ |
| | [ ] Task title                  | |
| +---------------------------------+ |
| | ...                             | |
| +---------------------------------+ |
|                                     |
|                              [ + ]  |  FAB
+-------------------------------------+
```

**Desktop (1024px+):** same single column inside max-width 1280, list rows breathe more (padding `var(--space-4)` instead of `var(--space-3)`).

**Behavior:**
- FAB tap -> capture overlay pre-set to category=Task
- Checkbox toggle = optimistic UI + PATCH; failure rolls back + shows error banner
- Tap row body -> open task detail modal (full edit)
- Empty state: see Section 8

### 2.3 Approvals

**Mobile:**
```
+-------------------------------------+
| [=]      JARVIS            [ ]      |
+-------------------------------------+
| Approvals  [3]                      |  count badge orange if >0
|                                     |
| +---------------------------------+ |
| | Title                  [URGENT] | |  status pill, top-right
| | Description preview...           | |
| | from agent - 2h ago              | |
| | [Reject]      [Approve]          | |  two buttons, side-by-side, 44pt
| +---------------------------------+ |
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
|                              [ + ]  |
+-------------------------------------+
```

**Desktop (1024px+):** same single column. Cards full width of 1280 max.

**Behavior:**
- Approve = primary button (orange), Reject = secondary (outlined)
- Both require confirm modal (destructive class -- see Section 7)
- After action: card animates out (200ms slide-up + fade), list re-counts
- Nav badge `[3]` lives on WORK pill (desktop) and on Approvals drawer item (mobile)

### 2.4 Content

**Mobile:**
```
+-------------------------------------+
| Content                             |
|                                     |
| Status: [All v]  Topic: [All v]     |  two filter selects
|                                     |
| +---------------------------------+ |
| | Post title                       | |  list row, 64pt tall
| | status pill - topic - date       | |
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
|                              [ + ]  |
+-------------------------------------+
```

**Desktop (1024px+):** filters move to a horizontal toolbar (`var(--space-4)` gap). Cards keep single-column for now (richer card design is a 5c.3 PRISM call).

### 2.5 Team

**Mobile:**
```
+-------------------------------------+
| Team                                |
|                                     |
| Humans                              |  H2
| +---------------------------------+ |
| | avatar | Name                    | |
| |        | role - last active      | |
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
| Agents                              |  H2
| +---------------------------------+ |
| | Agent name + status pill         | |
| | trigger - skill - last run       | |
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
| Recent learnings                    |  H2
| +---------------------------------+ |
| | skill - context - time           | |
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
|                              [ + ]  |
+-------------------------------------+
```

**Desktop (>=1024px):** three sections become a 3-column grid (Humans | Agents | Learnings). At 768-1023px, fall back to mobile single column. No info-density change at desktop, just side-by-side layout.

**Note:** Sign-out moves OUT of Team into the drawer footer (mobile) and the user pill dropdown (desktop). This is a Sprint 5c IA win -- Team becomes a clean people-view, not a half-settings page.

### 2.6 Admin (owner-only)

JS gate identical to current pattern (`s.email === 'dario.drmac@gmail.com'`). If not owner, drawer item + desktop nav item are not rendered AND direct navigation falls through to an auth-error empty state (server-side RPC enforces real authorization).

**Mobile:**
```
+-------------------------------------+
| Admin                               |
|                                     |
| [+ Invite user]                     |  primary button, full width, 48 tall
|                                     |
| Users                               |  H2
| +---------------------------------+ |
| | Name + email                     | |
| | status pill - companies          | |
| | [... menu]                       | |  per-row action button
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
| Activity log                        |  H2
| +---------------------------------+ |
| | actor - action - target - time   | |  dense rows, 48pt tall
| +---------------------------------+ |
| | ...                              | |
| +---------------------------------+ |
|                                     |
|                              [ + ]  |
+-------------------------------------+
```

**Desktop (>=1024px):** stay stacked (single col). Activity log scales fast; full width helps. A 60/40 split is feasible later but not the 5c.2 baseline.

**Per-row menu:** tap [...] opens an action sheet (mobile) / popover (desktop) with: Cancel invite / Disable / Re-enable / Edit companies. Destructive items get the destructive-class style and require confirm modal.

### 2.7 Settings

**Mobile:**
```
+-------------------------------------+
| Settings                            |
|                                     |
| Account                             |  H2
| +---------------------------------+ |
| | Email          dario@...         | |  read-only row
| +---------------------------------+ |
| | Display name   [ editable ]      | |
| +---------------------------------+ |
| | Default company  [select v]      | |
| +---------------------------------+ |
|                                     |
| Notifications  (placeholder)        |
| Integrations   (placeholder)        |
|                                     |
| +---------------------------------+ |
| | [ Sign out ]                     | |  destructive button, outlined red
| +---------------------------------+ |
|                                     |
|                              [ + ]  |
+-------------------------------------+
```

**Desktop (>=1024px):** same layout, max-width 720px on the form column for readability.

---

## 3. Capture overlay (FAB-triggered)

### 3.1 Structure

Slides up from bottom (mobile) / fades in centered (desktop). Same DOM, different CSS at the 768 breakpoint.

**Mobile (375px):**
```
+-------------------------------------+
| ......... scrim ................... |  z-index: --z-overlay
+-------------------------------------+
| +---------------------------------+ |
| | --- (drag handle)                | |  iOS-style sheet handle
| | Capture                     [x]  | |  H2 + close button (44x44)
| | +-----------------------------+  | |
| | | Textarea, autofocused        | | |
| | +-----------------------------+  | |
| | [Idea] [Task] [Decision] [Note]  | |
| | Priority: [L][N][H][U]           | |
| | Project: [v]    Company: [v]     | |
| | [   Send   ]  [Cancel]           | |  primary + secondary, side-by-side
| +----------------------------------+ |
+-------------------------------------+
   bottom sheet, 90% viewport height max
```

**Desktop (>=768px):** centered modal, 560px wide, max-height 80vh, vertically centered. Same content. Slide-up animation replaced with fade + 8px upward translate (200ms).

### 3.2 Behavior

- Trigger: FAB tap on any non-Home page
- On open:
  - Body scroll lock
  - Focus moves to textarea
  - Defaults: category = Task if user came from Tasks page, Idea otherwise; priority = Normal; project/company = last-used
  - Pre-fill from `?capture=task` deep link supported
- Dismissal:
  - Tap x close button
  - Tap scrim outside sheet
  - Esc key
  - Swipe-down on drag handle (mobile)
  - After successful submit
- On submit:
  - Optimistic UI: sheet shows inline spinner on Send button
  - Success: sheet closes, page-level status banner shows "Captured" for 3s
  - Failure: sheet stays open, inline error below send button, retry available
- Focus restore: on close, focus returns to FAB (or originating element if FAB is not the trigger source)
- Modal stack (Section 7): capture overlay can stack ON TOP of a list page but NOT on top of another modal. If a confirm dialog is open, FAB is hidden -- no stacking.

---

## 4. Component anatomy

### 4.1 Nav drawer item (mobile)

```html
<a href="#tasks"
   class="drawer-item"
   role="menuitem"
   aria-current="page">
  <svg class="drawer-item-icon" aria-hidden="true">...</svg>
  <span class="drawer-item-label">Tasks</span>
  <span class="drawer-item-badge" aria-label="3 unread">3</span>
</a>
```

- Height: 48px min, padding-y `var(--space-3)`, padding-x `var(--space-5)`
- Icon: 24x24, left-aligned, `var(--space-3)` gap to label
- Label: body text size, `var(--font-body)`
- Badge (optional): right-aligned, orange dot or count pill, only shown when count > 0
- Active state: orange left border 3px, orange text, light orange tint background
- Section headers: 11px uppercase, letter-spacing 0.5px, `var(--text-muted)`, padding-top `var(--space-4)`, padding-bottom `var(--space-2)`, padding-x `var(--space-5)`

### 4.2 Page header

```html
<header class="page-header">
  <h1>Tasks</h1>
  <span class="page-header-meta">12 active</span>
  <div class="page-header-actions">
    <button class="btn-secondary">Filter</button>
  </div>
</header>
```

- H1: `var(--font-heading)`, type-scale 24 (mobile) / 32 (desktop)
- Meta: body text, `var(--text-muted)`, gap `var(--space-2)` from H1
- Actions: right-aligned on desktop, stacked below on mobile if > 1 action
- Margin-bottom: `var(--space-5)`

### 4.3 Status banner (per-page inline feedback)

Three states: `wait` | `ok` | `err`. Standard pattern preserved from current PWA.

```html
<div class="status" data-state="ok" role="status" aria-live="polite">
  <svg aria-hidden="true">...</svg>
  <span>Captured</span>
</div>
```

- Padding `var(--space-3) var(--space-4)`
- Border-radius `var(--radius-md)`
- Icon left, text right, gap `var(--space-2)`
- `wait` uses orange tint, `ok` uses green tint, `err` uses red tint
- Auto-dismiss after 3s for `ok`, manual-dismiss for `err` (x button)
- `aria-live="polite"` for `ok`/`wait`, `aria-live="assertive"` for `err`

### 4.4 Modal

Two flavors: standard modal (forms, details) and confirm dialog (destructive actions).

```html
<div class="modal-scrim" role="presentation"></div>
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <header class="modal-header">
    <h2 id="modal-title">Title</h2>
    <button class="modal-close" aria-label="Close">x</button>
  </header>
  <div class="modal-body">...</div>
  <footer class="modal-footer">
    <button class="btn-secondary">Cancel</button>
    <button class="btn-primary">Save</button>
  </footer>
</div>
```

- Mobile: full-width minus `var(--space-4)` margin, max-height 90vh, scroll inside body if content exceeds
- Desktop: 480px wide (standard), 400px wide (confirm), centered, max-height 80vh
- Scrim: `var(--scrim)`, fades in 150ms
- Modal: fades + translates 8px up, 200ms ease-out
- Close triggers: x button, scrim tap, Esc key
- Focus trap: tab cycles within modal only
- Focus enters: first interactive element OR title if no interactive
- Focus restore on close: returns to triggering element
- Z-index `--z-modal`, scrim `--z-overlay`

**Confirm dialog destructive variant:** primary button uses `var(--color-danger)` background, requires explicit Confirm word match for high-stakes (Sign out is single-tap; account deletion would be word-match). Standard delete = single confirm tap.

### 4.5 List row

```html
<button class="list-row" type="button">
  <input type="checkbox" class="list-row-check" aria-label="Mark done">
  <div class="list-row-body">
    <div class="list-row-title">Title</div>
    <div class="list-row-meta">deadline - company</div>
  </div>
  <span class="list-row-badge">URGENT</span>
  <svg class="list-row-chevron" aria-hidden="true">&gt;</svg>
</button>
```

- Min-height 56pt mobile / 56pt desktop
- Padding-x `var(--space-4)`, padding-y `var(--space-3)`
- Checkbox column (optional): 32px wide hit area inside row
- Body: flex-grow, title in body-text size, meta in small-text + `var(--text-muted)`
- Badge (optional): right-aligned, status-pill style
- Chevron (optional): right-most, indicates row opens detail
- Hover state: `var(--surface-hover)` background
- Active/focus state: 2px orange focus ring, inset
- Border-bottom: 1px solid `var(--border-subtle)` between rows; last row no border

### 4.6 Card

Container for grouped content (briefing card, KPI card, etc.). Distinct from list row -- cards are blocks, rows are lines.

```html
<article class="card">
  <header class="card-header">
    <h3>Title</h3>
    <button class="card-action">action</button>
  </header>
  <div class="card-body">...</div>
</article>
```

- Padding `var(--space-5)`
- Border-radius `var(--radius-lg)`
- Box-shadow `var(--shadow-card)`
- Background `var(--surface-card)`
- Header: flex space-between, h3 left, action right, margin-bottom `var(--space-4)`
- Cards stack with `var(--space-4)` gap (mobile) / grid-gap `var(--space-5)` (desktop multi-col)

### 4.7 FAB

```html
<button class="fab" type="button" aria-label="Capture new item">
  <svg aria-hidden="true">+</svg>
</button>
```

- 56x56 visible (icon-only)
- Position: see Section 1
- Border-radius: 50% (`--radius-full`)
- Background `var(--color-orange)`, hover `var(--color-orange-hover)`
- Box-shadow `var(--shadow-fab)`
- Focus ring: 3px white inner + 2px orange outer, offset
- Hide rules: `.fab[hidden]` when on Home, drawer open, or modal open
- Animation on press: scale(0.96) 80ms

### 4.8 Capture textarea container

```html
<div class="capture-container">
  <textarea class="capture-textarea"
            placeholder="What's on your mind?"
            aria-label="Capture content"
            rows="4"></textarea>
  <div class="capture-meta">
    <fieldset class="capture-chips" role="radiogroup" aria-label="Category">
      <button role="radio" aria-checked="true">Idea</button>
      <button role="radio" aria-checked="false">Task</button>
      <button role="radio" aria-checked="false">Decision</button>
      <button role="radio" aria-checked="false">Note</button>
    </fieldset>
    <fieldset class="capture-priority" role="radiogroup" aria-label="Priority">
      <button role="radio">Low</button>
      <button role="radio" aria-checked="true">Normal</button>
      <button role="radio">High</button>
      <button role="radio">Urgent</button>
    </fieldset>
    <div class="capture-selects">
      <label>Project <select>...</select></label>
      <label>Company <select>...</select></label>
    </div>
  </div>
  <button class="btn-primary capture-submit">Send to Jarvis</button>
</div>
```

- Textarea: type-scale 16 (prevents iOS zoom on focus), min-height 96px (4 lines), auto-grows to max 240px then scrolls
- Border: 1px solid `var(--border-input)`, 2px focus ring on `:focus-visible` only
- Padding `var(--space-4)`, border-radius `var(--radius-md)`
- Chips/pills: 36px tall (small) but with `::before` pseudo to expand hit area to 44pt vertically; padding-x `var(--space-3)`; selected = orange background + white text
- Selects: native `<select>` for both desktop and mobile (correct OS UX), styled to match surface
- Submit button: full-width on mobile, auto-width right-aligned on desktop, 48pt tall, primary style

### 4.9 Status pill

Used for badges (URGENT, PENDING, APPROVED, status_tag in admin user rows, etc.).

- Inline-flex, padding `2px var(--space-2)`, border-radius `var(--radius-full)`
- Type-scale 11 (uppercase, letter-spacing 0.4px)
- Tinted background + colored text (PRISM defines tint per semantic color)
- Variants: `--neutral`, `--info`, `--success`, `--warning`, `--danger`, `--brand` (orange)
- Optional leading dot (8px) for stronger color signal
- Pills must carry text -- no icon-only pills (color alone is insufficient signal)

---

## 5. Responsive behavior (the 768 line)

The single behavioural breakpoint. Every page has the same content; layout reshapes at 768.

| Surface | <768 | >=768 |
|---|---|---|
| Top bar | hamburger + wordmark + (placeholder) | wordmark + horizontal pills + user pill |
| Drawer | overlay 80% width, scrim, slide-in | does not exist |
| Pills nav | does not exist | inline in top bar |
| Main padding | `--space-4` horizontal | `--space-6` horizontal, max-width 1280, centered |
| FAB position | bottom-center | bottom-right |
| Home capture | full-width column | max-width 720, in centered main |
| Tasks/Approvals/Content | single col | single col (cards/rows breathe more) |
| Team | single col, sections stacked | 3-col grid (Humans / Agents / Learnings) at >=1024 |
| Admin | single col stacked | single col stacked (intentional -- log scales) |
| Settings | single col | single col, form max 720 |
| Capture overlay | bottom sheet, slide up | centered modal, 560 wide, fade+translate |
| Modal | full-width minus margin | 480 wide, centered |
| Type scale H1 | 24 | 32 |
| Type scale H2 | 18 | 24 |
| Card padding | `--space-5` | `--space-5` |
| Status banner | full-width | inline-flex, max-width content |

At 1024 and 1440 only horizontal max-width and inner gutter changes; no layout reshape beyond Team's 3-col grid kicking in.

---

## 6. Accessibility

### 6.1 Focus order

Linear top-to-bottom, left-to-right per page. Skip-link first, then top-bar interactives (hamburger or pills), then main content interactives, then FAB last.

### 6.2 Skip link

```html
<a href="#main" class="skip-link">Skip to main content</a>
```
- Visually hidden by default (`clip: rect(0 0 0 0)` pattern, NOT `display: none`)
- Visible on `:focus`, top-left, high-contrast pill
- Anchors to `<main id="main">`

### 6.3 Keyboard nav

- **Tab**: moves through interactive elements in DOM order
- **Shift+Tab**: reverse
- **Enter/Space**: activate buttons, toggle checkboxes
- **Esc**: closes top-most overlay (drawer -> capture sheet -> modal -> confirm dialog)
- **Arrow keys** in dropdown menus and radio groups (chips, priority): move selection
- **Cmd/Ctrl+Enter** in capture textarea: submit
- **/** or **Cmd+K** (desktop only, optional 5c.4+): focus capture textarea on Home

### 6.4 ARIA roles

- Top bar: `<header role="banner">`
- Nav: `<nav role="navigation" aria-label="primary">`
- Main: `<main id="main">`
- Drawer when open: `aria-hidden="false"`, hamburger `aria-expanded="true"`, drawer has `role="dialog" aria-modal="true" aria-label="Navigation"`
- Modal: `role="dialog" aria-modal="true" aria-labelledby="..."`
- Status banners: `role="status" aria-live="polite|assertive"`
- Status pills: include text content; add `aria-label` if pill is icon-only
- Active nav item: `aria-current="page"`
- Buttons that toggle: `aria-pressed="true|false"`
- Radio groups (chips, priority): `role="radiogroup"` parent, `role="radio" aria-checked` children
- Loading states: `aria-busy="true"` on the container; `role="status"` for spinner with sr-only "Loading..."
- Empty states: visible illustration `aria-hidden="true"`, descriptive heading carries the meaning

### 6.5 Contrast

- Body text on background: >= 4.5:1
- Large text (>=18pt or >=14pt bold): >= 3:1
- UI components (button borders, focus rings): >= 3:1 against adjacent
- Active orange on white background: PRISM must verify; if `#F58025` on white fails 4.5:1 for body it must only be used on bold/large text or with a darker companion text color

### 6.6 Reduced motion

`@media (prefers-reduced-motion: reduce)`:
- Drawer open/close: no slide, just fade
- Capture sheet: no slide, just fade
- FAB press: no scale
- Card/row hover: no transform

### 6.7 Touch targets

Hard rule: >= 44x44pt actual hit area. If visual is smaller (e.g., 36pt chip), pad with `::before { content:''; position:absolute; inset:-4px; }` or wrapper padding.

### 6.8 Form labels

Every input has a visible `<label>`. Placeholder is supplementary, not a substitute. Selects are wrapped: `<label>Project <select>...</select></label>`. Capture textarea uses visually-hidden label + visible placeholder + `aria-label`.

---

## 7. Interaction patterns

### 7.1 Drawer open/close

- **Open**: tap hamburger -> `aria-expanded="true"`, drawer slides in, scrim fades in, body scroll locked, focus moves to first drawer item (skipping x close).
- **Close**: any of (x tap, scrim tap, Esc, swipe-left, drawer item tap that navigates) -> reverse animation, focus returns to hamburger button.

### 7.2 FAB to capture overlay

- Tap FAB -> FAB hides (opacity 0, pointer-events none), capture overlay opens.
- On close: FAB reappears (matches hide animation reversed), focus returns to FAB.

### 7.3 Modal stack rules

- Only **one modal** open at a time. Opening a new modal must close the prior (or be blocked).
- Capture overlay counts as a modal. Confirm dialog counts as a modal.
- Drawer counts as a modal-equivalent (focus trap + body scroll lock).
- Acceptable stack: drawer -> drawer item navigates -> drawer closes BEFORE next page renders. NOT: drawer + capture sheet simultaneously.

### 7.4 Capture submit flow

1. User submits (button or Cmd/Ctrl+Enter)
2. Submit button enters loading state (`aria-busy=true`, spinner replaces label, button disabled)
3. POST to `inbox` table
4. **Success**: sheet closes (200ms), page-level status banner shows "Captured" for 3s with `aria-live=polite`, recent list (Home only) refetches.
5. **Failure**: sheet stays open, button returns to normal, inline error message below button with `aria-live=assertive`, retry available. Network failure shows retry button; validation failure shows field-specific messages.
6. Focus restore on success: returns to FAB on non-Home pages; on Home, returns to textarea (cleared, ready for next).

### 7.5 Destructive confirmation

Sign out, disable user, cancel invite, delete task -- all require confirm modal.
- Confirm modal: title states action, body states consequence, primary button uses danger color.
- High-stakes (account deletion if added later): require typed match of word "DELETE" to enable button.

### 7.6 Optimistic UI

Checkbox toggles, single-row mutations: update UI first, fire request, on failure rollback + show error banner. Multi-step or destructive actions: wait for server confirmation, NO optimistic.

### 7.7 Polling and visibility

- Approvals badge polls every 30s while tab visible
- Recent captures (Home) refetches on successful capture + every 60s while visible
- All polling pauses on `visibilitychange` to hidden
- No background polling -- preserves battery + avoids stale-state surprises on resume

---

## 8. Empty / loading / error states

Every async surface ships all three. No exceptions.

### 8.1 Loading

```
+-------------------------------------+
|            [spinner]                |
|         Loading tasks...            |
+-------------------------------------+
```
- Centered in container, padding `var(--space-7)`
- Spinner: 32x32, orange ring, 0.8s linear infinite
- Text below: body size, `var(--text-muted)`
- After 5s without response: text changes to "Still loading... check connection"
- After 15s: error state replaces (timeout)
- Container has `aria-busy="true"` and `role="status"` with sr-only "Loading"
- For lists: skeleton rows are an option in 5c.3 polish; baseline = single centered spinner

### 8.2 Empty

```
+-------------------------------------+
|           [icon, large]             |
|                                     |
|         No tasks yet                |  H3
|                                     |
|   Capture your first one with the   |  body, --text-muted
|        + button below.              |
|                                     |
|        [ Capture now ]              |  primary button (deep-links FAB)
+-------------------------------------+
```
- Centered, padding `var(--space-8)`
- Icon: 48x48 outlined, neutral color, `aria-hidden="true"`
- H3 carries the message
- Body explains how to fill it
- Primary action button is OPTIONAL but encouraged when there's a clear next step
- Each surface defines its own copy; structure is uniform

### 8.3 Error

```
+-------------------------------------+
|        [error icon, red]            |
|                                     |
|    Couldn't load tasks              |  H3
|                                     |
|  Check your connection and retry.   |  body
|                                     |
|        [ Retry ]                    |  primary button
|                                     |
|  Details: <error message>           |  small, --text-muted, optional, collapsible
+-------------------------------------+
```
- Same layout as empty state, red-tinted icon
- Body text plainly says what failed and what to do
- Primary action: Retry (calls the same fetch)
- Collapsible details: technical message for debugging, hidden behind "Show details" disclosure
- `role="alert"` on the container so screen readers announce immediately

---

## 9. Handoff to PRISM

GRID references these CSS variables but does NOT define them. PRISM owns values.

### Color tokens
- `--color-orange` (primary brand accent, locked at #F58025 per charter)
- `--color-orange-hover`
- `--color-orange-tint` (light tint for backgrounds)
- `--color-danger`, `--color-danger-tint`
- `--color-success`, `--color-success-tint`
- `--color-warning`, `--color-warning-tint`
- `--color-info`, `--color-info-tint`
- `--surface-canvas` (page background)
- `--surface-card` (card background)
- `--surface-elevated` (drawer, modal background)
- `--surface-bar-translucent` (top bar with backdrop-blur)
- `--surface-hover` (row/button hover)
- `--scrim` (overlay scrim)
- `--text-primary`, `--text-muted`, `--text-light`
- `--border-subtle`, `--border-input`

### Type tokens
- `--font-heading` (Playfair Display per Sprint 5c charter)
- `--font-body` (Inter per Sprint 5c charter)
- Type-scale follows GRID rule: 12 / 14 / 16 / 18 / 24 / 32 -- PRISM only assigns line-height + letter-spacing per size

### Shadow tokens
- `--shadow-card`
- `--shadow-card-hover`
- `--shadow-fab`
- `--shadow-modal`

### Radius tokens
- `--radius-sm` (4px)
- `--radius-md` (8px)
- `--radius-lg` (12px)
- `--radius-full` (pills, FAB)

### Spacing tokens (GRID owns the scale; PRISM commits values)
- `--space-1` (4) ... `--space-8` (64). GRID defines the scale; if PRISM disagrees on a step, escalate before changing -- re-spacing every page is expensive.

### Motion tokens (PRISM optional, GRID has defaults)
- `--motion-fast` (150ms)
- `--motion-base` (200ms)
- `--motion-slow` (300ms)
- All eases default to `cubic-bezier(0.2, 0, 0, 1)` (standard ease-out); PRISM can override.

### What PRISM does NOT decide
- Layout, grid columns, breakpoints, focus order, ARIA roles, touch target sizes, keyboard shortcuts, modal stack rules, empty/loading/error structure.

### What GRID does NOT decide
- Exact orange hex variations, typeface choice (Inter + Playfair locked per charter), shadow blur/spread/offset values, radius values within the scale, light vs dark canvas (charter locks dark base + orange -- if PRISM proposes a Skladiste-style light theme as suggested by `reference_pwa_current_ia.md`, that is an explicit PRISM-to-Dario escalation, not a GRID call).

---

## 10. Sprint 5c.2 implementation checklist (for the build agent, not GRID)

When this spec ships into HTML:
- [ ] Skip-link present, visible on focus
- [ ] Top bar sticky, backdrop-blur, height 56
- [ ] Hamburger renders <768, hidden >=768; pills inverse
- [ ] Drawer: 80% width, scrim, focus-trap, Esc/scrim/swipe close, body scroll lock
- [ ] FAB on every non-Home page, hidden during drawer/modal, safe-area inset
- [ ] Home loads with capture textarea pre-focused
- [ ] Cmd/Ctrl+Enter submits capture
- [ ] All interactives >= 44x44pt
- [ ] All async surfaces have loading + empty + error states
- [ ] All modals trap focus, Esc closes, scrim closes, focus restores
- [ ] All forms have visible labels
- [ ] All status banners use `role="status"` + `aria-live`
- [ ] All nav items have `aria-current="page"` when active
- [ ] Reduced-motion media query respected
- [ ] Skip-link, hamburger, FAB, modals, drawer all keyboard-operable without mouse
- [ ] Touch + click + keyboard all reach every action
- [ ] Service worker bumped (v13)

End of spec.
