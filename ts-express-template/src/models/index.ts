import { Sequelize } from 'sequelize';
import { config } from '../config/config';
import Thermometer from './thermometer.model';

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
  dialectOptions: {
    ssl:
      process.env.DB_SSL === 'true'
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  //logging: config.db.logging
});

// eslint-disable-next-line prettier/prettier
const db = {
  sequelize,
  Sequelize,
  Thermometer,
};

export default db;
export { sequelize, Thermometer };
