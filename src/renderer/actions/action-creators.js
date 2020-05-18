const fs = require('fs');
const {ipcRenderer} = require('electron');
const checkAndProcessError = require('../lib/check-and-process-error');
const NotesHandler = require('../lib/notes-handler');
const NotedActions = require('./noted-actions');

const notesStoragePath = ipcRenderer.sendSync(
	'getPreference',
	'notesStoragePath');

const notes = new NotesHandler(notesStoragePath, fs);
notes.setup();
const notedActions = new NotedActions(notes);

// Is this an unnecessary middleman to NotedActions?

function showTitlebar() {
	return NotedActions.showTitlebar(process.platform === 'darwin');
}

function showHelp() {
	return NotedActions.help();
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
		return checkAndProcessError(notedActions.delete(files, filename));
	}
}

function loadFiles() {
	return checkAndProcessError(notedActions.list());
}

function selectFile(files, selectedIndex) {
	return checkAndProcessError(notedActions.selectFile(files, selectedIndex));
}

function changeSelectedFile(files, currentlySelected, upDirection) {
	return checkAndProcessError(
		notedActions.moveToNextFile(files, currentlySelected, upDirection));
}

function resetToInitialState() {
	return NotedActions.reset();
}

function createFile(filename) {
	return checkAndProcessError(notedActions.create(filename));
}

function updateFile(filename, content) {
	return checkAndProcessError(notedActions.update(filename, content));
}

function searchQuery(files, query, previousQuery) {
	return checkAndProcessError(notedActions.search(files, query, previousQuery));
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
	searchQuery
};
