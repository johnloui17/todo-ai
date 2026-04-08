# Project Context: TODO AI

## Current State
- **Branch**: `feature/phase2-data-model`
- **Phase**: Phase 2 (Data Model & Storage)
- **Connected Repo**: `https://github.com/johnloui17/todo-ai.git` (Target: `master`)

## Architectural Decisions
- **Framework**: Next.js 16 (PWA) / Expo (Targeting mobile-first web initially).
- **Database**: SQLite (WASM) + Drizzle ORM (Local-First).
- **Sync Engine**: PowerSync (Local-First sync).
- **AI**: Transformers.js + WebGPU for local OCR/Categorization.
- **Methodology**: Test-Driven Development (TDD).
- **Workflow**: Phased implementation via feature branches and Pull Requests to `master`.

## Roadmap
See [plans/PRD.md](./plans/PRD.md) for the master requirements and [plans/roadmap.md](./plans/roadmap.md) for detailed phases.

## Phase 2 Progress
- [x] Define Task, Subtask, and Category schemas (Drizzle ORM).
- [x] Implement extended Task status and type fields.
- [x] Implement PowerSync schema and connection logic.
- [ ] Verify database initialization in App entry point.
- [ ] Implement TDD tests for basic CRUD operations.
