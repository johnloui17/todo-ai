import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import NotTodoItem from '../NotTodoItem';

const mockTask = {
  id: 'nt-1',
  title: 'Social Media',
  status: 'pending' as const,
  type: 'not_todo' as const,
};

test('NotTodoItem renders the task title', () => {
  render(<NotTodoItem task={mockTask} streak={5} />);
  expect(screen.getByText('Social Media')).toBeDefined();
});

test('NotTodoItem shows the streak count', () => {
  render(<NotTodoItem task={mockTask} streak={7} />);
  expect(screen.getByText('7')).toBeDefined();
});

test('NotTodoItem has avoidance and failure buttons', () => {
  render(<NotTodoItem task={mockTask} streak={3} />);
  expect(screen.getByText(/Avoided/i)).toBeDefined();
  expect(screen.getByText(/Failed/i)).toBeDefined();
});
