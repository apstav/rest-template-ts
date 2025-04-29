import mongoose from 'mongoose';
import { config } from '../config/config';
import Thermometer from './thermometer.model';
const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, config.db.options);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { mongoose, connectDB, Thermometer };