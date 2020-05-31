module.exports = (ipcMain, preferences, dialog, logger) => {
	ipcMain.on('getPreference', (event, arg) => {
		event.returnValue = preferences.get(arg);
	});

	ipcMain.on('setPreference', (event, {key, value}) => {
		preferences.set(key, value);
	});

	ipcMain.on('showError', (event, arg) => {
		dialog.showErrorBox(arg.title, arg.content);
	});

	ipcMain.on('logger', (event, {level, message}) => {
		logger.log(level, message, {source: 'renderer'});
	});

	ipcMain.on('showDialog', (event, args) => {
		event.returnValue = dialog.showMessageBoxSync(args);
	});
};
