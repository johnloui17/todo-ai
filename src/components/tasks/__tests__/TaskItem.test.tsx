import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import TaskItem, { Task, Subtask } from '../TaskItem';

const mockTask: Task = {
  id: 'task-1',
  title: 'Test Task',
  status: 'pending',
  type: 'todo',
};

const mockSubtasks: Subtask[] = [
  { id: 'sub-1', title: 'Subtask 1', status: 'pending' },
  { id: 'sub-2', title: 'Subtask 2', status: 'completed' },
];

test('TaskItem renders the task title', () => {
  render(<TaskItem task={mockTask} />);
  expect(screen.getByText('Test Task')).toBeDefined();
});

test('TaskItem shows progress indicator when subtasks are present', () => {
  render(<TaskItem task={mockTask} subtasks={mockSubtasks} />);
  
  // Progress text should show "1/2"
  expect(screen.getByText('1/2')).toBeDefined();
  expect(screen.getByTestId('task-progress')).toBeDefined();
});

test('TaskItem expands and shows subtasks when clicked', async () => {
  render(<TaskItem task={mockTask} subtasks={mockSubtasks} />);
  
  // Initially subtasks should not be visible (AnimatePresence/motion handling)
  expect(screen.queryByTestId('subtask-list')).toBeNull();
  
  // Click the main row to expand
  const mainRow = screen.getByTestId('task-item-main');
  fireEvent.click(mainRow);
  
  // Now subtasks should be visible
  expect(screen.getByTestId('subtask-list')).toBeDefined();
  expect(screen.getByText('Subtask 1')).toBeDefined();
  expect(screen.getByText('Subtask 2')).toBeDefined();
});

test('TaskItem calls onToggle when checkbox is clicked', () => {
  const onToggle = vi.fn();
  render(<TaskItem task={mockTask} onToggle={onToggle} />);
  
  const checkbox = screen.getByTestId('task-checkbox');
  fireEvent.click(checkbox);
  
  expect(onToggle).toHaveBeenCalledWith('task-1');
});
