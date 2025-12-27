import { initDatabase } from './config/initDb.js';

import express from 'express';
import cors from 'cors';

import pool, { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import tenantRoutes from './routes/tenantRoutes.js';



const app = express(); // ✅ app MUST be created first

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);

// DB status
let dbStatus = 'not_connected';

// Connect DB on startup
(async () => {
  try {
    await initDatabase();
    app.listen(5000, () => {
      console.log('Backend running on port 5000');
    });
  } catch (err) {
    console.error('Failed to initialize database');
    process.exit(1);
  }
})();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
