const fs = require('fs');
const {ipcRenderer} = require('electron');
const React = require('react');
const {useReducer} = require('react');
const Mousetrap = require('mousetrap');
const ActionCreators = require('../actions/action-creators');
const nimbleNoteReducer = require('../reducers/nimble-note-reducer');
const NimbleNote = require('../components/NimbleNote');
const InitialState = require('../state/initial-state');
const NotesHandler = require('../lib/notes-handler');

const NimbleNoteApp = () => {
	const notesStoragePath = ipcRenderer.sendSync(
		'getPreference',
		'notesStoragePath');
	const notesHandler = new NotesHandler(notesStoragePath, fs);

	const initialState = new InitialState({ipcRenderer, process, notesHandler});

	const [state, dispatch] = useReducer(nimbleNoteReducer, initialState.getState());

	// Ensure Mousetrap fires even if focus is within input fields
	Mousetrap.prototype.stopCallback = () => false;

	Mousetrap.bind(['mod+d'], () => {
		const filename = state.files[state.fileIndex];

		if (filename) {
			dispatch(ActionCreators.deleteFile(state.allFiles, filename));
		}

		return false;
	});

	return <NimbleNote {...state} {...ActionCreators} dispatch={dispatch}/>;
};

module.exports = NimbleNoteApp;
