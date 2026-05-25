import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { config } from './config.js';
import { connectToDatabase } from './db.js';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-api',
    mongoPort: 27017,
  });
});

async function start() {
  try {
    await connectToDatabase();
    app.listen(config.port, () => {
      console.log(`OctoFit Tracker API listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API', error);
    process.exit(1);
  }
}

void start();
