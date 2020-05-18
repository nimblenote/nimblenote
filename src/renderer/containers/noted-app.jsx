const React = require('react');
const {useReducer} = require('react');
const Mousetrap = require('mousetrap');
const logger = require('../lib/renderer-logger');
const ActionCreators = require('../actions/action-creators');
const legacySnapMigration = require('../lib/legacy-snap-migration');
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

	const checkForNotesToMigrate = () => {
		logger('debug', 'Checking for legacy snap notes');

		if (legacySnapMigration.isSnapPlatform()) {
			const legacyFiles = legacySnapMigration.checkForLegacyNotes();

			if (legacyFiles.length > 0) {
				const confirmMessage = `It looks like Noted has been updated and found some notes from an old version.

Should Noted recover the notes?`;

				if (confirm(confirmMessage)) {
					logger('debug', 'Migrating legacy notes');

					legacySnapMigration.migrateLegacyNotes(legacyFiles);

					logger('debug', 'Notes migrated');
				}

				logger('debug', 'Renaming directory');

				legacySnapMigration.renameLegacyNotesDirectory();

				logger('debug', 'Legacy directory renamed');
			}
		}
	};

	return <Noted {...state} {...ActionCreators} dispatch={dispatch} onInit={checkForNotesToMigrate}/>;
};

module.exports = NotedApp;
