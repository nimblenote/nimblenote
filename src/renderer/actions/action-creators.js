const fs = require('fs');
const {ipcRenderer} = require('electron');
const checkAndProcessError = require('../lib/check-and-process-error');
const NotesHandler = require('../lib/notes-handler');
const NimbleNoteActions = require('./nimble-note-actions');

const notesStoragePath = ipcRenderer.sendSync(
	'getPreference',
	'notesStoragePath');

const notes = new NotesHandler(notesStoragePath, fs);
notes.setup();
const nimbleNoteActions = new NimbleNoteActions(notes);

// Is this an unnecessary middleman to NimbleNoteActions?

function showTitlebar() {
	return NimbleNoteActions.showTitlebar(process.platform === 'darwin');
}

function showHelp() {
	return NimbleNoteActions.help();
}

function deleteFile(files, filename) {
	const confirmOptions = {
		type: 'warning',
		buttons: ['Delete', 'Cancel'],
		title: 'Delete note',
		message: `Are you sure you wish to delete: ${filename}?`
	};

	const confirmDelete = ipcRenderer.sendSync('showDialog', confirmOptions);

	if (confirmDelete === 0) {
		return checkAndProcessError(nimbleNoteActions.delete(files, filename));
	}
}

function loadFiles() {
	return checkAndProcessError(nimbleNoteActions.list());
}

function selectFile(files, selectedIndex) {
	return checkAndProcessError(nimbleNoteActions.selectFile(files, selectedIndex));
}

function changeSelectedFile(files, currentlySelected, upDirection) {
	return checkAndProcessError(
		nimbleNoteActions.moveToNextFile(files, currentlySelected, upDirection));
}

function resetToInitialState() {
	return NimbleNoteActions.reset();
}

function createFile(filename) {
	return checkAndProcessError(nimbleNoteActions.create(filename));
}

function updateFile(filename, content) {
	return checkAndProcessError(nimbleNoteActions.update(filename, content));
}

function searchQuery(files, query, previousQuery) {
	return checkAndProcessError(nimbleNoteActions.search(files, query, previousQuery));
}

function resizeFileList(newSize) {
	return nimbleNoteActions.resizeFileList(newSize);
}

function persistFileListSize(size) {
	ipcRenderer.send('setPreference', {
		key: 'fileListHeight',
		value: size
	});
}

function openExternalLink(url) {
	ipcRenderer.send('openExternalLink', url);
}

module.exports = {
	showTitlebar,
	showHelp,
	deleteFile,
	loadFiles,
	selectFile,
	changeSelectedFile,
	resetToInitialState,
	createFile,
	updateFile,
	searchQuery,
	resizeFileList,
	persistFileListSize,
	openExternalLink
};
