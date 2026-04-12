# Manual Test Plan: TODO AI (MVP)

This document provides a suite of manual test cases to verify the core functionalities of the TODO AI application. Use this to ensure the app is bug-free and meets the requirements defined in the PRD.

---

## 1. Dashboard & Categories
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 1.1 | Category Display | Open the app Home page. | Categories created (e.g., via Sample Data) should appear as cards. |
| 1.2 | Progress Calculation | Add a task to a category and mark it complete. | The circular progress ring on the Category Card should increase. |
| 1.3 | Recent Tasks | Add a new task via the FAB. | The task should immediately appear in the "Recent Tasks" section on the Dashboard. |
| 1.4 | Category Navigation | Tap on a Category Card. | Should navigate to the Category Detail page showing only tasks for that category. |

## 2. Task Management (To-Dos)
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 2.1 | Manual Addition | Tap FAB -> Quick Entry -> Type title -> Save. | Modal closes, task appears in Recent Tasks or the designated category. |
| 2.2 | Completion Toggle | Tap the checkbox next to a task. | Checkbox fills emerald, text becomes struck-through and grayed out. |
| 2.3 | Swipe to Delete | Swipe a task item to the left. | Red trash icon is revealed. Swiping far enough should delete the task. |
| 2.4 | Subtask Progress | Inside Category Detail, view a task with subtasks (e.g., in Sample Data). | Toggling subtasks should update the mini-progress bar on the parent task. |
| 2.5 | Filtering | On Category/Pool page, toggle 'Active' or 'Completed' filters. | The list should update to show only tasks matching the selected status. |

## 3. Task Pool (The Backlog)
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 3.1 | Unassigned Triage | Create a task without selecting a category. | Task should appear in the "Task Pool" page under "Unassigned". |
| 3.2 | Pool Filtering | Toggle status filters in the Task Pool. | Works identically to the Category Detail filtering. |

## 4. Not-Todo System
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 4.1 | Avoidance Logging | Go to Not-Todos page. Tap "Avoided" on an item. | Card turns emerald, status is saved for today. |
| 4.2 | Failure Logging | Tap "Failed" on a Not-Todo item. | Card turns gray/muted, streak should logically reset or stop incrementing. |
| 4.3 | Streak Display | Check the fire (🔥) icon on a Not-Todo item. | Should display the number of consecutive days avoided (verified via Sample Data). |

## 5. AI Scan (Simulated)
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 5.1 | Scan Animation | Tap FAB -> Tap Scan (Camera) icon -> Select any image. | "AI Scanning..." overlay with spinner appears for 2 seconds. |
| 5.2 | Modal Pre-fill | Wait for scan to finish. | Quick Entry modal should open automatically after the scanning simulation. |

## 6. Settings & Data
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 6.1 | Dark Mode Toggle | Go to Settings -> Toggle Dark Mode. | Entire app theme switches between light and dark instantly. |
| 6.2 | Theme Persistence | Toggle Dark Mode -> Reload the page. | The chosen theme should persist after refresh. |
| 6.3 | Sample Data | Tap "Create Sample Data" in Settings. | Alert "Sample data created!" appears. Dashboard and Not-Todos populate with items. |
| 6.4 | Clear All Data | Tap "Clear All Data" -> Confirm. | App reloads. All categories, tasks, and history are wiped (Dashboard should show "No categories yet"). |

## 7. Local-First (Persistence)
| ID | Test Case | Steps | Expected Result |
|:---|:---|:---|:---|
| 7.1 | SQLite Persistence | Add several tasks -> Close browser tab -> Reopen app. | All tasks and categories should still be there (loaded from local SQLite). |
| 7.2 | Offline Mode | Turn off Wi-Fi -> Add a task -> Mark another as complete. | App should work perfectly without errors. Changes should be saved to local DB. |
