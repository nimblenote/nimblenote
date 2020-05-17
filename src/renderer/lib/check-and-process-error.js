const {ipcRenderer} = require('electron');
const Actions = require('../actions/action-types');

module.exports = function checkAndProcessError(data) {
	if (data.type !== Actions.ERROR) {
		return data;
	}

	ipcRenderer.send('logger', { level: 'error', message: `showError: ${data.title}: ${data.message}` });

	ipcRenderer.send('showError', { title: data.title, content: data.message });

	return data;
}
