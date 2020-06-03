const {ipcRenderer} = require('electron');
const React = require('react');
const {useReducer} = require('react');
const {notesHandler, actionCreators} = require('../actions/action-creators');
const nimbleNoteReducer = require('../reducers/nimble-note-reducer');
const NimbleNote = require('../components/NimbleNote');
const InitialState = require('../state/initial-state');

const NimbleNoteApp = () => {
	const initialState = new InitialState({ipcRenderer, process, notesHandler});

	const [state, dispatch] = useReducer(nimbleNoteReducer, initialState.getState());

	return <NimbleNote {...state} {...actionCreators} dispatch={dispatch}/>;
};

module.exports = NimbleNoteApp;
