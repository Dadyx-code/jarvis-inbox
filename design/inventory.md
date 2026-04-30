---
name: pwa_current_ia
type: reference-generic
description: >-
  Inventory of the existing jarvis-inbox PWA tabs and subsections as of
  Sprint 5b close (2026-04-30). Feeds the PRISM + GRID briefs for Sprint 5c.0
  Dashboard IA Reset.
created_at: "2026-04-30T18:30:00+02:00"
location: ~/jarvis-inbox/design/inventory.md (catalogues ~/jarvis-inbox/index.html)
purpose: >-
  Complete catalogue of every existing surface in the PWA so the Sprint 5c
  rebuild loses nothing. Each entry: data sources, user actions, visibility,
  constraints. Used as the "current state" source-of-truth in PRISM/GRID
  design briefs.
---

## At-a-glance

- **Single HTML file**: `~/jarvis-inbox/index.html` (~1700 lines)
- **Stack**: vanilla JS, no framework, GitHub Pages auto-deploy
- **Service worker**: `sw.js`, currently v12 (bumps each substep)
- **Auth**: Sprint 5.2 native Supabase Auth; OTP login gate above app
- **Top-tab nav**: 6 tabs (Inbox, Tasks, Content, Approvals, Team, Admin-owner-only)
- **Theme**: dark (`#0f0d0a` canvas, `#14120e` cards, `#F58025` orange accent)
- **Typography**: system stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`); no Inter/Playfair yet
- **Mobile-first**: yes, but desktop layout is "wider mobile" (no real desktop nav)

## Tabs (current top-level surfaces)

### 1. Inbox (`#p-inbox`) — DEFAULT TAB

**Purpose:** Quick capture for ideas / tasks / decisions / notes (Wispr Flow voice or typed).

**Data:**
- `recent (this device)` — localStorage list of own captures, last N
- `Jarvis Queue` — fetched from inbox table (unprocessed items only)
- `briefingCard` — morning briefing data
- `overnightCard` — overnight worker output

**User actions:**
- Type or speak into textarea
- Pick category chip (Idea / Task / Decision / Note)
- Pick priority pill (Low / Normal / High / Urgent)
- Pick company + project from selects
- Send → POST `inbox` row to Supabase

**Notes:**
- Captures are time-sensitive ("while driving" use case explicit per Dario 2026-04-30)
- The "Send to Jarvis" CTA is the most-used button in the app
- Quick-capture is the most-frequent app-open intent

### 2. Tasks (`#p-tasks`)

**Purpose:** Personal task list with deadlines.

**Data:**
- `tasks` table (own rows + system rows visible to user)
- `lpProjects` — landing-page-projects card list (Risely-derived?)

**User actions:**
- Add task: title, description, deadline, company, priority
- Toggle task done (checkbox)
- Filter Active vs Completed

**Notes:**
- Two visual categories: active list + done list (collapsed)
- Add-task form is collapsed by default, expands on tap

### 3. Content (`#p-content`)

**Purpose:** LinkedIn posts pipeline (idea → draft → approved → published).

**Data:**
- `linkedin_posts` table

**User actions:**
- Filter by status (All / Ideas / Drafts / Ready / Published)
- Filter by topic (All / AI/Ops / Founder / Series / Sequel)
- View post details (no inline edit currently; editing happens elsewhere)

### 4. Approvals (`#p-approvals`)

**Purpose:** Decisions waiting on Dario from agents/automations.

**Data:**
- `approvals` table

**User actions:**
- Approve / reject pending items
- Tab badge shows urgent-count (pulse if > 0)

### 5. Team (`#p-team`)

**Purpose:** People + AI specialists view; activity heartbeat.

**Data:**
- `tmHumans` — human team members from `users` table (employees Dario manages)
- `tmAgents` — registry_active_agents
- `tmLearn` — recent skill_learnings
- `tmNight` — overnight worker stats
- `acctInfo` — current signed-in user + sign-out button

**User actions:**
- View only (no mutations)
- Sign out (clears local session)

**Notes:**
- This tab also hosts the auth account section (sign-out lives here, not in a settings page)

### 6. Admin (`#p-admin`) — OWNER-ONLY

**Purpose:** User management (Sprint 5b shipped 2026-04-30).

**Visibility gate:** `s.email === 'dario.drmac@gmail.com'`. Tab hidden for everyone else.

**Data:**
- `admin_list_users()` RPC → user list
- `admin_list_audit_log(p_limit)` RPC → activity log
- `admin_list_companies()` RPC → for invite/edit modals

**User actions:**
- Invite user (modal: email, name, primary company → POST `admin-create-user` → OTP modal)
- Per-row Cancel invite / Disable / Re-enable (Sprint 5b.3)
- Per-row Edit companies (multi-select modal, Sprint 5b.4)
- View activity log (Sprint 5b.5b: action-type-aware rendering)

**Modals (shared with other tabs):**
- Invite modal → `admin-create-user` POST
- OTP result modal → display 8-digit code, copy button
- Edit-companies modal → `admin-set-user-companies` POST
- Confirm modal (reusable for destructive actions)

## Cross-cutting concerns

### Auth gate
- Login screen (`#loginGate`) above all tabs
- Form: email + 8-digit OTP
- Once authenticated, `body.locked` removed, app shown
- Local session in `localStorage.jarvis_auth_v1`
- `JarvisAuth` module handles refresh / sign-in / sign-out

### Service worker
- Caches static assets
- Bumps version on each PR; old caches purged on activate
- Currently v12

### Status banners
- Each page has its own `#st`, `#st2`, ... `#st6` for inline feedback
- Three states: `wait` (orange), `ok` (green), `err` (red)

### Auth token (`H` headers)
- Populated after `JarvisAuth.bootstrap()`
- Used by every Supabase fetch (RPC, REST, edge fn)
- `whenAuth(fn)` wraps page-load fetches to wait for token readiness

## Data fetched on app load (eager)

- Inbox: `recent (localStorage)`, `Jarvis Queue` from server
- Briefing card: morning_briefing
- Service worker registration

## Data fetched on tab switch (lazy)

- Tasks: tasks list + projects
- Content: linkedin_posts filtered
- Approvals: approvals list (also polled for badge count)
- Team: humans + agents + learnings (parallel)
- Admin: users + audit_log (parallel)

## Patterns worth preserving in 5c rebuild

1. **Capture-first quick path** — typing into the Inbox textarea is the core daily action. The Sprint 5c "Home is Capture + global FAB" lock preserves this.
2. **Status banners per page** — inline feedback is preferred over toast notifications. Keep the pattern.
3. **Modals for destructive actions** — confirm modal is reusable; keep it as a shared component.
4. **Service worker discipline** — bump version on every UI change. Keep.
5. **Owner-only gate via JS** (not server-side route) — Admin tab visibility is JS-controlled; the actual data RPCs enforce owner-only server-side. This is fine and should stay.
6. **Lazy-load tabs** — don't fetch Tasks data until the Tasks tab opens. Keep this; expand to all surfaces.

## Patterns to discard / change in 5c rebuild

1. **Top-tabs nav** → responsive: hamburger drawer on mobile / top horizontal pills on desktop
2. **Dark theme** → Skladiste light theme (white canvas, dark text, subtle shadows)
3. **System font stack** → Inter (body) + Playfair Display (headings)
4. **Bordered cards on dark** → soft-shadow cards on light (`0 2px 16px rgba(0,0,0,0.06)`)
5. **"Inbox" as default tab** → "Home" with capture-first textarea + recent + briefing
6. **No FAB** → orange "+" FAB on every non-Home page for global capture
7. **Per-page status banners** → keep; consider promoting to a single global toast system if cleaner

## Questions for PRISM/GRID briefs

- **Tasks layout density**: list with line-per-task or card grid? Currently flat list. Mobile constrains.
- **Content card design**: filter chips at top + list below; rich preview cards or plain titles?
- **Approvals urgency surfacing**: badge count on nav is one signal; is there a "today only" pinned section on Home?
- **Team tab data density**: many parallel feeds (humans, agents, learnings) — single column or sectioned grid?
- **Audit log table**: dense rows or breathing rows? It scales to 50+ entries fast.
- **Loading states**: currently just `<div class="es">Loading...</div>`. Skeleton screens?
- **Empty states**: currently bare text. Illustrations or just better typography?