const {ipcRenderer} = require('electron');

module.exports = (logLevel, logMessage) => {
	ipcRenderer.send('logger', {level: logLevel, message: logMessage});
};
