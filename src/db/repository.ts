import { eq, and, desc, sql } from 'drizzle-orm';
import { drizzleDb } from './powersync';
import { categories, tasks, subtasks, taskHistory } from './schema';

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split('T')[0];

export const repository = {
  // --- Categories ---
  getCategories: async () => {
    return await drizzleDb.query.categories.findMany();
  },

  createCategory: async (name: string, color?: string) => {
    return await drizzleDb.insert(categories).values({ name, color }).returning();
  },

  // --- Tasks ---
  getTasks: async (categoryId?: string | null) => {
    return await drizzleDb.query.tasks.findMany({
      where: categoryId ? eq(tasks.categoryId, categoryId) : undefined,
    });
  },

  getPoolTasks: async () => {
    return await drizzleDb.query.tasks.findMany({
      where: and(eq(tasks.type, 'todo'), sql`${tasks.categoryId} IS NULL`),
    });
  },

  createTask: async (title: string, type: 'todo' | 'not_todo', categoryId?: string | null) => {
    return await drizzleDb.insert(tasks).values({ title, type, categoryId }).returning();
  },

  updateTaskStatus: async (taskId: string, status: 'pending' | 'completed' | 'avoided' | 'failed') => {
    const today = getTodayDate();
    
    // Update main task status
    await drizzleDb.update(tasks).set({ status }).where(eq(tasks.id, taskId));

    // If it's a completion/avoidance/failure, log it in history for today
    if (status !== 'pending') {
      // Upsert into history for today
      const existing = await drizzleDb.query.taskHistory.findFirst({
        where: and(eq(taskHistory.taskId, taskId), eq(taskHistory.date, today))
      });

      if (existing) {
        await drizzleDb.update(taskHistory).set({ status: status as any }).where(eq(taskHistory.id, existing.id));
      } else {
        await drizzleDb.insert(taskHistory).values({ taskId, status: status as any, date: today });
      }
    }
  },

  deleteTask: async (taskId: string) => {
    return await drizzleDb.delete(tasks).where(eq(tasks.id, taskId));
  },

  // --- Subtasks ---
  getSubtasks: async (taskId: string) => {
    return await drizzleDb.query.subtasks.findMany({
      where: eq(subtasks.taskId, taskId),
    });
  },

  createSubtask: async (taskId: string, title: string) => {
    return await drizzleDb.insert(subtasks).values({ taskId, title }).returning();
  },

  updateSubtaskStatus: async (subtaskId: string, status: 'pending' | 'completed') => {
    return await drizzleDb.update(subtasks).set({ status }).where(eq(subtasks.id, subtaskId));
  },

  // --- Not-Todo / History ---
  getNotTodos: async () => {
    const allNotTodos = await drizzleDb.query.tasks.findMany({
      where: eq(tasks.type, 'not_todo'),
    });

    // Enhancement: Attach today's status from history
    const today = getTodayDate();
    const tasksWithTodayStatus = await Promise.all(allNotTodos.map(async (task) => {
      const historyEntry = await drizzleDb.query.taskHistory.findFirst({
        where: and(eq(taskHistory.taskId, task.id), eq(taskHistory.date, today))
      });
      return {
        ...task,
        status: historyEntry ? historyEntry.status : 'pending'
      };
    }));

    return tasksWithTodayStatus;
  },

  getStreak: async (taskId: string) => {
    const history = await drizzleDb.query.taskHistory.findMany({
      where: eq(taskHistory.taskId, taskId),
      orderBy: [desc(taskHistory.date)],
    });

    let streak = 0;
    const today = getTodayDate();
    let currentDate = new Date(today);

    // If today is logged, we check if it's 'avoided'.
    // If it's not logged yet, streak could still be alive from yesterday.
    
    // Simple streak logic: iterate backwards from today
    for (const entry of history) {
      // This is a simplified logic, ideally we compare dates accurately
      if (entry.status === 'avoided') {
        streak++;
      } else if (entry.status === 'failed') {
        break;
      }
      // If pending (not in history), we might need to check if yesterday was avoided
    }
    
    return streak;
  }
};
