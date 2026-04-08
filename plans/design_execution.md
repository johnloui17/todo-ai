# Design Execution Plan: TODO AI (Stitch Framework Edition)

This document executes the design methodology for TODO AI, mapping PRD requirements to a functional, high-fidelity design system optimized for the **Stitch** (AI-native) workflow.

---

## PHASE 01: DISCOVERY & RESEARCH (Stitch Vibe)
**Core Design Goals**: Speed (Zero-latency), Data-Density (Progress-focused), Mobile-First (PWA), and Trust (Sync status).

### 1. User Personas
*   **Alex (The Inbox-Zero PM)**: Dumps 20+ tasks daily into the **Task Pool**. Needs rapid multi-select and categorization.
*   **Maya (The Visual Freelancer)**: Manages 5 distinct "Domains" (Categories). Relies on the **Category Progress Bars** for dopamine hits and tracking.
*   **David (The Analog Hybrid)**: Uses paper for notes. Needs the **AI Screenshot-to-Task** (WebGPU) to be 100% reliable and fast.
*   **Leo (The Habit Architect)**: Focused on personal growth. Uses the **Not-Todo List** to avoid distractions like social media or late-night snacking. Needs clear streak indicators.

### 2. Competitor Audit (What to look for)
1.  **Things 3**: Gold standard for minimalist hierarchy and "Area" (Category) progress.
2.  **Todoist**: Fast entry and natural language parsing.
3.  **Linear**: High-performance interaction design and keyboard shortcuts (for PWA).
4.  **Any.do**: Screenshot/WhatsApp task capture flows.
5.  **Not-To-Do List Apps**: (e.g., "Quit" or "Habitify") for habit avoidance logic and daily reset UX.

### 3. Key User Journeys
- **Onboarding**: Google OAuth -> "Identify your 4 core domains" (Initial Category creation).
- **The "Dump"**: FAB (Floating Action Button) -> Rapid text entry -> Instant Pool update.
- **The "Sort"**: Pool view -> Multi-select tasks -> "Move to Category" menu.
- **The "Extraction"**: AI Hub -> Upload screenshot -> Review Extracted Tasks -> Map to Categories.
- **The "Avoidance"**: Not-Todo Dashboard -> Toggle "Avoided" for the day -> View Streak update.

---

## PHASE 02: INFORMATION ARCHITECTURE & FLOWS

### 1. Sitemap & Navigation
*   **Layout**: **Bottom Tab Bar** (Home, Task Pool, **Not-Todo**, AI Scan, Settings) with a central **[+] FAB**.
*   **Screens**:
    *   `Dashboard` (Root): Grid/List of Categories with Progress Indicators.
    *   `Category Detail`: Filtered view (Active/Completed) + Subtask nesting.
    *   `The Pool`: Uncategorized backlog (`category_id IS NULL`).
    *   `Not-Todo Hub`: Daily list of items to avoid + Streaks + "Avoided/Failed" toggles.
    *   `AI Review`: Staged screen for OCR verification before database commit.
    *   `Settings`: Export JSON/CSV, Sync Status (PowerSync), Google Account.

### 2. Content Hierarchy
1.  **Primary**: Category Progress & **Daily Avoidance Status**.
2.  **Secondary**: Active Task Titles & Not-Todo Streaks.
3.  **Tertiary**: Subtasks and Metadata (Created date, category label).

---

## PHASE 03: WIREFRAMING (Stitch Low-Fi)

### Dashboard (Main Screen)
```text
+-----------------------------------+
|  [Logo] Sync: (OK)      [User Icon]|
+-----------------------------------+
|  TOTAL PROGRESS: 68%  [========= ]|
+-----------------------------------+
|  CATEGORIES                       |
|  [ Work          (12) [=======  ] ] |
|  [ Personal      (5)  [====     ] ] |
|  [ Health        (3)  [==========]] |
|  [ Side Project  (0)  [          ]] |
+-----------------------------------+
| [Cats] [Pool]  [NTD]  [AI] [Set]  | (NTD = Not-Todo)
+-----------------------------------+
```

### Not-Todo Hub
```text
+-----------------------------------+
|  NOT-TODO LIST          [Calendar]|
+-----------------------------------+
|  [!] Don't check social [Streak: 5]|
|      [ AVOIDED ]  [ FAILED ]      |
+-----------------------------------+
|  [!] No caffeine > 2PM [Streak: 12]|
|      [ AVOIDED ]  [ FAILED ]      |
+-----------------------------------+
| [Cats] [Pool]  [NTD]  [AI] [Set]  |
+-----------------------------------+
```

---

## PHASE 04: DESIGN SYSTEM (Stitch Spec)
**Framework**: Next.js 16 + Tailwind v4 + **Stitch Component Mapping**.

### 1. Palette & Typography
- **Primary**: `Indigo-600` (#4F46E5) - Main CTA & Progress active state.
- **Surface**: `Slate-900` (#0F172A) - Dark-first default for battery efficiency.
- **Success**: `Emerald-500` (#10B981) - Completed/Avoided states.
- **Warning/Not-Todo**: `Rose-500` (#F43F5E) - Visual cue for "Not-Todo" failed items or distinct theme.
- **Font**: `Inter` (Variable). H1: 24px Semi-bold; Body: 16px; Small: 12px.

### 2. UI Components (Stitch Library)
- `CategoryCard`: Glassmorphic card with a 4px bottom progress border.
- `TaskItem`: Swipe-to-Action (Left: Delete, Right: Move to Pool).
- `NotTodoItem`: Distinct card with a "Daily Decision" toggle (Avoided/Failed) and high-contrast streak badge.
- `ProgressBar`: Animated SVG line that pulses when a category updates.

---

## PHASE 05: INTERACTIONS & MOTION

1.  **Optimistic Completion**: Checkbox marks instantly; Progress bar updates *before* SQLite/PowerSync confirmation.
2.  **Avoidance Snap**: When a Not-Todo is marked "Avoided", the card glows green and the streak number increments with a "pop" animation.
3.  **AI Reading State**: Skeleton loader items with a "Scanning..." shimmer overlay on the uploaded screenshot.
4.  **The "Sweep"**: When a category is 100% completed, a subtle confetti/shimmer effect plays on the `CategoryCard`.

---

## PHASE 06: DEV HANDOFF & EDGE CASES

### 1. Component Specs
- `TaskItem` Props: `id: string`, `title: string`, `status: 'active'|'done'`, `type: 'todo'|'not_todo'`.
- `NotTodo` Logic: Daily reset at midnight (local time); Streak = consecutive days marked "Avoided".

### 2. Edge Case Handling
- **Offline State**: "You are working locally" persistent banner if `navigator.onLine` is false.
- **Timezone Change**: Handle midnight reset based on the device's local clock to ensure streak consistency.
- **Large Lists**: Use `react-window` or CSS `content-visibility` for the Task Pool if >50 items.
