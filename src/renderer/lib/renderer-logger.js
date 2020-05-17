const {ipcRenderer} = require('electron');

module.exports = function logger(logLevel, logMessage) {
	ipcRenderer.send('logger', { level: logLevel, message: logMessage });
}
