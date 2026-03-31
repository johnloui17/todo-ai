# TODO App Roadmap (TDD Approach)

This document outlines the development phases for the AI-powered TODO application using Expo and React Native.

## Core Mandates
- **TDD Workflow**: Every feature starts with a test.
- **Branching Strategy**: Each phase/feature is developed in a separate `feature/` branch.
- **Pull Requests**: Changes are pushed to `master` via PRs only.
- **No Deletion**: Files must never be deleted.

## Phase 1: Project Initialization & Environment Setup
- [ ] Initialize Expo project (`npx create-expo-app@latest .`).
- [ ] Set up testing framework (Jest & React Native Testing Library).
- [ ] Configure linting and code style.
- [ ] Create basic folder structure.

## Phase 2: Core Data Model & Storage
- [ ] Define Task data interface.
- [ ] Implement `AsyncStorage` helper functions with unit tests.
- [ ] Test persistence and retrieval logic.

## Phase 3: Basic UI Component Implementation
- [ ] Create `TaskItem` component (TDD).
- [ ] Create `TaskList` component (TDD).
- [ ] Create `AddTask` input component (TDD).

## Phase 4: Feature Integration & State Management
- [ ] Implement Task addition logic.
- [ ] Implement Task completion toggle.
- [ ] Implement Task deletion.
- [ ] Verify all features with integration tests.

## Phase 5: Advanced Features & Polish
- [ ] Add task filtering (All, Active, Completed).
- [ ] Implement rich styling and dark mode support.
- [ ] Final end-to-end verification.
