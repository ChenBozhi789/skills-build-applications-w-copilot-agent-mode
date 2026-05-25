import mongoose from 'mongoose';
import { config } from '../config.js';

const databaseName = 'octofit_db';

export async function connectToDatabase() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongoUri);
}

export { databaseName };
export { mongoose };
