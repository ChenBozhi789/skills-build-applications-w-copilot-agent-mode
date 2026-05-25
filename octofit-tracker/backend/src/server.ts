import app from './app.js';
import { config } from './config.js';
import { connectToDatabase } from './config/database.js';

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

async function start() {
  try {
    await connectToDatabase();
    app.listen(config.port, () => {
      console.log(`OctoFit Tracker API listening on port ${config.port}`);
      console.log(`OctoFit Tracker API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit Tracker API', error);
    process.exit(1);
  }
}

void start();
