# Stitch Design: Screen & Component Mapping

This document bridges the PRD (v1.2) and Design Specification into a concrete, implementation-ready screen architecture. It details the view hierarchy, component composition, and data bindings for the Todo AI PWA.

## 1. App Shell & Global Layout

The App Shell provides the persistent layout framing the entire application experience.

**Components:**
- `AppLayout`: The root container, managing safe areas for mobile and the overall `min-h-screen`.
- `BottomNavBar`: Sticky navigation at the bottom (`fixed bottom-0 w-full`).
  - **Tabs:** Home (Categories), Pool, Not-Todos, Settings.
- `GlobalFAB`: Floating Action Button positioned above the `BottomNavBar` on relevant screens. Handles manual text entry (tap) and AI Screenshot (long-press/secondary icon).
- `OfflineIndicator`: A subtle toast or header banner indicating sync status (Online, Offline, Syncing).

## 2. Screen: Home (Categories Dashboard)

The primary landing screen displaying an overview of all task categories and their progress.

**Route:** `/` or `/home`
**Layout Type:** Grid/List

**Components & Data Mapping:**
- `Header`: Title "Dashboard" or "Categories".
- `CategoryGrid`: A responsive grid (`grid-cols-2` or `grid-cols-1` depending on screen size).
  - Iterates over `SELECT * FROM Categories`.
- `CategoryCard` (Child of Grid):
  - **Data:** `Category` object.
  - **UI Bindings:**
    - Icon/Color: `Category.color` / `Category.name` (parsed emoji).
    - Title: `Category.name`.
    - Progress Ring: Calculated using PRD Logic `(SUM(Tasks.completed) + SUM(Subtasks.completed)) / (COUNT(Tasks) + COUNT(Subtasks))` scoped to `category_id`.
  - **Interactions:** Tap navigates to `CategoryDetailScreen`.

## 3. Screen: Category Detail

Shows the list of regular tasks within a specific category.

**Route:** `/category/[id]`
**Layout Type:** Vertical List

**Components & Data Mapping:**
- `CategoryHeader`: Sticky header with "Back" button, Category Name, and overall progress.
- `TaskList`: Vertical list of tasks.
  - Queries: `SELECT * FROM Tasks WHERE category_id = [id] AND type = 'todo' ORDER BY created_at DESC`.
- `TaskItem`:
  - **UI Bindings:**
    - Checkbox: Bound to `Tasks.status` ('pending' vs 'completed').
    - Title: `Tasks.title`.
    - Subtask Chevron: Shows if `COUNT(Subtasks) > 0`.
  - **Interactions:**
    - Tap checkbox: Toggles `Tasks.status`.
    - Swipe Left: Delete action.
    - Swipe Right: Remove `category_id` (moves back to Pool).
- `SubtaskList` (Collapsible under `TaskItem`):
  - Iterates `Subtasks` where `task_id = [parent_id]`.
- `InlineTaskInput`: A simple input at the bottom or top of the list for quick additions specific to this category.

## 4. Screen: The Pool (Backlog)

The triage center for unassigned tasks.

**Route:** `/pool`
**Layout Type:** Vertical List with Drop Zones

**Components & Data Mapping:**
- `Header`: Title "Task Pool". Action: "Clear Pool".
- `CategoryDropZone` (Pinned at top): Horizontal scrolling list of mini-category chips.
  - Acts as targets for drag-and-drop.
- `PoolList`: Vertical list of unassigned tasks.
  - Queries: `SELECT * FROM Tasks WHERE category_id IS NULL AND type = 'todo'`.
- `TaskItem` (Reusable):
  - Similar to Category Detail, but swipe right might open a "Move to Category" bottom sheet instead, or act as the draggable element.
- **Interaction Flow (Categorization):** Drag a `TaskItem` and drop it onto a `CategoryDropZone` chip -> Updates `Tasks.category_id` in SQLite -> Drizzle Live Query auto-removes it from `PoolList`.

## 5. Screen: Not-Todos (Avoidance Tracking)

A focused, distinct view for habit avoidance.

**Route:** `/not-todos`
**Layout Type:** Vertical List

**Components & Data Mapping:**
- `Header`: Title "Not-Todos" (Red themed).
- `NotTodoList`:
  - Queries: `SELECT * FROM Tasks WHERE type = 'not_todo'`.
- `NotTodoItem`:
  - **UI Bindings:**
    - Title: `Tasks.title` (styled with red accents).
    - Streak Counter: Calculated derived state or separate streak table logic based on daily success.
    - Status Buttons: "Avoided" (Green check) and "Failed" (Red X) mapped to `Tasks.status`.
  - **Interactions:** Tapping a status updates the database for the current day and updates the streak UI.

## 6. Screen: Settings & Profile

**Route:** `/settings`
**Layout Type:** Form / List

**Components & Data Mapping:**
- `AuthSection`: "Sign in with Google" button or current user profile info (integrating Supabase/Clerk).
- `SyncStatus`: Displays PowerSync connection state and last sync time.
- `DataManagement`: Buttons to "Export Data (JSON/CSV)" and "Delete All Data".

## 7. Global Modals & Overlays

### Quick Entry Modal
- Triggered by FAB tap.
- Input field with an explicit toggle for "Todo" vs "Not-Todo".
- Optional: Category selector dropdown.

### AI Scan Overlay & Review Modal
- Triggered by FAB long-press.
- **View 1 (Scanner):** Camera view or image picker with a scanning animation.
- **View 2 (Review):**
  - Form showing extracted `Title` and suggested `Category`.
  - User validates and taps "Save" -> Inserts into DB.
