# Project Context: TODO AI

## Current State
- **Branch**: `feature/phase5-polish`
- **Phase**: Phase 5 (Advanced Features & Polish) - COMPLETED
- **Connected Repo**: `https://github.com/johnloui17/todo-ai.git` (Target: `main`)

## Architectural Decisions
- **Framework**: Next.js 16 (PWA) / Expo (Targeting mobile-first web initially).
- **Database**: SQLite (WASM) + Drizzle ORM (Local-First).
- **Sync Engine**: PowerSync (Local-First sync).
- **AI**: Transformers.js + WebGPU for local OCR/Categorization.
- **Methodology**: Test-Driven Development (TDD).
- **Workflow**: Phased implementation via feature branches and Pull Requests to `main`.

## Roadmap
See [plans/PRD.md](./plans/PRD.md) for the master requirements and [plans/roadmap.md](./plans/roadmap.md) for detailed phases.

## Phase 5 Highlights
- **Task Filtering**: Status-based filtering (All, Active, Completed) on Category and Pool pages.
- **Dark Mode**: Comprehensive dark mode support with a native toggle in Settings.
- **AI Triage**: Simulated AI Screenshot scanning with processing states.
- **Data Management**: "Clear All Data" functionality for local testing and privacy.
- **UX Refinement**: Improved animations, empty states, and loading skeletons.
