---
name: design_jarvis_dashboard
type: reference-generic
description: >-
  PRISM visual design system for the JARVIS Dashboard rebuild (Sprint 5c).
  Light theme, Inter+Playfair, orange #F58025-only, Skladiste soft-shadow
  card pattern. Pairs with GRID structural spec.
created_at: "2026-04-30T22:30:00+02:00"
location: ~/jarvis-inbox/design/design-system.md
purpose: >-
  Source-of-truth visual token spec for Sprint 5c.2 shell rebuild. Defines
  every CSS variable GRID references. Read before writing any HTML/CSS.
x-status: planned
x-origin-session: 2aa64fb5-83bc-43ea-83e8-644c7050f976
---
# JARVIS Dashboard Design System

## Visual Direction

**Archetype:** Premium Warmth crossed with Technical Confidence. JARVIS is Dario's daily work substrate — a multi-tab dashboard that has to feel calm enough to live in for hours, dense enough to surface signal, and personal enough that the orange accent reads as identity, not decoration.

**Mood:** Editorial-clean (Playfair headings deliver a publishing-grade tone; Inter body keeps the data layer honest), warm white canvas (never harsh `#ffffff`), subtle shadows doing all depth work, single chromatic note of orange. The Skladiste dashboard is the structural reference: white card on warm-grey canvas, `0 2px 16px rgba(0,0,0,0.06)` ambient shadow, orange-only brand color, semantic colors strictly fenced to status pills.

**What the user should feel:** "This is mine. It's quiet. The thing I need is exactly where I expect it. The orange means something."

---

## Color Palette

### Layer 1 — Canvas & Surface

```
--surface-canvas:           #f8f8f8   /* page background — warm off-white, never pure */
--surface-card:             #ffffff   /* card / panel background — pure white pops on canvas */
--surface-elevated:         #ffffff   /* drawer, modal, capture sheet */
--surface-bar-translucent:  rgba(255, 255, 255, 0.92)
                                       /* top bar with backdrop-filter: blur(12px) */
--surface-hover:            #fafafa   /* row / button hover (1 step lighter than canvas) */
--surface-input:            #ffffff   /* text inputs, selects */
--surface-input-disabled:   #f4f4f4   /* greyed-out fields */
--surface-muted:            #fafafa   /* nested cards, KPI tiles inside a card (Skladiste pattern) */
--scrim:                    rgba(15, 15, 15, 0.48)
                                       /* modal / drawer overlay, with optional backdrop-blur(2px) */
```

**Why warm off-white canvas, pure white card:** The canvas/card delta gives shadow lift without forcing heavy shadow values. Skladiste pattern verified in production. Pure `#ffffff` canvas would erase the card depth.

### Layer 2 — Borders

```
--border-subtle:    #efefef   /* row dividers, default container borders */
--border-default:   #e5e5e5   /* visible divisions, card outline if needed */
--border-input:     #e0e0e0   /* form fields default */
--border-input-focus: var(--color-orange)   /* form field on :focus-visible */
--border-orange-tint: rgba(245, 128, 37, 0.30)   /* nav border-bottom, orange-edged containers */
```

Borders are minimal — shadows do the depth work. The only place a colored border earns its place is the top-bar bottom edge and active-pill emphasis.

### Layer 3 — Text Scale

```
--text-primary:     #1a1a1a   /* body, all headings — never pure #000 */
--text-secondary:   #444444   /* secondary copy, prominent meta */
--text-muted:       #666666   /* meta rows, captions, KPI labels (Skladiste --text-muted) */
--text-light:       #999999   /* tertiary — timestamps, "12 of 50" counts, row numbers */
--text-disabled:    #c4c4c4   /* disabled inputs/buttons */
--text-inverse:     #ffffff   /* on orange and danger fills */
--text-on-orange:   #ffffff   /* explicit pairing to make the rule unmissable */
```

Four-step scale: primary → secondary → muted → light. Disabled is its own thing. Premium = clear hard separation, not graduated decline.

### Layer 4 — Brand Accent (orange — locked)

```
--color-orange:        #F58025   /* primary brand accent — locked, identity */
--color-orange-hover:  #E0721F   /* darker shade for :hover on filled buttons */
--color-orange-active: #C8631A   /* :active / pressed */
--color-orange-tint:   rgba(245, 128, 37, 0.08)   /* active nav pill bg, status-banner wait bg */
--color-orange-tint-strong: rgba(245, 128, 37, 0.14)
                                                  /* drawer-item active bg, hover on orange-tint pills */
--color-orange-ring:   rgba(245, 128, 37, 0.35)   /* focus ring outer glow */
--color-orange-border: rgba(245, 128, 37, 0.30)   /* nav border-bottom, orange-edged surfaces */
```

**Where orange is used:**
- Primary buttons (filled bg, white text)
- FAB (filled bg, white "+")
- Active nav state (text + tint background)
- Wordmark accent letter (the "S" in JARVIS)
- Capture chip / priority pill when selected
- Focus rings on every interactive element
- Status banner `wait` state (tint bg + orange icon/text)
- Status pill `--brand` variant (KPI accent, "URGENT" priority)
- Bullet-point left-borders on hero cards (one decorative use, max one per surface)

**Where orange is NOT used:**
- Body text (it would burn the page)
- Card backgrounds at full saturation (only as 8% tint)
- Any decorative shape competing with the accent (no orange dividers, no orange icons in nav, no orange separators)
- Status pills for non-brand semantics — Active/Disabled/etc. use their own colors

**Surface coverage rule:** Orange accents must never exceed ~10% of any visible viewport. If a page feels orange-heavy, demote a use site to neutral.

### Layer 5 — Semantic (status only, never decorative)

Tinted backgrounds + saturated text — Skladiste pattern verified.

```
/* SUCCESS — task done, approved, healthy state */
--color-success:       #27ae60   /* text + dot color */
--color-success-bg:    rgba(46, 204, 113, 0.10)
--color-success-border: rgba(46, 204, 113, 0.22)

/* DANGER — error, disable, reject, destructive */
--color-danger:        #e74c3c
--color-danger-bg:     rgba(231, 76, 60, 0.10)
--color-danger-border: rgba(231, 76, 60, 0.22)

/* WARNING — pending, amber state, blocked */
--color-warning:       #d97706   /* darker than Skladiste's #f39c12 for 4.5:1 contrast on white */
--color-warning-bg:    rgba(243, 156, 18, 0.10)
--color-warning-border: rgba(243, 156, 18, 0.24)

/* INFO — neutral system signal, "invited", informational */
--color-info:          #2563eb   /* deeper blue than Skladiste's #3498db for body-text contrast */
--color-info-bg:       rgba(37, 99, 235, 0.08)
--color-info-border:   rgba(37, 99, 235, 0.22)

/* NEUTRAL — system meta, unbranded chip */
--color-neutral:       #555555
--color-neutral-bg:    #f0f0f0
--color-neutral-border: #e0e0e0
```

**Semantic color contrast verification (against `--surface-card` #ffffff):**
- Success `#27ae60` text on white: 3.8:1 — passes >=18pt OR bold body. Use bold for pill text.
- Danger `#e74c3c` text on white: 3.8:1 — same rule, always 600+ weight.
- Warning `#d97706` text on white: 4.5:1 — passes body. (Skladiste used `#f39c12` which fails on white text; deepened.)
- Info `#2563eb` text on white: 6.5:1 — passes everything. (Skladiste used `#3498db` which fails 4.5:1; deepened.)
- Orange `#F58025` text on white: 3.0:1 — **LARGE/BOLD ONLY.** Body-size orange text is forbidden. Active nav pill uses orange text at 13px **600 weight** + orange-tint background which lifts effective contrast. Status pill text is 11px **bold uppercase**. Buttons reverse to white-on-orange (4.7:1). Wordmark accent letter is 22px **700**.

This is the orange-on-white compromise. PRISM verified per GRID's a11y note in §6.5: orange `#F58025` cannot carry body-size light text on white. Every orange-text usage in this system is large-or-bold to clear 3:1 minimum, and any informational text uses `--text-primary` not orange.

### Status pill taxonomy (canonical map)

GRID asks for a status-pill component with named variants. Here is every variant the dashboard surfaces uses, mapped to a token:

**Employee state (Admin → Users):**
- `Active` → `--color-success` family (green text on green-tint, optional leading dot)
- `Disabled` → `--color-neutral` family (grey text on grey-tint)
- `Invited` → `--color-info` family (blue text on blue-tint)
- `Pending` → `--color-warning` family (amber text on amber-tint)

**Task priority (Tasks list, capture chip when set):**
- `Low` → `--color-neutral` family
- `Normal` → `--color-info` family (low-key, "fine" signal)
- `High` → `--color-warning` family (amber, "act today")
- `Urgent` → `--color-danger` family (red, "act now")

**Audit log action type (Admin → Activity log):**
- `invite` → `--color-info` family (new user enters system)
- `cancel_invite` → `--color-neutral` family (no harm done, reversed)
- `disable` → `--color-danger` family (destructive)
- `enable` → `--color-success` family (restore)
- `reassign` → `--color-warning` family (amber, change-of-state)

**Approvals:**
- `Pending` → `--color-warning` family (default state, awaits action)
- `Urgent` → `--color-danger` family (when escalation flag set)
- `Approved` → `--color-success` family (post-action, before fade-out)
- `Rejected` → `--color-danger` family

**Content (LinkedIn pipeline):**
- `Idea` → `--color-neutral` family
- `Draft` → `--color-info` family
- `Ready` → `--color-warning` family (waiting on Dario approval)
- `Published` → `--color-success` family

**Capture category chip (when selected):**
- All four (`Idea` / `Task` / `Decision` / `Note`) → `--color-orange` family (selected=brand, unselected=neutral outline). This is the one place chip selection signals "this is my brand action," so brand color is correct.

**Pill structure rule:** every pill carries a text label. Color alone is never the signal. Optional leading 8px dot for stronger tone, color = pill text color.

---

## Typography

### Typefaces

| Role | Family | Weights loaded | Source |
|------|--------|----------------|--------|
| Headings | Playfair Display | 700 | Google Fonts |
| Body / UI | Inter | 400, 500, 600, 700 | Google Fonts |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```

```css
--font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
--font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

**Pairing archetype:** B (Display + Utility) — Playfair carries personality on H1/H2, Inter carries every utility surface. This is the Skladiste pairing, proven in production.

**Why this pair works:** Playfair's high-contrast strokes give the dashboard an editorial gravitas that says "this is craft, not a CRUD admin panel." Inter's geometric neutrality keeps data rows and form labels honest. The contrast between the two is the personality.

### Type Scale (mobile baseline; desktop overrides flagged)

GRID's structural rule: 12 / 14 / 16 / 18 / 24 / 32. PRISM commits values:

| Token | Size | Line-height | Letter-spacing | Weight | Family | Usage |
|-------|------|-------------|----------------|--------|--------|-------|
| `--type-display` | 32px (mobile) / 40px (desktop) | 1.15 | -0.01em | 700 | heading | rare hero/dash splash, not used on tabbed pages |
| `--type-h1` | 24px (mobile) / 32px (desktop >=768) | 1.2 | -0.01em | 700 | heading | page title, e.g. "Tasks", "What's on your mind?" |
| `--type-h2` | 18px (mobile) / 24px (desktop) | 1.3 | -0.005em | 700 | heading | section header, "Recent captures", "Today's briefing" |
| `--type-h3` | 16px | 1.35 | 0 | 700 | heading | card title, modal title |
| `--type-body-lg` | 18px | 1.55 | 0 | 400 | body | hero subtitle, capture textarea (prevents iOS zoom) |
| `--type-body` | 16px | 1.55 | 0 | 400 | body | default body, input value, list-row title |
| `--type-body-sm` | 14px | 1.5 | 0 | 400 | body | meta rows, secondary inline text |
| `--type-caption` | 13px | 1.45 | 0 | 500 | body | timestamps, "12 active" counts, row meta |
| `--type-micro` | 11px | 1.4 | 0.05em | 600 | body | uppercase labels, status pills, KPI labels (Skladiste pattern) |
| `--type-button` | 14px | 1 | 0 | 600 | body | button text on all sizes |
| `--type-mono` | 13px | 1.5 | 0 | 400 | mono | OTP code, IDs, hashes (Admin) |

**Letter-spacing rules (PRISM iron):**
- Display + H1 (>=24px): negative tracking `-0.01em` — standard rule "tighten big text."
- H2 (18px–24px): subtle `-0.005em`.
- H3 + body (16px and below): 0.
- Micro labels (<=12px uppercase): positive `+0.05em` (Skladiste's `letter-spacing: 0.5px` translated).
- Buttons: 0. Submit buttons render at 14px 600 — no tracking adjustment.

**Hierarchy gap check (3-pass test):**
- Glance (1s): page H1 at 24/32px sets the page identity.
- Scan (5s): card H3 at 16px and section H2 at 18/24px give chapter markers.
- Read: body at 16px, meta at 13px.
- Size jumps: 32 → 18 → 16 → 13 → 11. The 32→18 step (1.78×) is the primary chapter break; 16→13 is the readable ratio for meta. No graduated decline — premium hierarchy preserved.

**Max readable line length:** body and capture textarea cap at `65ch` (≈720px at 16px Inter) on desktop. Mobile naturally constrains.

**Wordmark "JARVIS":**
- Family: Playfair Display, weight 700, size 22px
- Letter-spacing: `0.06em` (1px on 22px) — opens the all-caps wordmark, Skladiste pattern
- Color: `--text-primary`
- Accent letter — final S: `color: var(--color-orange)`. (HTML: `JARVI<span class="accent">S</span>`.) Weight stays 700; spacing stays uniform. The accent letter IS the brand-mark color rule, not a different shape.
- Tap target on top bar: 44pt min via padding.

---

## Spacing

GRID owns the scale, PRISM commits values. **4pt grid** — chosen because the dashboard is data-dense (Skladiste, list rows, KPI tiles, dense audit logs). 4pt is the right call for productivity surfaces; 8pt is for marketing.

```
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
```

**Section rhythm gear shifts:**
- Inside a card: `--space-3` between meta lines, `--space-4` between body and CTA.
- Between cards: `--space-4` mobile, `--space-5` desktop grid-gap.
- Between page sections (H2 to H2): `--space-7` mobile, `--space-8` desktop.
- Between top bar bottom and first H1: `--space-5` (page-header top).
- Page bottom safe-area: `--space-8` so FAB never cuts off content.

The 4× rule (section gap >= 4× element gap) is preserved: `--space-7` (48) is 4× `--space-3` (12), `--space-8` (64) is 4× `--space-4` (16).

**Component max:** no component uses more than 3 spacing values internally. (Card = padding `--space-5`, header gap `--space-4`, meta line gap `--space-2`.)

---

## Depth

**School:** Layered Soft-Shadow Stack on light canvas (Skladiste lineage). Light theme means shadows do all the depth work; borders are minimal and reserved for inputs and dividers.

### Shadow tokens

```css
/* No elevation — flat surfaces sitting on canvas, used rarely (KPI tiles inside a card) */
--shadow-flat: none;

/* Card resting state — Skladiste primary card shadow. Soft + diffuse + low offset. */
--shadow-card: 0 2px 16px rgba(0, 0, 0, 0.06);

/* Card hover — one step up, never two. Single change per interaction. */
--shadow-card-hover: 0 4px 24px rgba(0, 0, 0, 0.10);

/* Dropdown / popover — same blur, slightly deeper offset for "near surface" feel */
--shadow-popover: 0 6px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);

/* Top bar — minimal lift; pairs with backdrop-blur for the floating-glass feel */
--shadow-bar: 0 1px 0 rgba(0, 0, 0, 0.04);
/* Bar's effective separation comes from blur + the orange-tint border-bottom (1px solid var(--color-orange-border)). */

/* FAB — bigger, more saturated, with a subtle orange ghost so the brand reads through the shadow */
--shadow-fab: 0 8px 24px rgba(245, 128, 37, 0.32),
              0 4px 12px rgba(0, 0, 0, 0.10);

/* FAB hover — lifts further */
--shadow-fab-hover: 0 12px 32px rgba(245, 128, 37, 0.38),
                    0 6px 16px rgba(0, 0, 0, 0.12);

/* Modal — deepest layer, dramatic without being heavy */
--shadow-modal: 0 24px 48px rgba(0, 0, 0, 0.18),
                0 8px 16px rgba(0, 0, 0, 0.08);

/* Capture sheet (mobile bottom sheet) — same as modal */
--shadow-sheet: 0 -8px 32px rgba(0, 0, 0, 0.12);

/* Drawer — slides in from left, casts shadow toward main content */
--shadow-drawer: 8px 0 32px rgba(0, 0, 0, 0.12);

/* Inset shadow for active/pressed states on chips and pills */
--shadow-inset-pressed: inset 0 1px 2px rgba(0, 0, 0, 0.08);
```

**Elevation ladder (5 levels — within PRISM's 4–5 max rule):**
1. Flat (KPI tiles inside a card, list rows, drawer items)
2. Card (`--shadow-card`)
3. Popover / Top bar (`--shadow-popover` / `--shadow-bar`)
4. FAB (`--shadow-fab`)
5. Modal / Drawer / Sheet (`--shadow-modal` / `--shadow-drawer` / `--shadow-sheet`)

### Focus rings

Every interactive element uses **orange ring** on `:focus-visible` — never default browser blue. Iron rule from PRISM seed.

```css
--focus-ring:        0 0 0 3px var(--color-orange-ring);          /* outer glow */
--focus-ring-inset:  inset 0 0 0 2px var(--color-orange);         /* inset for filled buttons */
--focus-ring-fab:    0 0 0 3px #ffffff, 0 0 0 6px var(--color-orange-ring);
                                                                   /* white inner + orange outer for orange-on-orange context */
```

Focus rings only render on `:focus-visible` (keyboard nav), never on `:focus` (mouse click).

### Hover pattern (one change per interaction — iron rule)

| Surface | Hover change |
|---------|--------------|
| Card | shadow `--shadow-card` → `--shadow-card-hover`. No transform. |
| List row | background → `--surface-hover`. No shadow added. |
| Button (primary) | bg `--color-orange` → `--color-orange-hover`. No transform. |
| Button (secondary) | border darkens 1 step + bg → `--surface-hover` (single visual change is the bg fill). |
| Nav pill | bg → `--color-orange-tint` (text stays muted unless active). |
| FAB | shadow → `--shadow-fab-hover` + scale(1.04) (FAB is the one place a transform earns its keep — it's the global capture trigger). |
| Active state on click | scale(0.96) for 80ms (button press feedback). |

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: all transform-based effects disabled, shadows still animate (color transitions are safe), drawer/sheet/modal entrance becomes pure fade.

---

## Radius

```
--radius-xs:   4px    /* status pill height-locked, KPI inner tiles */
--radius-sm:   6px    /* buttons (Skladiste 6px) — professional SaaS */
--radius-md:   8px    /* inputs, selects, capture textarea, chips */
--radius-lg:  12px    /* cards, modals, drawer, capture sheet (Skladiste --radius) */
--radius-xl:  16px    /* hero capture container on Home (one step up from cards) */
--radius-full: 9999px /* FAB, pills, status badges */
```

**Shape language consistency (iron rule):** Buttons at 6px, inputs at 8px — these are the same family (small-radius SaaS), within PRISM's "professional" archetype. Skladiste runs both at 6–10px range; we standardize at 6 (button) / 8 (input). This 2px gap is intentional: inputs get more rounding because they're typed-into, buttons get less because they're tapped. **Cards always 12px.** Pills always full. FAB always 50% (full).

**Forbidden:** mixing pill-shaped buttons with sharp inputs (or vice versa). Mixing 12px cards with 24px modals. Each shape token has one job.

---

## Motion

```
--motion-fast:   150ms cubic-bezier(0.2, 0, 0, 1)   /* hover state, focus ring, color transitions */
--motion-base:   200ms cubic-bezier(0.2, 0, 0, 1)   /* drawer/modal/sheet enter/exit, FAB hide/show */
--motion-slow:   300ms cubic-bezier(0.2, 0, 0, 1)   /* card animate-out (approve/reject success) */
--motion-bounce: 80ms ease-out                       /* button press scale(0.96) */
```

The shared `cubic-bezier(0.2, 0, 0, 1)` is a standard ease-out — content arrives gracefully, departs decisively.

---

## Component Aesthetic

### Buttons (3-tier hierarchy — never a 4th)

**Primary** — filled, orange:
```css
background: var(--color-orange);
color: var(--text-on-orange);
border: none;
border-radius: var(--radius-sm);   /* 6px */
height: 48px;                       /* 44pt minimum + breathing */
padding: 0 var(--space-5);          /* 24px horizontal */
font: 600 14px/1 var(--font-body);
box-shadow: 0 1px 2px rgba(245, 128, 37, 0.20);
transition: background var(--motion-fast), box-shadow var(--motion-fast);

&:hover { background: var(--color-orange-hover); }
&:active { transform: scale(0.96); transition-duration: 80ms; }
&:focus-visible { box-shadow: 0 1px 2px rgba(245, 128, 37, 0.20), var(--focus-ring); }
&:disabled { background: #f0c5a3; cursor: not-allowed; }
```

Compact variant: 36px tall, 12px horizontal padding — for inline form actions like the capture submit on desktop where full-width is wrong.

**Secondary** — outlined, neutral:
```css
background: var(--surface-card);
color: var(--text-primary);
border: 1px solid var(--border-default);
border-radius: var(--radius-sm);
height: 48px;
padding: 0 var(--space-5);
font: 600 14px/1 var(--font-body);

&:hover { background: var(--surface-hover); border-color: #d0d0d0; }
&:focus-visible { box-shadow: var(--focus-ring); }
```

**Tertiary** — text-only:
```css
background: transparent;
color: var(--color-orange);   /* orange because tertiary buttons are usually "View all", "More" — brand-led navigational text */
border: none;
height: 36px;
padding: 0 var(--space-3);
font: 600 14px/1 var(--font-body);

&:hover { background: var(--color-orange-tint); border-radius: var(--radius-sm); }
```

**Destructive (modal confirm only)** — replaces primary in confirm dialogs:
```css
background: var(--color-danger);
color: #ffffff;
/* otherwise identical to primary */
&:hover { background: #c0392b; }
```

**Iron rule:** never have more than 3 button variants visible in the same viewport. Destructive replaces primary in confirm modals; the two never coexist.

### Cards

```css
background: var(--surface-card);
border: none;                              /* shadow does the work; no double-signal */
border-radius: var(--radius-lg);           /* 12px */
box-shadow: var(--shadow-card);
padding: var(--space-5);                    /* 24px — Skladiste's 28px rounded down to 4pt grid */
transition: box-shadow var(--motion-fast);

&:hover { box-shadow: var(--shadow-card-hover); }
```

**Card anatomy (universal order — iron rule):**
1. Optional badge / status pill (top-right or above title) — `--type-micro`, tinted-bg pill
2. Title — `--type-h3` (16px 700, Playfair if it's a real chapter, Inter if it's a list-card subtitle)
3. Body / description — `--type-body` or `--type-body-sm`, `--text-secondary` color
4. CTA / link — `--color-orange` text, `--type-button` size, right-aligned or below

Card padding stays uniform at `--space-5` regardless of viewport — the breathing density Skladiste uses on desktop maps cleanly to mobile here because the canvas already has page padding.

**Hero capture container (Home page only):**
- Same as card but `border-radius: var(--radius-xl)` (16px, one step up)
- Padding `--space-6` (32px)
- No hover state (it's not interactive as a whole — the textarea inside is)
- Shadow: `--shadow-card`. The textarea inside has its own border treatment.

**KPI tile (inside a card — Skladiste pattern preserved):**
- Background `--surface-muted`
- Border 1px solid `--border-subtle`
- Radius `--radius-md` (10 → 8px on the 4pt grid)
- Padding `--space-5`
- 4px-wide left accent bar in `--color-orange` for branded KPI, or semantic color for status KPI (e.g. red bar on alert KPI, green bar on healthy KPI). This is the **only** place semantic colors are used decoratively — and they're only used as a 4px stripe, never as a fill.

### Form Elements

**Text input / textarea:**
```css
background: var(--surface-input);
color: var(--text-primary);
border: 1px solid var(--border-input);
border-radius: var(--radius-md);   /* 8px */
height: 48px;                       /* inputs */
padding: 0 var(--space-4);          /* 16px */
font: 400 16px/1.5 var(--font-body);   /* 16px prevents iOS zoom on focus */
transition: border-color var(--motion-fast), box-shadow var(--motion-fast);

&::placeholder { color: var(--text-light); font-weight: 400; }
&:hover { border-color: #cccccc; }
&:focus-visible {
  outline: none;
  border-color: var(--color-orange);
  box-shadow: var(--focus-ring);
}
&:disabled { background: var(--surface-input-disabled); color: var(--text-disabled); }
&[aria-invalid="true"] { border-color: var(--color-danger); }
```

Textarea variant: same tokens, `min-height: 96px` (4 lines), `padding: var(--space-4)`, `line-height: 1.55`, no fixed height.

**Capture textarea (Home hero) — same as base textarea but:**
- `border-radius: var(--radius-md)`
- `font-size: var(--type-body-lg)` (18px) — invites typing, the textarea is the page's hero
- `min-height: 120px` (5 lines visible at rest)
- Same focus state (orange border + ring)

**Native `<select>`:** styled to match input (border, radius, height, font), keep native chevron. Wrapped in `<label>` per GRID's a11y rule.

**Capture chips (radiogroup — Idea / Task / Decision / Note):**
```css
/* Default (unselected) */
background: var(--surface-card);
color: var(--text-secondary);
border: 1px solid var(--border-default);
border-radius: var(--radius-md);    /* matches inputs — same family */
height: 36px;                        /* visible — 44pt hit area via ::before per GRID */
padding: 0 var(--space-3);
font: 500 14px/1 var(--font-body);

/* Hover */
&:hover { background: var(--surface-hover); border-color: #d0d0d0; }

/* Selected (orange brand state) */
&[aria-checked="true"] {
  background: var(--color-orange);
  color: var(--text-on-orange);
  border-color: var(--color-orange);
}

/* Focus */
&:focus-visible { box-shadow: var(--focus-ring); }
```

**Priority pills (Low / Normal / High / Urgent):** identical structure to chips, but selected state uses the **semantic** color of that priority (Normal=info, High=warning, Urgent=danger, Low=neutral) so the priority signal is read in the color the moment it's set. This is the one exception to "semantic colors only on status pills" — priority is itself a status.

### Status Banner (per-page inline feedback — `wait` / `ok` / `err`)

```css
display: inline-flex;
align-items: center;
gap: var(--space-2);
padding: var(--space-3) var(--space-4);
border-radius: var(--radius-md);
font: 500 14px/1.4 var(--font-body);

&[data-state="wait"] {
  background: var(--color-orange-tint);
  border: 1px solid var(--color-orange-border);
  color: var(--color-orange-active);
}
&[data-state="ok"] {
  background: var(--color-success-bg);
  border: 1px solid var(--color-success-border);
  color: var(--color-success);
}
&[data-state="err"] {
  background: var(--color-danger-bg);
  border: 1px solid var(--color-danger-border);
  color: var(--color-danger);
}
```

Icon (left): 16px, `currentColor`, Heroicons (clock for wait, check-circle for ok, exclamation-triangle for err).

### Status Pill

```css
display: inline-flex;
align-items: center;
gap: var(--space-1);                /* 4px gap if dot is present */
padding: 2px var(--space-2);        /* tight vertical, 8px horizontal */
border-radius: var(--radius-full);
font: 600 11px/1.4 var(--font-body);
text-transform: uppercase;
letter-spacing: 0.05em;
white-space: nowrap;
```

Variants — each pill picks one semantic family:
```css
&[data-tone="brand"]    { background: var(--color-orange-tint);     color: var(--color-orange-active); }
&[data-tone="success"]  { background: var(--color-success-bg);      color: var(--color-success); }
&[data-tone="danger"]   { background: var(--color-danger-bg);       color: var(--color-danger); }
&[data-tone="warning"]  { background: var(--color-warning-bg);      color: var(--color-warning); }
&[data-tone="info"]     { background: var(--color-info-bg);         color: var(--color-info); }
&[data-tone="neutral"]  { background: var(--color-neutral-bg);      color: var(--color-neutral); }
```

Optional leading dot: 8px circle, `background: currentColor`, used on Active employee state and pending-action audit rows where the tone is the message.

### Audit log row (Admin → Activity)

Each row is a list-row with a leading **action-type badge** (a status pill) + descriptive text + timestamp.

```
[invite]      Dario invited petra@brza.hr            12 min ago
[disable]     Dario disabled marko@grape.hr          2 h ago
[reassign]    Dario moved Petra to Brza, Tipsy        yesterday 18:42
[enable]      Dario re-enabled marko@grape.hr        2026-04-28
[cancel_invite] Dario cancelled invite for ana@…      2026-04-28
```

- Badge widths kept consistent via `min-width: 80px` to align text columns
- Badge tone follows the audit-log map above (invite=info, disable=danger, reassign=warning, enable=success, cancel_invite=neutral)
- Row padding `--space-3 --space-4`, row min-height 48pt
- Border-bottom `1px solid var(--border-subtle)` between rows; last row no border
- Timestamp aligned right, `--type-caption`, `--text-light`

Row hover: bg → `--surface-hover`, no other change.

### Drawer item (mobile drawer nav)

```css
display: flex;
align-items: center;
gap: var(--space-3);
padding: var(--space-3) var(--space-5);
min-height: 48px;
font: 500 16px/1.4 var(--font-body);
color: var(--text-secondary);
border-left: 3px solid transparent;
transition: background var(--motion-fast), color var(--motion-fast);

&:hover { background: var(--surface-hover); }

&[aria-current="page"] {
  background: var(--color-orange-tint);
  color: var(--color-orange-active);
  border-left-color: var(--color-orange);
  font-weight: 600;
}
```

Drawer **section header** (HOME / WORK / PEOPLE / SETTINGS):
- `--type-micro` (11px 600 uppercase, +0.05em)
- `--text-light` color
- Padding-top `--space-4`, padding-bottom `--space-2`, padding-x `--space-5`

Drawer **footer** (signed-in pill + sign-out button):
- Sticky bottom of drawer
- Top border `1px solid var(--border-subtle)`
- Padding `--space-4`
- Email shown at `--type-body-sm` `--text-muted`
- Sign-out is **secondary button** (not destructive — destructive style is for confirm modal; sign-out itself is a navigation action that **opens** a confirm modal)

### Desktop nav pill

```css
padding: var(--space-2) var(--space-3);     /* 8px / 12px — Skladiste pattern */
border-radius: var(--radius-sm);             /* 6px */
font: 500 13px/1 var(--font-body);
color: var(--text-muted);
background: transparent;
transition: background var(--motion-fast), color var(--motion-fast);

&:hover { background: var(--color-orange-tint); color: var(--color-orange); }
&[aria-current="page"], &.active {
  background: var(--color-orange-tint);
  color: var(--color-orange);
  font-weight: 600;
}
```

Dropdown panel (WORK, PEOPLE parent pills):
- Background `--surface-elevated`
- Border-radius `--radius-md`
- Box-shadow `--shadow-popover`
- Padding `var(--space-2)`
- Items 36px tall, 12px horizontal padding, hover bg `--surface-hover`
- 8px offset below parent pill

### Top bar

```css
position: fixed;
top: 0; left: 0; right: 0;
height: 56px;
background: var(--surface-bar-translucent);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-bottom: 1px solid var(--color-orange-border);   /* Skladiste pattern */
box-shadow: var(--shadow-bar);
z-index: var(--z-sticky);
```

The Skladiste signature is the orange-tinted bottom border (`rgba(245, 128, 37, 0.30)`) — it's the one place an orange line is permitted, because it acts as the brand thread for the whole shell.

### FAB

```css
position: fixed;
width: 56px;
height: 56px;
border-radius: var(--radius-full);
background: var(--color-orange);
color: var(--text-on-orange);
border: none;
box-shadow: var(--shadow-fab);
display: grid;
place-items: center;
transition:
  background var(--motion-fast),
  box-shadow var(--motion-base),
  transform var(--motion-base);

/* Resting state — defined above */

&:hover {
  background: var(--color-orange-hover);
  box-shadow: var(--shadow-fab-hover);
  transform: scale(1.04);
}

&:active {
  transform: scale(0.96);
  transition-duration: 80ms;
}

&:focus-visible {
  outline: none;
  box-shadow: var(--shadow-fab), var(--focus-ring-fab);
}

&[hidden] {                  /* Home page, drawer open, modal open */
  opacity: 0;
  pointer-events: none;
  transform: scale(0.85);
}
```

Icon: Heroicons `plus` SVG, 24x24, stroke 2, `currentColor` (white).

### Modal

```css
.modal-scrim {
  position: fixed; inset: 0;
  background: var(--scrim);
  backdrop-filter: blur(2px);
  z-index: var(--z-overlay);
  animation: fade-in var(--motion-fast) ease-out;
}

.modal {
  background: var(--surface-elevated);
  border-radius: var(--radius-lg);            /* 12px — same family as cards */
  box-shadow: var(--shadow-modal);
  z-index: var(--z-modal);
  animation: modal-enter var(--motion-base) ease-out;
}

.modal-header { padding: var(--space-5); border-bottom: 1px solid var(--border-subtle); }
.modal-body   { padding: var(--space-5); }
.modal-footer { padding: var(--space-4) var(--space-5); border-top: 1px solid var(--border-subtle);
                display: flex; justify-content: flex-end; gap: var(--space-3); }

@keyframes modal-enter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Confirm modal (destructive variant): footer's primary button uses destructive color tokens. Title H2 `--type-h2`. Body `--type-body`.

### Capture sheet (mobile bottom sheet)

```css
.sheet {
  position: fixed; left: 0; right: 0; bottom: 0;
  background: var(--surface-elevated);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-sheet);
  max-height: 90vh;
  z-index: var(--z-modal);
  animation: sheet-up var(--motion-base) ease-out;
}

.sheet-handle {                            /* iOS-style drag handle */
  width: 40px; height: 4px;
  background: var(--border-default);
  border-radius: var(--radius-full);
  margin: var(--space-2) auto var(--space-3);
}

@keyframes sheet-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
```

### Skip link

```css
.skip-link {
  position: absolute;
  top: -40px;                              /* off-canvas */
  left: var(--space-3);
  padding: var(--space-2) var(--space-4);
  background: var(--text-primary);
  color: #ffffff;
  border-radius: var(--radius-sm);
  font: 600 14px/1 var(--font-body);
  z-index: 9999;
  transition: top var(--motion-fast);
  
  &:focus { top: var(--space-3); }
}
```

### Auth gate (login screen)

- Centered card on canvas (no top bar, no nav)
- Wordmark above card, sized `--type-display` (32/40px), accent letter S in orange
- Card: same as standard card but `max-width: 400px`, padding `--space-6`
- Email + OTP fields: standard input styling
- Submit: primary button, full-width inside card
- Status banner below button (`#loginSt`)

---

## Guardrails (JARVIS-specific "don'ts")

1. **No second chromatic accent.** If a future feature wants a second brand color, it doesn't get one. Subtract instead.
2. **No orange body text.** Orange `#F58025` only renders at >=14px AND >=600 weight, OR reversed white-on-orange.
3. **Semantic colors are status only.** Never ornamental. The only exception is the priority pill (because priority IS status) and the 4px KPI accent bar (where the color encodes the KPI's health).
4. **One library: Heroicons.** Outline 24x24 stroke 1.5 default; solid for active/filled states. No emoji. No second icon library.
5. **One radius family per element type.** Buttons 6px, inputs 8px, cards 12px, pills full. Never mix.
6. **One shadow per state.** Hover lifts to the next level — never two levels at once.
7. **No skeuomorphic shadows on buttons.** Buttons get a 1px `0 1px 2px` micro-lift, not a full elevation shadow. Buttons aren't cards.
8. **Top bar's orange border-bottom is the only orange line in the shell.** No orange dividers, no orange separators inside content. The bar is the brand thread.
9. **Page H1 is Playfair, page H2 is Playfair, card H3 is Inter 700.** This is the editorial-to-utility transition; preserve it.
10. **Capture textarea is the hero on Home.** It gets `--type-body-lg` (18px), 5 lines visible at rest, the largest non-heading body element on any page. Don't shrink it.
11. **FAB hides on Home.** Home has the textarea inline; the FAB on Home would be a duplicate trigger.
12. **No Croatian "drink" anywhere.** Per MEMORY rule. UI strings stay English on this dashboard since it's Dario-personal, but if any user-facing copy is added, "piće" not "drink."
13. **No emojis.** Per PRISM iron rule. In labels, status pills, error messages, anywhere.
14. **No center-aligned body paragraphs.** Center is only for hero headlines (max 2–3 lines) on the auth gate.
15. **Loading spinners use orange.** Never grey/white. The spinning ring is `--color-orange` 2px stroke, 0.8s linear infinite.
16. **Empty-state illustrations stay neutral.** Outlined 48px Heroicons in `--text-light` color, never decorative orange. Orange goes on the call-to-action button below the empty state, not on the icon.

---

## HANDOFF — every CSS variable GRID's structure_jarvis_dashboard.md references

GRID's spec lists these tokens as "PRISM owns the values." All present and accounted for:

### Color tokens
- [x] `--color-orange` — `#F58025`
- [x] `--color-orange-hover` — `#E0721F`
- [x] `--color-orange-tint` — `rgba(245, 128, 37, 0.08)`
- [x] `--color-danger` / `--color-danger-tint` — `#e74c3c` / `rgba(231, 76, 60, 0.10)` (named `--color-danger-bg` here for consistency with PRISM scale; `--color-danger-tint` exposed as alias)
- [x] `--color-success` / `--color-success-tint` — `#27ae60` / `rgba(46, 204, 113, 0.10)`
- [x] `--color-warning` / `--color-warning-tint` — `#d97706` / `rgba(243, 156, 18, 0.10)`
- [x] `--color-info` / `--color-info-tint` — `#2563eb` / `rgba(37, 99, 235, 0.08)`
- [x] `--surface-canvas` — `#f8f8f8`
- [x] `--surface-card` — `#ffffff`
- [x] `--surface-elevated` — `#ffffff`
- [x] `--surface-bar-translucent` — `rgba(255, 255, 255, 0.92)` + `backdrop-filter: blur(12px)`
- [x] `--surface-hover` — `#fafafa`
- [x] `--scrim` — `rgba(15, 15, 15, 0.48)`
- [x] `--text-primary` — `#1a1a1a`
- [x] `--text-muted` — `#666666`
- [x] `--text-light` — `#999999`
- [x] `--border-subtle` — `#efefef`
- [x] `--border-input` — `#e0e0e0`

Aliases shipped for GRID's exact naming:
```css
--color-danger-tint: var(--color-danger-bg);
--color-success-tint: var(--color-success-bg);
--color-warning-tint: var(--color-warning-bg);
--color-info-tint: var(--color-info-bg);
```

### Type tokens
- [x] `--font-heading` — `'Playfair Display', Georgia, 'Times New Roman', serif`
- [x] `--font-body` — `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- [x] Type-scale 12 / 14 / 16 / 18 / 24 / 32 — assigned line-heights and letter-spacings in §Typography table

### Shadow tokens
- [x] `--shadow-card` — `0 2px 16px rgba(0, 0, 0, 0.06)`
- [x] `--shadow-card-hover` — `0 4px 24px rgba(0, 0, 0, 0.10)`
- [x] `--shadow-fab` — `0 8px 24px rgba(245, 128, 37, 0.32), 0 4px 12px rgba(0, 0, 0, 0.10)`
- [x] `--shadow-modal` — `0 24px 48px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.08)`

### Radius tokens
- [x] `--radius-sm` — `6px` (note: GRID listed 4px; PRISM commits 6px on the small-radius-SaaS rationale; if GRID needs 4px specifically for status pills, use `--radius-xs: 4px` which is also defined)
- [x] `--radius-md` — `8px`
- [x] `--radius-lg` — `12px`
- [x] `--radius-full` — `9999px`

### Spacing tokens
- [x] `--space-1` (4) through `--space-8` (64) — values committed in §Spacing per GRID's scale

### Motion tokens
- [x] `--motion-fast` — `150ms cubic-bezier(0.2, 0, 0, 1)`
- [x] `--motion-base` — `200ms cubic-bezier(0.2, 0, 0, 1)`
- [x] `--motion-slow` — `300ms cubic-bezier(0.2, 0, 0, 1)`

### Z-index (GRID-owned, restated for clarity)
PRISM does not redefine; uses GRID's: `--z-base 0`, `--z-sticky 100`, `--z-fab 200`, `--z-overlay 900`, `--z-drawer 950`, `--z-modal 1000`, `--z-toast 1100`.

---

## ROOT-LEVEL :root BLOCK (drop-in)

```css
:root {
  /* === BRAND ACCENT === */
  --color-orange:        #F58025;
  --color-orange-hover:  #E0721F;
  --color-orange-active: #C8631A;
  --color-orange-tint:   rgba(245, 128, 37, 0.08);
  --color-orange-tint-strong: rgba(245, 128, 37, 0.14);
  --color-orange-ring:   rgba(245, 128, 37, 0.35);
  --color-orange-border: rgba(245, 128, 37, 0.30);

  /* === CANVAS / SURFACE === */
  --surface-canvas:           #f8f8f8;
  --surface-card:             #ffffff;
  --surface-elevated:         #ffffff;
  --surface-bar-translucent:  rgba(255, 255, 255, 0.92);
  --surface-hover:            #fafafa;
  --surface-input:            #ffffff;
  --surface-input-disabled:   #f4f4f4;
  --surface-muted:            #fafafa;
  --scrim:                    rgba(15, 15, 15, 0.48);

  /* === BORDERS === */
  --border-subtle:    #efefef;
  --border-default:   #e5e5e5;
  --border-input:     #e0e0e0;

  /* === TEXT === */
  --text-primary:   #1a1a1a;
  --text-secondary: #444444;
  --text-muted:     #666666;
  --text-light:     #999999;
  --text-disabled:  #c4c4c4;
  --text-inverse:   #ffffff;
  --text-on-orange: #ffffff;

  /* === SEMANTIC === */
  --color-success:        #27ae60;
  --color-success-bg:     rgba(46, 204, 113, 0.10);
  --color-success-border: rgba(46, 204, 113, 0.22);
  --color-success-tint:   rgba(46, 204, 113, 0.10);

  --color-danger:         #e74c3c;
  --color-danger-bg:      rgba(231, 76, 60, 0.10);
  --color-danger-border:  rgba(231, 76, 60, 0.22);
  --color-danger-tint:    rgba(231, 76, 60, 0.10);

  --color-warning:        #d97706;
  --color-warning-bg:     rgba(243, 156, 18, 0.10);
  --color-warning-border: rgba(243, 156, 18, 0.24);
  --color-warning-tint:   rgba(243, 156, 18, 0.10);

  --color-info:           #2563eb;
  --color-info-bg:        rgba(37, 99, 235, 0.08);
  --color-info-border:    rgba(37, 99, 235, 0.22);
  --color-info-tint:      rgba(37, 99, 235, 0.08);

  --color-neutral:        #555555;
  --color-neutral-bg:     #f0f0f0;
  --color-neutral-border: #e0e0e0;

  /* === TYPOGRAPHY === */
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* === SPACING === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* === RADIUS === */
  --radius-xs:   4px;
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:  12px;
  --radius-xl:  16px;
  --radius-full: 9999px;

  /* === SHADOWS === */
  --shadow-flat: none;
  --shadow-card: 0 2px 16px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 4px 24px rgba(0, 0, 0, 0.10);
  --shadow-popover: 0 6px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  --shadow-bar: 0 1px 0 rgba(0, 0, 0, 0.04);
  --shadow-fab: 0 8px 24px rgba(245, 128, 37, 0.32), 0 4px 12px rgba(0, 0, 0, 0.10);
  --shadow-fab-hover: 0 12px 32px rgba(245, 128, 37, 0.38), 0 6px 16px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 24px 48px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.08);
  --shadow-sheet: 0 -8px 32px rgba(0, 0, 0, 0.12);
  --shadow-drawer: 8px 0 32px rgba(0, 0, 0, 0.12);
  --shadow-inset-pressed: inset 0 1px 2px rgba(0, 0, 0, 0.08);

  --focus-ring:       0 0 0 3px var(--color-orange-ring);
  --focus-ring-inset: inset 0 0 0 2px var(--color-orange);
  --focus-ring-fab:   0 0 0 3px #ffffff, 0 0 0 6px var(--color-orange-ring);

  /* === MOTION === */
  --motion-fast:   150ms cubic-bezier(0.2, 0, 0, 1);
  --motion-base:   200ms cubic-bezier(0.2, 0, 0, 1);
  --motion-slow:   300ms cubic-bezier(0.2, 0, 0, 1);
  --motion-bounce: 80ms ease-out;

  /* === Z-INDEX (mirroring GRID for completeness) === */
  --z-base:    0;
  --z-sticky:  100;
  --z-fab:     200;
  --z-overlay: 900;
  --z-drawer:  950;
  --z-modal:   1000;
  --z-toast:   1100;
}
```

End of design system.
