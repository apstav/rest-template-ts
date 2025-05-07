import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devices_db',
  },
};

const client = new MongoClient(config.db.uri);

export { config, client };
