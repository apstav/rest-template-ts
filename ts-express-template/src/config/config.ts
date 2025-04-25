import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/devices_db',
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },
};

export { config };