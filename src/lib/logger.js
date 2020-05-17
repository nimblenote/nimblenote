const path = require('path');
const winston = require('winston');
const {logPath} = require('./app-paths');

const logFilePath = path.join(logPath, 'noted.log');

const logger = winston.createLogger({
	level: 'debug',
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.simple())
		}),
		new winston.transports.File({
			filename: logFilePath,
			format: winston.format.simple()
		})
	]});

if (process.env.NODE_ENV !== 'production') {
	const devLogFilePath = path.join(
		process.cwd(),
		'logs',
		`${process.env.NODE_ENV}.log`);

	logger.add(
		new winston.transports.File({
			filename: devLogFilePath,
			format: winston.format.simple()
		}));
}

module.exports = logger;
