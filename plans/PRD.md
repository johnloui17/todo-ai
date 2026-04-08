# Product Requirement Document (PRD): TODO AI (Local-First)

**Version**: 1.2  
**Status**: Finalized (Discovery & Refinement Complete)  
**Author**: PRD Architect Agent  

## 1. Problem Statement
Users need a task management system that is as reliable as a local notebook (works 100% offline) but as powerful as a cloud-native AI assistant. Existing apps either fail without internet or lack high-performance, on-device AI capabilities for seamless task entry and dynamic organization.

## 2. Goals & Objectives
- **Offline-First Excellence**: Zero-latency UI using a local database (SQLite WASM via OPFS).
- **Scalable Architecture**: A "Local-First" sync engine (PowerSync) ready for multi-device synchronization and future public scale.
- **AI-Powered Entry**: Agentic OCR to convert screenshots into structured, auto-categorized tasks locally using WebGPU.
- **Dynamic Task Management**: Flexible category CRUD, nested subtasks (1 level depth), and a "Pool-to-Category" workflow.
- **Dual-Mode Task Tracking**: Support for both traditional "To-Do" tasks and "Not-To-Do" lists to help users avoid bad habits and stay focused.

## 3. User Stories

### Core Functionality & Hierarchy
- **AS A** user, **I WANT TO** add, edit, and mark tasks as complete while offline.
- **AS A** user, **I WANT TO** create subtasks under a main task (1 level deep), **SO THAT** I can break down goals.
- **AS A** user, **I WANT** completing all subtasks to automatically mark the parent task as complete (Optional toggle).
- **AS A** user, **I WANT** my data to automatically sync to the cloud when internet returns.

### Not-Todo List (Avoidance Tracking)
- **AS A** user, **I WANT TO** create a "Not-Todo" item, **SO THAT** I can explicitly list behaviors I want to avoid (e.g., "Don't check social media before 10 AM").
- **AS A** user, **I WANT** "Not-Todo" items to be visually distinct from regular tasks (e.g., red-themed or strike-through-ready), **SO THAT** I don't confuse them.
- **AS A** user, **I WANT TO** mark a "Not-Todo" item as "Successfully Avoided" or "Failed" for the day, **SO THAT** I can track my discipline.
- **AS A** user, **I WANT** to see a streak counter for "Not-Todo" items to stay motivated.

### Dynamic Category Management
- **AS A** user, **I WANT TO** add, rename, or remove categories (minimum 4 to start).
- **AS A** user, **I WANT TO** see a progress indicator (percentage and bar) for each category, calculated based on the ratio of completed vs. total tasks (including subtask weights).
- **AS A** user, **I WANT TO** delete a category and choose to either delete its tasks or move them back to the Pool.

### Task Pool (The Backlog)
- **AS A** user, **I WANT TO** dump tasks into a "Task Pool".
- **AS A** user, **I WANT TO** move tasks from the Pool into a specific Category, removing them from the Pool view.
- **AS A** user, **I WANT TO** delete the entire Task Pool to start fresh.

### AI Screenshot-to-Task
- **AS A** user, **I WANT TO** upload a screenshot for the AI to extract tasks and suggest categories.
- **AS A** user, **I WANT** the AI to fall back to a lightweight regex/cloud extraction if my device doesn't support WebGPU.

### Data Ownership & Auth
- **AS A** user, **I WANT TO** export my data as JSON/CSV, **SO THAT** I truly own my data.
- **AS A** user, **I WANT** to sign in using my **Google Account**, **SO THAT** my tasks are securely synced and I don't have to manage another password.

## 4. Technical Specification (2026 "Golden Stack")
- **Frontend**: Next.js 16 (React 19) + Tailwind CSS v4.
- **Local Database**: SQLite (WASM) via Origin Private File System (OPFS).
- **Sync Engine**: PowerSync (Postgres backend).
- **Conflict Resolution**: "Last Write Wins" (LWW) for MVP; Architected for CRDT migration in future.
- **On-Device AI**: Transformers.js v3 + WebGPU.
    - *Fallback*: Server-side inference if `navigator.gpu` is undefined.
- **Auth**: **Google OAuth** via Supabase Auth or Clerk (Integrated with PowerSync Row-Level Security).
- **Deployment**: PWA (Progressive Web App).

## 5. Success Metrics
- **Performance**: <50ms interaction latency.
- **AI Accuracy**: >90% extraction and >80% correct auto-categorization.
- **Data Integrity**: 0% data loss during offline/online toggling.

## 6. Architecture & Data Flow
1. **Schema**: 
    - `Categories` (id, name, color, created_at)
    - `Tasks` (id, category_id [nullable], title, status, type, created_at)
        - `type`: `'todo' | 'not_todo'`
        - `status`: `'pending' | 'completed' | 'avoided' | 'failed'`
    - `Subtasks` (id, task_id, title, status, created_at)
2. **The Pool**: A view where `category_id IS NULL` and `type = 'todo'`.
3. **Progress Logic**: 
    - **Todo Progress**: `(SUM(Tasks.completed) + SUM(Subtasks.completed)) / (COUNT(Tasks) + COUNT(Subtasks))`
    - **Not-Todo Success Rate**: `SUM(Tasks.avoided) / (SUM(Tasks.avoided) + SUM(Tasks.failed))` (tracked per item/day).
