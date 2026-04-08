import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

/**
 * Categories Table: User-defined task buckets.
 */
export const categories = sqliteTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  color: text('color'), // hex or Tailwind color name
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Tasks Table: Dual-mode support for 'todo' and 'not_todo'.
 */
export const tasks = sqliteTable('tasks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  categoryId: text('category_id').references(() => categories.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  // type: 'todo' | 'not_todo'
  type: text('type', { enum: ['todo', 'not_todo'] }).notNull().default('todo'),
  // status: 'pending' | 'completed' | 'avoided' | 'failed'
  status: text('status', { enum: ['pending', 'completed', 'avoided', 'failed'] })
    .notNull()
    .default('pending'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Subtasks Table: Nested tasks (1 level depth).
 */
export const subtasks = sqliteTable('subtasks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  taskId: text('task_id')
    .notNull()
    .references(() => tasks.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  status: text('status', { enum: ['pending', 'completed'] }).notNull().default('pending'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
