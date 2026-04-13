# Project Context: TODO AI

## Current State
- **Branch**: `master`
- **Phase**: Phase 6 (AI Integration, Auth & Sync) - IN PROGRESS
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

## Phase 6 Objectives
- **AI Integration**: Implement real OCR and task categorization using Transformers.js.
- **Auth**: Set up Google OAuth (Supabase/Clerk).
- **Cloud Sync**: Connect PowerSync to a live backend.
- **Data Export**: Implement JSON/CSV export for data ownership.

## Phase 5 Completed
- **Task Filtering**: Status-based filtering (All, Active, Completed) on Category and Pool pages.
- **Dark Mode**: Comprehensive dark mode support with a native toggle in Settings.
- **AI Triage (Simulated)**: AI Screenshot scanning with processing states.
- **Data Management**: "Clear All Data" functionality for local testing and privacy.
- **UX Refinement**: Improved animations, empty states, and loading skeletons.
