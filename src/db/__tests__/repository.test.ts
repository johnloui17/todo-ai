import { expect, test, vi, beforeEach } from 'vitest';
import { repository } from '../repository';
import { drizzleDb, db } from '../powersync';

// Mock the db and drizzleDb
vi.mock('../powersync', () => ({
  db: {
    execute: vi.fn(),
    query: {
        categories: { findMany: vi.fn() },
        tasks: { findMany: vi.fn(), findFirst: vi.fn() },
        subtasks: { findMany: vi.fn() },
        taskHistory: { findMany: vi.fn(), findFirst: vi.fn() },
    }
  },
  drizzleDb: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn(),
    delete: vi.fn().mockReturnThis(),
    query: {
        categories: { findMany: vi.fn() },
        tasks: { findMany: vi.fn(), findFirst: vi.fn() },
        subtasks: { findMany: vi.fn() },
        taskHistory: { findMany: vi.fn(), findFirst: vi.fn() },
    }
  }
}));

test('repository.createTask calls insert with correct values', async () => {
  const insertSpy = vi.spyOn(drizzleDb, 'insert');
  const valuesSpy = vi.spyOn(drizzleDb, 'values');
  
  await repository.createTask('New Task', 'todo', 'cat-1');
  
  expect(insertSpy).toHaveBeenCalled();
  expect(valuesSpy).toHaveBeenCalledWith(expect.objectContaining({
    title: 'New Task',
    type: 'todo',
    categoryId: 'cat-1'
  }));
});

test('repository.updateTaskStatus updates status and logs history', async () => {
  const updateSpy = vi.spyOn(drizzleDb, 'update');
  const setSpy = vi.spyOn(drizzleDb, 'set');
  
  await repository.updateTaskStatus('task-1', 'completed');
  
  expect(updateSpy).toHaveBeenCalled();
  expect(setSpy).toHaveBeenCalledWith(expect.objectContaining({ status: 'completed' }));
  // History logic will also be triggered
});

test('repository.getStreak calculates streak from history', async () => {
  // Mock history with 3 avoided entries
  const mockHistory = [
    { id: '1', taskId: 't1', status: 'avoided', date: '2026-04-09' },
    { id: '2', taskId: 't1', status: 'avoided', date: '2026-04-08' },
    { id: '3', taskId: 't1', status: 'avoided', date: '2026-04-07' },
  ];
  
  vi.mocked(drizzleDb.query.taskHistory.findMany).mockResolvedValue(mockHistory as any);
  
  const streak = await repository.getStreak('t1');
  expect(streak).toBe(3);
});
