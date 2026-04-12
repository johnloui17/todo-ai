import { PowerSyncDatabase, WASQLiteOpenFactory } from '@powersync/web';
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
      new Column({ name: 'id', type: ColumnType.TEXT }),
      new Column({ name: 'name', type: ColumnType.TEXT }),
      new Column({ name: 'color', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
  new Table({
    name: 'tasks',
    columns: [
      new Column({ name: 'id', type: ColumnType.TEXT }),
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
      new Column({ name: 'id', type: ColumnType.TEXT }),
      new Column({ name: 'task_id', type: ColumnType.TEXT }),
      new Column({ name: 'title', type: ColumnType.TEXT }),
      new Column({ name: 'status', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
  new Table({
    name: 'task_history',
    columns: [
      new Column({ name: 'id', type: ColumnType.TEXT }),
      new Column({ name: 'task_id', type: ColumnType.TEXT }),
      new Column({ name: 'status', type: ColumnType.TEXT }),
      new Column({ name: 'date', type: ColumnType.TEXT }),
      new Column({ name: 'created_at', type: ColumnType.TEXT }),
    ],
  }),
]);

/**
 * Initialize the PowerSync instance with the correct factory for web.
 */
export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: new WASQLiteOpenFactory({
    dbFilename: 'todo-ai.db',
  }),
});

/**
 * Create a Drizzle instance that proxies to PowerSync.
 */
export const drizzleDb = drizzle(
  async (sql, params, method) => {
    try {
      const result = await db.execute(sql, params);
      
      // Drizzle sqlite-proxy with relational queries EXPECTS the data
      // to be returned as an array of arrays if using the default driver setup,
      // OR it needs to be mapped correctly.
      
      // PowerSync returns objects. We convert them to arrays of values.
      const rows = [];
      if (result.rows) {
        for (let i = 0; i < result.rows.length; i++) {
          const item = result.rows.item(i);
          // Relational query API in Drizzle handles the mapping if we return arrays
          rows.push(Object.values(item));
        }
      }
      
      return { rows };
    } catch (e) {
      console.error('PROXY ERROR:', e);
      return { rows: [] };
    }
  },
  { schema }
);

/**
 * Setup function to initialize the database connection.
 */
export const setupPowerSync = async () => {
};
