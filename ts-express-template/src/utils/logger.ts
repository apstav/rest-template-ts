import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // This means it logs info and anything more severe (warn, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    }),
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }), // logs to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // error only
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }), // warn only
    new winston.transports.File({ filename: 'logs/combined.log' }), // all logs
  ],
});

export { logger };
