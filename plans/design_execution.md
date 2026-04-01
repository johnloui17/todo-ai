# Design Execution Plan: TODO AI (Stitch Framework Edition)

This document executes the design methodology for TODO AI, mapping PRD requirements to a functional, high-fidelity design system optimized for the **Stitch** (AI-native) workflow.

---

## PHASE 01: DISCOVERY & RESEARCH (Stitch Vibe)
**Core Design Goals**: Speed (Zero-latency), Data-Density (Progress-focused), Mobile-First (PWA), and Trust (Sync status).

### 1. User Personas
*   **Alex (The Inbox-Zero PM)**: Dumps 20+ tasks daily into the **Task Pool**. Needs rapid multi-select and categorization.
*   **Maya (The Visual Freelancer)**: Manages 5 distinct "Domains" (Categories). Relies on the **Category Progress Bars** for dopamine hits and tracking.
*   **David (The Analog Hybrid)**: Uses paper for notes. Needs the **AI Screenshot-to-Task** (WebGPU) to be 100% reliable and fast.

### 2. Competitor Audit (What to look for)
1.  **Things 3**: Gold standard for minimalist hierarchy and "Area" (Category) progress.
2.  **Todoist**: Fast entry and natural language parsing.
3.  **Linear**: High-performance interaction design and keyboard shortcuts (for PWA).
4.  **Any.do**: Screenshot/WhatsApp task capture flows.
5.  **Craft**: Exceptional subtask/nesting visual treatment.

### 3. Key User Journeys
- **Onboarding**: Google OAuth -> "Identify your 4 core domains" (Initial Category creation).
- **The "Dump"**: FAB (Floating Action Button) -> Rapid text entry -> Instant Pool update.
- **The "Sort"**: Pool view -> Multi-select tasks -> "Move to Category" menu.
- **The "Extraction"**: AI Hub -> Upload screenshot -> Review Extracted Tasks -> Map to Categories.

---

## PHASE 02: INFORMATION ARCHITECTURE & FLOWS

### 1. Sitemap & Navigation
*   **Layout**: **Bottom Tab Bar** (Home, Task Pool, AI Scan, Settings) with a central **[+] FAB**.
*   **Screens**:
    *   `Dashboard` (Root): Grid/List of Categories with Progress Indicators.
    *   `Category Detail`: Filtered view (Active/Completed) + Subtask nesting.
    *   `The Pool`: Uncategorized backlog (`category_id IS NULL`).
    *   `AI Review`: Staged screen for OCR verification before database commit.
    *   `Settings`: Export JSON/CSV, Sync Status (PowerSync), Google Account.

### 2. Content Hierarchy
1.  **Primary**: Category Progress (Visual feedback).
2.  **Secondary**: Active Task Titles & Status.
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
| [Cats] [Pool]  [ + ]  [AI] [Set]  |
+-----------------------------------+
```

---

## PHASE 04: DESIGN SYSTEM (Stitch Spec)
**Framework**: Next.js 16 + Tailwind v4 + **Stitch Component Mapping**.

### 1. Palette & Typography
- **Primary**: `Indigo-600` (#4F46E5) - Main CTA & Progress active state.
- **Surface**: `Slate-900` (#0F172A) - Dark-first default for battery efficiency.
- **Success**: `Emerald-500` (#10B981) - Completed states & 100% bars.
- **Font**: `Inter` (Variable). H1: 24px Semi-bold; Body: 16px; Small: 12px.

### 2. UI Components (Stitch Library)
- `CategoryCard`: Glassmorphic card with a 4px bottom progress border.
- `TaskItem`: Swipe-to-Action (Left: Delete, Right: Move to Pool).
- `SubtaskItem`: 16px indented list item with a connecting vertical line.
- `ProgressBar`: Animated SVG line that pulses when a category updates.

---

## PHASE 05: INTERACTIONS & MOTION

1.  **Optimistic Completion**: Checkbox marks instantly; Progress bar updates *before* SQLite/PowerSync confirmation.
2.  **AI Reading State**: Skeleton loader items with a "Scanning..." shimmer overlay on the uploaded screenshot.
3.  **The "Sweep"**: When a category is 100% completed, a subtle confetti/shimmer effect plays on the `CategoryCard`.
4.  **Navigation Transitions**: Lateral slide between tabs to maintain context.

---

## PHASE 06: DEV HANDOFF & EDGE CASES

### 1. Component Specs
- `TaskItem` Props: `id: string`, `title: string`, `status: 'active'|'done'`, `subtasks: Subtask[]`.
- `Category` Logic: Progress = `(Tasks[Done] + Subtasks[Done]) / (Total Tasks + Total Subtasks)`.

### 2. Edge Case Handling
- **Offline State**: "You are working locally" persistent banner if `navigator.onLine` is false.
- **Empty States**: "Your Pool is empty. Time to relax!" illustrations.
- **Large Lists**: Use `react-window` or CSS `content-visibility` for the Task Pool if >50 items.
