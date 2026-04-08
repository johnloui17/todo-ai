import { PowerSyncDatabase } from '@powersync/web';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as schema from './schema';

/**
 * Define the PowerSync schema based on the Drizzle schema.
 */
import { Schema, Table, Column, ColumnType } from '@powersync/web';

export const AppSchema = new Schema([
  new Table({
    name: 'categories',
    columns: [
      new Column({ name: 'name', type: ColumnType.TEXT }),
      new Column({ name: 'color', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
  new Table({
    name: 'tasks',
    columns: [
      new Column({ name: 'category_id', type: ColumnType.TEXT }),
      new Column({ name: 'title', type: ColumnType.TEXT }),
      new Column({ name: 'type', type: ColumnType.TEXT }),
      new Column({ name: 'status', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
  new Table({
    name: 'subtasks',
    columns: [
      new Column({ name: 'task_id', type: ColumnType.TEXT }),
      new Column({ name: 'title', type: ColumnType.TEXT }),
      new Column({ name: 'status', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
]);

/**
 * Initialize the PowerSync instance.
 */
export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'todo-ai.db',
  },
});

/**
 * Create a Drizzle instance that proxies to PowerSync.
 */
export const drizzleDb = drizzle(
  async (sql, params, method) => {
    try {
      const result = await db.execute(sql, params);
      return { rows: result.rows._array };
    } catch (e: any) {
      console.error('Error executing sql', e);
      return { rows: [] };
    }
  },
  { schema }
);

/**
 * Setup function to initialize the database connection.
 */
export const setupPowerSync = async () => {
  // In a real app, you would also initialize the backend connection here
  // e.g., await db.connect(connector);
  console.log('PowerSync initialized');
};
