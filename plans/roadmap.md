# TODO App Roadmap (TDD Approach)

This document outlines the development phases for the AI-powered TODO application. Requirements are defined in the [Master PRD](./PRD.md).

## Core Mandates
- **TDD Workflow**: Every feature starts with a test.
- **Branching Strategy**: Each phase/feature is developed in a separate `feature/` branch.
- **Pull Requests**: Changes are pushed to `main` via PRs only.

## Phase 1: Project Initialization & Environment Setup
- [x] Initialize Next.js project with Tailwind v4.
- [ ] Set up Google OAuth (Supabase/Clerk).
- [x] Set up testing framework (Vitest & Testing Library).
- [ ] Configure linting and code style.
- [x] Create basic folder structure.

## Phase 2: Core Data Model & Storage
- [x] Define Task, Subtask, and Category schemas.
- [x] Add `type` (todo/not_todo) and extended status fields to Task schema.
- [x] Implement `SQLite` (Local-First) schema with `Drizzle ORM`.
- [x] Implement `PowerSync` connection logic.

## Phase 3: Basic UI Component Implementation
- [x] Create `CategoryManager` component with progress bars (TDD).
- [x] Create `TaskItem` with Subtask support (TDD).
- [x] Create `NotTodoItem` with avoidance toggle and streak counter (TDD).
- [x] Create `TaskPool` selection interface (TDD).

## Phase 4: Feature Integration & State Management
- [x] Implement Task addition logic (Todo vs Not-Todo).
- [x] Implement Task completion/avoidance toggle.
- [x] Implement Task deletion.
- [x] Implement daily reset/tracking for Not-Todo items.
- [x] Verify all features with integration tests.

## Phase 5: Advanced Features & Polish
- [ ] Add task filtering (All, Active, Completed, Not-Todo).
- [ ] Implement rich styling and dark mode support.
- [ ] Final end-to-end verification.
