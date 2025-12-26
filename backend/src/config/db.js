import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    return false;
  }
};

export default pool;
