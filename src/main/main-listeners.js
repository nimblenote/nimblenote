module.exports = (ipcMain, preferences, dialog, logger) => {
	ipcMain.on('getPreference', (event, arg) => {
		event.returnValue = preferences.get(arg);
	});

	ipcMain.on('showError', (event, arg) => {
		dialog.showErrorBox(arg.title, arg.content);
	});

	ipcMain.on('logger', (event, {level, message}) => {
		logger.log(level, message, {source: 'renderer'});
	});
};
