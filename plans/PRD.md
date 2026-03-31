# Product Requirement Document (PRD): TODO AI (Local-First)

**Version**: 1.0  
**Status**: Draft (Discovery Loop 2)  
**Author**: PRD Architect Agent  

## 1. Problem Statement
Users need a task management system that is as reliable as a local notebook (works 100% offline) but as powerful as a cloud-native AI assistant. Existing apps either fail without internet or lack high-performance, on-device AI capabilities for seamless task entry.

## 2. Goals & Objectives
- **Offline-First Excellence**: Zero-latency UI using a local database (SQLite WASM).
- **Scalable Architecture**: A "Local-First" sync engine that can handle future public users and complex feature sets.
- **AI-Powered Entry**: Convert screenshots directly into structured tasks locally using WebGPU.
- **Dynamic Task Selection**: A workflow to pull tasks from a "Pool" into categorized execution lists.

## 3. User Stories (Iterative Discovery)

### Core Functionality
- **AS A** user, **I WANT TO** add, edit, and mark tasks as complete while offline, **SO THAT** my productivity is never interrupted by connectivity issues.
- **AS A** user, **I WANT** my data to automatically sync to the cloud when internet returns, **SO THAT** I don't lose data and can access it across devices.

### AI Screenshot-to-Task
- **AS A** user, **I WANT TO** upload or take a screenshot of a list (e.g., from a physical notebook or another app), **SO THAT** the AI can automatically extract and create individual TODO items for me.

### Task Pool & Categorization
- **AS A** user, **I WANT TO** maintain a "Task Pool" (Backlog), **SO THAT** I can dump ideas without cluttering my daily view.
- **AS A** user, **I WANT TO** select specific tasks from the pool and assign them to one of 4 categories:
    1. **Primary**: High-impact, non-negotiable tasks.
    2. **Secondary**: Important but non-urgent tasks.
    3. **Hobby**: Personal growth and leisure tasks.
    4. **[TO BE NAMED]**: (Suggested: "Quick Wins" or "Maintenance")
- **AS A** user, **I WANT** a clear visual distinction between these categories, **SO THAT** I can prioritize my day effectively.

## 4. Technical Specification (2026 "Golden Stack")
- **Frontend**: Next.js 16 (React 19) + Tailwind CSS v4.
- **Local Database**: SQLite (WASM) via Origin Private File System (OPFS).
- **Sync Engine**: PowerSync or ElectricSQL (Postgres backend).
- **On-Device AI**: Transformers.js v3 + WebGPU (Local OCR & Schema Extraction).
- **Deployment**: PWA (Progressive Web App) for direct browser "download" and mobile-first experience.

## 5. Success Metrics
- **Performance**: <50ms interaction latency for all local operations.
- **Reliability**: 100% data integrity during offline-to-online transitions.
- **AI Accuracy**: >90% accuracy in structured task extraction from screenshots.

---

## 6. Open Questions for User (Discovery Loop 2)
1. **The 4th Category**: What would you like to name the 4th category? (Suggestions: "Urgent/Firefight", "Admin", or "Backburner").
2. **Selection Logic**: When you select tasks from the "Pool" into categories, should they stay in the pool or be moved out?
3. **Screenshot Flow**: Should the AI automatically categorize the extracted tasks, or just dump them into the "Pool" for you to categorize manually?
