import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import CategoryManager from '../CategoryManager';

// We will test that it renders "Dashboard" and some category cards
// This acts as our initial test before we enhance CategoryGrid to a full manager

test('CategoryManager renders at least some default category cards', () => {
  render(<CategoryManager />);
  const categories = ['Work', 'Health', 'Personal', 'Finance'];
  categories.forEach(name => {
    expect(screen.getByText(name)).toBeDefined();
  });
});
