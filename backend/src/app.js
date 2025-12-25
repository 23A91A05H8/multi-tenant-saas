import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let dbStatus = 'not_connected';

// Connect DB on startup
(async () => {
  const connected = await connectDB();
  dbStatus = connected ? 'connected' : 'not_connected';
})();

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
