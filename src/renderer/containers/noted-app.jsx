const React = require('react');
const {useReducer} = require('react');
const Mousetrap = require('mousetrap');
const logger = require('../lib/renderer-logger');
const ActionCreators = require('../actions/action-creators');
const {initialState, notedReducer} = require('../reducers/noted-reducer');
const Noted = require('../components/Noted');

const NotedApp = () => {
	const [state, dispatch] = useReducer(notedReducer, initialState);

	// Ensure Mousetrap fires even if focus is within input fields
	Mousetrap.prototype.stopCallback = () => false;

	Mousetrap.bind(['mod+d'], () => {
		const filename = state.files[state.fileIndex];

		if (filename && confirm(`Are you sure you want to delete: ${filename}?`)) {
			dispatch(ActionCreators.deleteFile(state.allFiles, filename));
		}

		return false;
	});

	return <Noted {...state} {...ActionCreators} dispatch={dispatch}/>;
};

module.exports = NotedApp;
