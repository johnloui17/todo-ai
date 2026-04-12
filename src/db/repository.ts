import { eq, and, desc, sql, isNull } from 'drizzle-orm';
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
    try {
      const results = await drizzleDb.query.categories.findMany({
        orderBy: [desc(categories.createdAt)]
      });
      return results;
    } catch (error) {
      console.error('REPO ERROR: Fetching categories:', error);
      return [];
    }
  },

  getCategoryProgress: async (categoryId: string) => {
    try {
      const catTasks = await drizzleDb.query.tasks.findMany({
        where: eq(tasks.categoryId, categoryId)
      });
      
      let totalItems = 0;
      let completedItems = 0;

      for (const task of catTasks) {
        totalItems++;
        if (task.status === 'completed') completedItems++;

        const subs = await drizzleDb.query.subtasks.findMany({
          where: eq(subtasks.taskId, task.id)
        });
        
        for (const sub of subs) {
          totalItems++;
          if (sub.status === 'completed') completedItems++;
        }
      }

      return totalItems === 0 ? 0 : (completedItems / totalItems) * 100;
    } catch (error) {
      console.error('REPO ERROR: Calculating progress:', error);
      return 0;
    }
  },

  createCategory: async (name: string, color?: string) => {
    try {
      const id = crypto.randomUUID();
      const values = { id, name, color: color || 'blue', createdAt: new Date().toISOString() };
      await drizzleDb.insert(categories).values(values);
      return [values]; 
    } catch (error) {
      console.error('REPO ERROR: createCategory:', error);
      throw error;
    }
  },

  // --- Tasks ---
  getTasks: async (categoryId?: string | null) => {
    try {
      const filter = categoryId 
        ? eq(tasks.categoryId, categoryId) 
        : isNull(tasks.categoryId);
        
      const results = await drizzleDb.query.tasks.findMany({
        where: and(eq(tasks.type, 'todo'), filter),
        orderBy: [desc(tasks.createdAt)],
      });
      return results;
    } catch (error) {
      console.error('REPO ERROR: getTasks:', error);
      return [];
    }
  },

  getPoolTasks: async () => {
    try {
      const results = await drizzleDb.query.tasks.findMany({
        where: and(eq(tasks.type, 'todo'), isNull(tasks.categoryId)),
        orderBy: [desc(tasks.createdAt)],
      });
      return results;
    } catch (error) {
      console.error('REPO ERROR: getPoolTasks:', error);
      return [];
    }
  },

  getAllRecentTasks: async (limit = 5) => {
    try {
      const results = await drizzleDb.query.tasks.findMany({
        where: eq(tasks.type, 'todo'),
        orderBy: [desc(tasks.createdAt)],
        limit: limit
      });
      return results;
    } catch (error) {
      console.error('REPO ERROR: fetching recent tasks:', error);
      return [];
    }
  },

  createTask: async (title: string, type: 'todo' | 'not_todo', categoryId?: string | null) => {
    try {
      const id = crypto.randomUUID();
      const values = { 
        id, 
        title, 
        type, 
        categoryId: categoryId || null,
        status: 'pending' as const,
        createdAt: new Date().toISOString()
      };
      await drizzleDb.insert(tasks).values(values);
      return [values]; 
    } catch (error) {
      console.error('REPO ERROR: createTask:', error);
      throw error;
    }
  },

  updateTaskStatus: async (taskId: string, status: 'pending' | 'completed' | 'avoided' | 'failed') => {
    try {
      const today = getTodayDate();
      await drizzleDb.update(tasks).set({ status }).where(eq(tasks.id, taskId));

      if (status !== 'pending') {
        const existing = await drizzleDb.query.taskHistory.findFirst({
          where: and(eq(taskHistory.taskId, taskId), eq(taskHistory.date, today))
        });

        if (existing) {
          await drizzleDb.update(taskHistory).set({ status: status as any }).where(eq(taskHistory.id, existing.id));
        } else {
          await drizzleDb.insert(taskHistory).values({ id: crypto.randomUUID(), taskId, status: status as any, date: today });
        }
      }
    } catch (error) {
      console.error('REPO ERROR: updating task status:', error);
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      return await drizzleDb.delete(tasks).where(eq(tasks.id, taskId));
    } catch (error) {
      console.error('REPO ERROR: deleting task:', error);
    }
  },

  // --- Subtasks ---
  getSubtasks: async (taskId: string) => {
    try {
      return await drizzleDb.query.subtasks.findMany({
        where: eq(subtasks.taskId, taskId),
      });
    } catch (error) {
      console.error('REPO ERROR: Fetching subtasks:', error);
      return [];
    }
  },

  createSubtask: async (taskId: string, title: string) => {
    try {
      const id = crypto.randomUUID();
      const values = { id, taskId, title, status: 'pending' as const };
      await drizzleDb.insert(subtasks).values(values);
      return [values];
    } catch (error) {
      console.error('REPO ERROR: createSubtask:', error);
      throw error;
    }
  },

  updateSubtaskStatus: async (subtaskId: string, status: 'pending' | 'completed') => {
    try {
      return await drizzleDb.update(subtasks).set({ status }).where(eq(subtasks.id, subtaskId));
    } catch (error) {
      console.error('REPO ERROR: updating subtask:', error);
    }
  },

  // --- Not-Todo / History ---
  getNotTodos: async () => {
    try {
      const allNotTodos = await drizzleDb.query.tasks.findMany({
        where: eq(tasks.type, 'not_todo'),
        orderBy: [desc(tasks.createdAt)]
      });

      const today = getTodayDate();
      const results = await Promise.all(allNotTodos.map(async (task) => {
        const historyEntry = await drizzleDb.query.taskHistory.findFirst({
          where: and(eq(taskHistory.taskId, task.id), eq(taskHistory.date, today))
        });
        return {
          ...task,
          status: historyEntry ? historyEntry.status : 'pending'
        };
      }));
      return results;
    } catch (error) {
      console.error('REPO ERROR: fetching not-todos:', error);
      return [];
    }
  },

  getStreak: async (taskId: string) => {
    try {
      const history = await drizzleDb.query.taskHistory.findMany({
        where: eq(taskHistory.taskId, taskId),
        orderBy: [desc(taskHistory.date)],
      });

      if (history.length === 0) return 0;

      let streak = 0;
      const today = getTodayDate();
      const yesterday = getYesterdayDate();
      
      const latestEntry = history[0];
      if (latestEntry.date !== today && latestEntry.date !== yesterday) {
        return 0;
      }

      let expectedDate = latestEntry.date;
      
      for (const entry of history) {
        if (entry.date === expectedDate) {
          if (entry.status === 'avoided') {
            streak++;
            const d = new Date(expectedDate);
            d.setDate(d.getDate() - 1);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            expectedDate = `${y}-${m}-${day}`;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      return streak;
    } catch (error) {
      console.error('REPO ERROR: calculating streak:', error);
      return 0;
    }
  },

  clearAllData: async () => {
    try {
      await drizzleDb.delete(categories);
      await drizzleDb.delete(tasks);
      await drizzleDb.delete(subtasks);
      await drizzleDb.delete(taskHistory);
    } catch (error) {
      console.error('REPO ERROR: clearing data:', error);
      throw error;
    }
  }
};
