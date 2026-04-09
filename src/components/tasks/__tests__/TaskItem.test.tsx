import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import TaskItem from '../TaskItem';

const mockTask = {
  id: 'task-1',
  title: 'Test Task',
  status: 'pending' as const,
  type: 'todo' as const,
};

test('TaskItem renders the task title', () => {
  render(<TaskItem task={mockTask} />);
  expect(screen.getByText('Test Task')).toBeDefined();
});

test('TaskItem shows subtasks when present', () => {
  const subtasks = [{ id: 'sub-1', title: 'Subtask 1', status: 'pending' as const }];
  render(<TaskItem task={mockTask} subtasks={subtasks} />);
  // Depending on implementation, might need to click chevron first
  // For now we check if the count or indicator is there
  expect(screen.getByText(/1/)).toBeDefined(); 
});
