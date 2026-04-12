import { eq, and, desc, sql } from 'drizzle-orm';
import { drizzleDb } from './powersync';
import { categories, tasks, subtasks, taskHistory } from './schema';

// Helper to get today's date in YYYY-MM-DD format (local timezone safe)
const getTodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper to get yesterday's date
const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const repository = {
  // --- Categories ---
  getCategories: async () => {
    return await drizzleDb.query.categories.findMany();
  },

  getCategoryProgress: async (categoryId: string) => {
    const catTasks = await repository.getTasks(categoryId);
    let totalItems = 0;
    let completedItems = 0;

    for (const task of catTasks) {
      totalItems++;
      if (task.status === 'completed') completedItems++;

      const subtasks = await repository.getSubtasks(task.id);
      for (const sub of subtasks) {
        totalItems++;
        if (sub.status === 'completed') completedItems++;
      }
    }

    return totalItems === 0 ? 0 : (completedItems / totalItems) * 100;
  },

  createCategory: async (name: string, color?: string) => {
    try {
      const id = crypto.randomUUID();
      return await drizzleDb.insert(categories).values({ id, name, color }).returning();
    } catch (error) {
      console.error('Error in repository.createCategory:', error);
      throw error;
    }
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
    try {
      const id = crypto.randomUUID();
      const result = await drizzleDb.insert(tasks).values({ 
        id, 
        title, 
        type, 
        categoryId: categoryId === null ? null : categoryId 
      }).returning();
      
      console.log('Task created successfully:', id);
      return result;
    } catch (error) {
      console.error('Error in repository.createTask:', error);
      throw error;
    }
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
    try {
      const id = crypto.randomUUID();
      return await drizzleDb.insert(subtasks).values({ id, taskId, title }).returning();
    } catch (error) {
      console.error('Error in repository.createSubtask:', error);
      throw error;
    }
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

    if (history.length === 0) return 0;

    let streak = 0;
    const today = getTodayDate();
    const yesterday = getYesterdayDate();
    
    // Check if the most recent entry is today or yesterday
    // If it's older than yesterday, the streak is broken (0)
    const latestEntry = history[0];
    if (latestEntry.date !== today && latestEntry.date !== yesterday) {
      return 0;
    }

    let expectedDate = latestEntry.date;
    
    for (const entry of history) {
      if (entry.date === expectedDate) {
        if (entry.status === 'avoided') {
          streak++;
          // Move expectedDate to the previous day
          const d = new Date(expectedDate);
          d.setDate(d.getDate() - 1);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          expectedDate = `${y}-${m}-${day}`;
        } else {
          // It's 'failed' or something else, break streak
          break;
        }
      } else {
        // Gap in dates, streak broken
        break;
      }
    }
    
    return streak;
  },

  clearAllData: async () => {
    await drizzleDb.delete(categories);
    await drizzleDb.delete(tasks);
    await drizzleDb.delete(subtasks);
    await drizzleDb.delete(taskHistory);
  }
};
