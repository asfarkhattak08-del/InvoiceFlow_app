import { Router } from 'express';
import mongoose from 'mongoose';
import { databaseHealth } from '../config/database.js';

const router = Router();

router.get('/', (req, res) => {
  const database = databaseHealth();
  res.status(database === 'connected' ? 200 : 503).json({
    status: database === 'connected' ? 'ok' : 'degraded',
    database,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    readyState: mongoose.connection.readyState,
  });
});

export default router;

