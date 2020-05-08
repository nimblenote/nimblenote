import winston from 'winston';
import path from 'path';

import { app } from 'electron';

const logFilePath = path.join(app.getPath('logs'), 'noted.log');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.simple(),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  const devLogFilePath = path.join(
    process.cwd(),
    'logs',
    `${process.env.NODE_ENV}.log`,
  );

  logger.add(
    new winston.transports.File({
      filename: devLogFilePath,
      format: winston.format.simple(),
    }),
  );
}

export default logger;
