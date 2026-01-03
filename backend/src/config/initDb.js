import fs from 'fs';
import path from 'path';
import pool from './db.js';

/**
 * Runs a SQL file safely
 */
const runSqlFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  await pool.query(sql);
};

/**
 * Initializes DB:
 * 1. Runs migrations (ALWAYS)
 * 2. Runs seeds (ONLY if DB is empty)
 */
export const initDatabase = async () => {
  try {
    console.log('Running database migrations...');

    const migrationsDir = path.resolve('database/migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).sort();

    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      await runSqlFile(path.join(migrationsDir, file));
    }

    // 🔐 Check if tenants already exist
    const { rows } = await pool.query('SELECT COUNT(*) FROM tenants');

    if (rows[0].count === '0') {
      console.log('Running database seeds...');
      const seedFile = path.resolve('database/seeds/seed_data.sql');
      await runSqlFile(seedFile);
      console.log('Database initialized successfully');
    } else {
      console.log('Skipping database seeds (already initialized)');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};
