import { ipcRenderer } from 'electron';

import * as Actions from '../actions/actionTypes';

export default function checkAndProcessError(data) {
	if (data.type !== Actions.ERROR) {
		return data;
	}

	ipcRenderer.send('logger', { level: 'error', message: `showError: ${data.title}: ${data.message}` });

	ipcRenderer.send('showError', { title: data.title, content: data.message });

	return data;
}
