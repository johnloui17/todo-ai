# Design Specification: TODO AI (Local-First)

**Based on PRD v1.2**

## 1. Design Philosophy
- **Mobile-First PWA:** The application is optimized for mobile touch interactions with a native-app feel, fast loading, and robust offline capabilities.
- **Minimalist & Focused:** Typography and whitespace drive the hierarchy, avoiding unnecessary borders or heavy shadows.
- **Color Coded Context:** Distinct visual styling for Regular Tasks (productive/neutral tones) vs. Not-Todos (warning/red tones).

## 2. Visual Language & Theming (Tailwind v4)

### Color Palette
- **Background:** Minimalist white (`#FFFFFF`) for light mode, deep gray (`#121212`) for dark mode.
- **Primary Accent:** Indigo or Blue (e.g., `text-indigo-600`) for regular tasks and primary actions.
- **Not-Todo Accent:** Crimson or Red (e.g., `text-red-500`, `bg-red-50`) to indicate avoidance.
- **Success:** Emerald Green for completed tasks and avoided Not-Todos.
- **Surface:** Slightly off-background colors for cards and pool items (`bg-zinc-50` / `bg-zinc-900`).

### Typography
- **Headings & Body:** System Sans-Serif (`font-sans`) for optimal performance and native feel (Inter, SF Pro, Roboto).
- **Weights:** Heavy use of Medium (500) and SemiBold (600) for task titles; Regular (400) for subtasks and metadata.

## 3. UI Architecture & Navigation

### Core Navigation (Bottom Navigation Bar)
As a mobile-first PWA, the primary navigation relies on a sticky bottom tab bar:
1. **Home (Categories):** Dashboard view of all categories with their respective progress rings.
2. **Pool (Backlog):** The landing zone for unassigned tasks. Draggable interface to assign to categories.
3. **Not-Todos:** A dedicated view isolated from regular tasks to focus on daily avoidance habits and streaks.
4. **Settings:** Profile, local DB status, manual cloud sync, and data export.

### Floating Action Button (FAB)
- Prominently placed above the bottom nav on the Home and Pool screens.
- **Primary Action:** Opens a quick-entry text modal (with keyboard auto-focus).
- **Secondary Action (Long Press / Dedicated Icon):** Opens the Camera/Gallery for AI Screenshot extraction.

## 4. Key Component Specifications

### 1. `CategoryCard`
- **Visual:** A rounded surface card (`rounded-2xl`, subtle shadow).
- **Content:** Category Icon/Emoji, Title, and a Circular Progress Indicator showing completion percentage (incorporating subtask weights).
- **Interaction:** Tap to open the full Category View (list of tasks).

### 2. `TaskItem` (Regular)
- **Visual:** Clean list item with a leading checkbox.
- **Content:** Title. If subtasks exist, an expand/collapse chevron is shown alongside a mini progress bar for the subtasks.
- **Interaction:** Tap checkbox to toggle status. Swipe left to reveal a "Delete" action. Swipe right to reveal a "Move to Pool" action.

### 3. `NotTodoItem`
- **Visual:** Styled with subtle red accents to differentiate from regular tasks.
- **Content:** Title (the habit to avoid), current Streak count (🔥 Flame icon), and today's status.
- **Interaction:** Two large touch targets for daily logging: "Avoided" (Success/Green) and "Failed" (Reset/Red).

### 4. `TaskPoolManager`
- **Visual:** A vertical list view of unassigned tasks.
- **Interaction:** Users can drag a task item and drop it into a compact, horizontally scrolling list of Categories pinned at the top of the screen. Alternatively, a tap opens a "Categorize" bottom sheet.

## 5. State Management & Data Architecture

### Local-First Data Binding
- **Architecture:** Drizzle Live Queries.
- **Flow:** The React UI will directly subscribe to the local SQLite (WASM) database.
- **Benefits:** Eliminates the need for complex global state stores (like Zustand or Redux) for entity data. When a task is updated in SQLite, the React components using live queries will automatically re-render with the latest state, ensuring a highly reactive offline experience.
- **Sync Engine:** PowerSync runs continuously in a Web Worker, syncing the local SQLite changes to the Postgres backend via its replication protocol without blocking the main UI thread.

## 6. AI Integration Flow (Screenshot-to-Task)

1. **Capture:** User taps the "AI Scan" icon in the FAB.
2. **Processing State:** A lightweight skeleton or pulsing scanner overlay appears over the app.
3. **Inference (WebGPU):** Transformers.js processes the image entirely on-device.
4. **Review Modal:** The extracted text is presented in a structured form:
   - Extracted Task Title (Editable input)
   - Suggested Category (Dropdown, auto-selected based on AI classification logic)
5. **Confirmation:** User taps "Save". The application inserts the validated task into SQLite via Drizzle, which immediately updates the UI.
