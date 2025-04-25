import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    name: process.env.DB_NAME || 'devices',
    user: process.env.DB_USER || 'user',
    password: 'test123!', //process.env.DB_PASSWORD || 'test123!',
    dialect: process.env.DB_DIALECT,
  },
};

export { config };
