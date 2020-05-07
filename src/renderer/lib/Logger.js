import winston from 'winston';
import path from 'path';

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  const logFilepath = path.join(
    process.cwd(),
    'logs',
    `${process.env.NODE_ENV}.log`
  );

  logger.add(
    new winston.transports.File({
      filename: logFilepath,
      format: winston.format.simple()
    })
  );
}

export default logger;
