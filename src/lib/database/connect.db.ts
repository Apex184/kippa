import mongoose from 'mongoose';

import { logger } from '../logger';

const MONGO_URL = process.env.DATABASE_URL;

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB', err);
    throw err;
  }
};
