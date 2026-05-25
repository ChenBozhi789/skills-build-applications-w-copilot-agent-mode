import app from './app.js';
import { config } from './config.js';
import { connectToDatabase } from './config/database.js';

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
