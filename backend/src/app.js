import express from 'express';
import cors from 'cors';

import pool from './config/db.js';
import { initDatabase } from './config/initDb.js';

import authRoutes from './routes/authRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import usersRoutes from './routes/usersRoutes.js';



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api', taskRoutes);
app.use("/api", usersRoutes);


// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      database: 'connected',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});

// 🚀 START SERVER (ONLY ONCE)
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database');
    process.exit(1);
  }
})();
