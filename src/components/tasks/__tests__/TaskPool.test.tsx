import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import TaskPool from '@/app/pool/page'; // TaskPool is currently implemented as the pool page

test('TaskPool renders unassigned tasks', () => {
  render(<TaskPool />);
  expect(screen.getByText(/Task Pool/i)).toBeDefined();
});

test('TaskPool has category drop zones or chips', () => {
  render(<TaskPool />);
  // We check for some of the default categories we expect to see as drop targets
  expect(screen.getByText(/Work/i)).toBeDefined();
  expect(screen.getByText(/Personal/i)).toBeDefined();
});
