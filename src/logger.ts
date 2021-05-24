import { createLogger, format, transports } from 'winston';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple(),
    format.timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logger.log' }),
  ],
});

export default logger;
