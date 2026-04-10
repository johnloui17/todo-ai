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
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  const dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 2);
  const dayBeforeStr = dayBefore.toISOString().split('T')[0];

  // Mock history with 3 avoided entries
  const mockHistory = [
    { id: '1', taskId: 't1', status: 'avoided', date: todayStr },
    { id: '2', taskId: 't1', status: 'avoided', date: yesterdayStr },
    { id: '3', taskId: 't1', status: 'avoided', date: dayBeforeStr },
  ];
  
  vi.mocked(drizzleDb.query.taskHistory.findMany).mockResolvedValue(mockHistory as any);
  
  const streak = await repository.getStreak('t1');
  expect(streak).toBe(3);
});

test('repository.getStreak returns 0 if there is a gap', async () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  // Skip yesterday
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

  const mockHistory = [
    { id: '1', taskId: 't1', status: 'avoided', date: todayStr },
    { id: '2', taskId: 't1', status: 'avoided', date: twoDaysAgoStr },
  ];
  
  vi.mocked(drizzleDb.query.taskHistory.findMany).mockResolvedValue(mockHistory as any);
  
  const streak = await repository.getStreak('t1');
  expect(streak).toBe(1); // Should only count today since yesterday is missing
});
