# Design Execution Plan: TODO AI (Local-First)

This document executes the design methodology defined in [design.md](./design.md) against the requirements in [PRD.md](./PRD.md).

## PHASE 01: DISCOVERY & RESEARCH

### 1. User Personas
*   **The "Inbox Zero" Enthusiast (Alex, 28, PM)**: Alex dumps everything into the **Task Pool** throughout the day. Needs ultra-fast sorting from Pool to Categories in the evening. *Tech Literacy: High.*
*   **The "Visual Goal-Setter" (Maya, 34, Freelancer)**: Manages 4+ distinct life domains. Relies on **Progress Bars** to feel a sense of accomplishment. *Tech Literacy: Medium.*
*   **The "Paper-to-Digital" Converter (David, 45, Small Biz Owner)**: Writes notes on paper then takes **Screenshots** to import. Needs the AI OCR to be seamless and reliable. *Tech Literacy: Low/Medium.*

### 2. Design Goals
*   **Speed**: Zero-latency perception. Optimistic UI for every click.
*   **Trust-Building**: Visual cues indicating "Local-Only" or "Synced" status.
*   **Mobile-First**: Large touch targets for the PWA experience.

### 3. Key User Journeys
1.  **First Launch**: Google Auth -> Initial 4 Categories Setup.
2.  **The "Dumping" Flow**: Adding 10+ items to the Pool rapidly.
3.  **The "Sorting" Flow**: Moving tasks from Pool to "Work" or "Personal" categories.
4.  **The "Capture" Flow**: Uploading a screenshot -> Reviewing AI Extraction -> Committing to Tasks.

---

## PHASE 02: INFORMATION ARCHITECTURE

### 1. Sitemap
*   **Root**: `/` (Dashboard / Categories Overview)
*   **The Pool**: `/pool` (Backlog of uncategorized tasks)
*   **Category Detail**: `/category/[id]` (Tasks/Subtasks within a category)
*   **AI Import**: `/import/ai-review` (Modal/Screen for OCR review)
*   **Settings**: `/settings` (Google Auth, JSON Export, Theme)

### 2. Navigation Pattern
*   **Bottom Tab Bar**: (Categories | Task Pool | Add Task [+] | AI Import | Settings).
*   **Reasoning**: Optimal for thumb-reach on mobile PWA; follows familiar iOS/Android patterns.

---

## PHASE 03: WIREFRAMING (LO-FI)

### 1. Dashboard (Categories View)
```text
+-----------------------------------+
|  [Logo] Sync: (OK)      [User Icon]|
+-----------------------------------+
|  MY DOMAINS                       |
|                                   |
|  [ Work          [========] 65% ] |
|  [ Home          [====    ] 30% ] |
|  [ Health        [==========]100%]|
|  [ Side Project  [          ] 0%  ] |
|                                   |
|  + Add New Category               |
+-----------------------------------+
| [Cats] [Pool]  [ + ]  [AI] [Set]  |
+-----------------------------------+
```

### 2. The Pool (Backlog)
*   **Layout**: Simple vertical list of cards.
*   **Action**: Swipe Right to "Categorize", Swipe Left to "Delete".
*   **Primary CTA**: Floating Action Button (FAB) for "Quick Add to Pool".

---

## PHASE 04: DESIGN SYSTEM SETUP

### 1. Color Palette (Next.js + Tailwind v4)
*   **Primary (Brand)**: `#4F46E5` (Indigo 600)
*   **Background**: `#0F172A` (Slate 900) - *Dark-first default*
*   **Surface**: `#1E293B` (Slate 800)
*   **Success (Progress)**: `#10B981` (Emerald 500)
*   **Text**: High Contrast `#F8FAFC` (Slate 50)

### 2. Typography
*   **Font Family**: `Inter` or `Geist` (Modern, readable).
*   **Scale**: Base 16px. H1: 32px, Body: 16px, Caption: 12px.

---

## PHASE 05: HI-FI MOCKUPS & INTERACTIONS

### 1. Zero-Latency Feedback
*   **Micro-interactions**: 
    *   Checkbox toggle: Instant visual "check" + haptic-simulated CSS scale pop.
    *   Pool-to-Category: Card "flies" into the category tab icon.
*   **Skeleton Loaders**: Used only for initial PowerSync hydration on first load.

---

## PHASE 06: DEV HANDOFF SPECS

### 1. Component Priority
1.  `ProgressBar`: Reusable SVG ring/bar with `framer-motion` for transitions.
2.  `TaskCard`: Supports swipe gestures and subtask dropdown.
3.  `AIPreview`: Split-view component for OCR review.

### 2. Edge Cases
*   **Offline Indicator**: Subtle "Offline Mode" toast that appears when `navigator.onLine` is false.
*   **Large Lists**: Virtualized lists for the Task Pool if >100 items.
