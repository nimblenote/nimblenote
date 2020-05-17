import { ipcRenderer } from 'electron';

export default function logger(logLevel, logMessage) {
	ipcRenderer.send('logger', { level: logLevel, message: logMessage });
}
