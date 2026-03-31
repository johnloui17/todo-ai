# TODO App Roadmap (TDD Approach)

This document outlines the development phases for the AI-powered TODO application. Requirements are defined in the [Master PRD](./PRD.md).

## Core Mandates
- **TDD Workflow**: Every feature starts with a test.
- **Branching Strategy**: Each phase/feature is developed in a separate `feature/` branch.
- **Pull Requests**: Changes are pushed to `main` via PRs only.

## Phase 1: Project Initialization & Environment Setup
- [ ] Initialize Next.js project with Tailwind v4.
- [ ] Set up Google OAuth (Supabase/Clerk).
- [ ] Set up testing framework (Vitest & Testing Library).
- [ ] Configure linting and code style.
- [ ] Create basic folder structure.

## Phase 2: Core Data Model & Storage
- [ ] Define Task, Subtask, and Category schemas.
- [ ] Implement `SQLite` (Local-First) schema with `Drizzle ORM`.
- [ ] Implement `PowerSync` connection logic.

## Phase 3: Basic UI Component Implementation
- [ ] Create `CategoryManager` component with progress bars (TDD).
- [ ] Create `TaskItem` with Subtask support (TDD).
- [ ] Create `TaskPool` selection interface (TDD).

## Phase 4: Feature Integration & State Management
- [ ] Implement Task addition logic.
- [ ] Implement Task completion toggle.
- [ ] Implement Task deletion.
- [ ] Verify all features with integration tests.

## Phase 5: Advanced Features & Polish
- [ ] Add task filtering (All, Active, Completed).
- [ ] Implement rich styling and dark mode support.
- [ ] Final end-to-end verification.
