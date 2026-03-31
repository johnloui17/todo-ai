# Product Requirement Document (PRD): TODO AI (Local-First)

**Version**: 1.1  
**Status**: Finalized (Discovery Complete)  
**Author**: PRD Architect Agent  

## 1. Problem Statement
Users need a task management system that is as reliable as a local notebook (works 100% offline) but as powerful as a cloud-native AI assistant. Existing apps either fail without internet or lack high-performance, on-device AI capabilities for seamless task entry and dynamic organization.

## 2. Goals & Objectives
- **Offline-First Excellence**: Zero-latency UI using a local database (SQLite WASM).
- **Scalable Architecture**: A "Local-First" sync engine ready for public scale.
- **AI-Powered Entry**: Agentic OCR to convert screenshots into structured, auto-categorized tasks locally using WebGPU.
- **Dynamic Task Management**: Flexible category CRUD and a "Pool-to-Category" workflow.

## 3. User Stories

### Core Functionality & Hierarchy
- **AS A** user, **I WANT TO** add, edit, and mark tasks as complete while offline.
- **AS A** user, **I WANT TO** create subtasks under a main task, **SO THAT** I can break down complex goals into manageable steps.
- **AS A** user, **I WANT** my data to automatically sync to the cloud when internet returns.

### Dynamic Category Management
- **AS A** user, **I WANT TO** add, rename, or remove categories (minimum 4 to start), **SO THAT** the app adapts to my specific life domains.
- **AS A** user, **I WANT TO** see a progress indicator (percentage or progress bar) for each category, **SO THAT** I can quickly visualize how much work is remaining in each domain.
- **AS A** user, **I WANT TO** delete a category and choose what happens to its tasks (e.g., move back to Pool or delete).

### Task Pool (The Backlog)
- **AS A** user, **I WANT TO** build a "Task Pool" of ideas and upcoming items.
- **AS A** user, **I WANT TO** move tasks from the Pool into a specific Category, **SO THAT** they are removed from the Pool view and prioritized.
- **AS A** user, **I WANT TO** delete the entire Task Pool if needed, **SO THAT** I can start fresh.

### AI Screenshot-to-Task
- **AS A** user, **I WANT TO** upload a screenshot, **SO THAT** the AI extracts tasks AND suggests appropriate categories for them automatically.
- **AS A** user, **I WANT TO** review the AI's suggestions before they are committed to my categories or Pool.

## 4. Technical Specification (2026 "Golden Stack")
- **Frontend**: Next.js 16 (React 19) + Tailwind CSS v4.
- **Local Database**: SQLite (WASM) via Origin Private File System (OPFS).
- **Sync Engine**: PowerSync (Postgres backend).
- **On-Device AI**: Transformers.js v3 + WebGPU.
    - *OCR Model*: DeepSeek OCR or similar.
    - *Classification*: Local SLM (Phi-3.5 Mini) for categorization.
- **Deployment**: PWA (Progressive Web App).

## 5. Success Metrics
- **Performance**: <50ms interaction latency.
- **Organization**: Users should be able to move 5 tasks from Pool to Category in <10 seconds.
- **AI Accuracy**: >90% extraction and >80% correct auto-categorization.

## 6. Architecture & Data Flow
1. **Schema**: `Categories` (1) -> `Tasks` (N) -> `Subtasks` (N).
2. **The Pool**: A specialized view of tasks where `category_id` is NULL or set to a reserved `POOL` ID.
3. **Selection Logic**: When a task is assigned a `category_id`, it is filtered out of the "Pool" view.
