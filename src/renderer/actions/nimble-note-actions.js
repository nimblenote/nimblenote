const fuzzy = require('fuzzy');
const Actions = require('./action-types');

module.exports = class NimbleNoteActions {
	constructor(notesHandler) {
		this.notesHandler = notesHandler;
	}

	list() {
		let files = [];
		try {
			files = this.notesHandler.list();
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to load notes',
				message: `nimblenote was unable to load your notes from ${this.notesHandler.getPath()}`
			};
		}

		return {
			type: Actions.LOAD_FILES,
			files
		};
	}

	delete(files, filename) {
		try {
			this.notesHandler.delete(filename);
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to delete note',
				message: `nimblenote was unable to delete ${filename}`
			};
		}

		const filesAfterDelete = files.filter(i => i !== filename);

		return {
			type: Actions.DELETE_FILE,
			files: filesAfterDelete
		};
	}

	selectFile(files, selectedIndex) {
		const filename = files[selectedIndex];
		let content = '';
		try {
			content = this.notesHandler.read(filename);
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to load note',
				message: `nimblenote was unable to load ${filename}`
			};
		}

		return {
			type: Actions.OPEN_FILE,
			nextIndex: selectedIndex,
			filename,
			content
		};
	}

	moveToNextFile(files, currentlySelectedIndex, upDirection) {
		const nextIndex = NimbleNoteActions._getNextFileIndex(
			upDirection,
			currentlySelectedIndex,
			files.length);

		const filename = files[nextIndex];
		let content = '';

		try {
			content = this.notesHandler.read(filename);
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to load note',
				message: `nimblenote was unable to load ${filename}`
			};
		}

		return {
			type: Actions.CHANGE_SELECTED_FILE,
			nextIndex,
			filename,
			content
		};
	}

	create(filename) {
		let files;
		let newFileIndex;

		if (this.notesHandler.exists(filename)) {
			return {
				type: Actions.ERROR,
				title: 'Unable to create note',
				message: `${filename} already exists`
			};
		}

		try {
			this.notesHandler.write(filename, '');
			({files} = this.list());
			newFileIndex = files.indexOf(filename);
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to create note',
				message: `nimblenote was unable to create note: ${filename}`
			};
		}

		return {
			type: Actions.CREATE_FILE,
			filename,
			files,
			newFileIndex
		};
	}

	update(filename, content) {
		try {
			this.notesHandler.write(filename, content);
		} catch {
			return {
				type: Actions.ERROR,
				title: 'Unable to save note',
				message: `nimblenote was unable to save ${filename}`
			};
		}

		return {
			type: Actions.UPDATE_FILE,
			content
		};
	}

	search(files, query, previousQuery) {
		const results = fuzzy.simpleFilter(query, files);

		let content = '';
		let selectedFileIndex = '';
		let startSelection = false;
		let endSelection = false;
		let searchValue = query;

		if (results.length > 0) {
			const exactMatch = results.indexOf(query);
			let filename = '';

			if (exactMatch >= 0) {
				filename = results[exactMatch];
				selectedFileIndex = exactMatch;
			} else if (
				results[0].indexOf(query) === 0 &&
				query !== previousQuery &&
				query.length > previousQuery.length
			) {
				[filename] = results;
				selectedFileIndex = 0;
				startSelection = query.length;
				endSelection = results[0].length;
				[searchValue] = results;
			}

			if (filename !== '') {
				try {
					content = this.notesHandler.read(filename);
				} catch {
					return {
						type: Actions.ERROR,
						title: 'Unable to load note',
						message: `nimblenote was unable to load ${filename}`
					};
				}
			}
		}

		return {
			type: Actions.SEARCH_QUERY,
			searchValue,
			query,
			results,
			selectedFileIndex,
			content,
			startSelection,
			endSelection
		};
	}

	resizeFileList(newSize) {
		return {
			type: Actions.RESIZE_FILELIST,
			newSize
		};
	}

	static showTitlebar(show) {
		return {
			type: Actions.SHOW_TITLEBAR,
			titlebar: show
		};
	}

	static help() {
		return {
			type: Actions.SHOW_HELP,
			helpText: this._helpText()
		};
	}

	static reset() {
		return {
			type: Actions.RESET_TO_INITIAL_STATE
		};
	}

	// Private

	static _getNextFileIndex(up, index, count) {
		let current = null;

		const lastItemIndex = count - 1;

		if (index === '') {
			return up ? lastItemIndex : 0;
		}

		if (up) {
			current = index - 1;

			if (current < 0) {
				current = lastItemIndex;
			}

			return current;
		}

		current = index + 1;

		if (current > lastItemIndex) {
			current = 0;
		}

		return current;
	}

	static _helpText() {
		return `Hello! And _welcome_ to **nimblenote**!

## Navigating

The top section of the screen is your search input. You use this to search for files, or to name and create a new file. You can access it anytime by pressing the \`esc\` key on your keyboard.

The middle section of the app is your list of notes or search results. You can navigate this by using the \`up\` or \`down\` arrows when the search input is in focus.

The bottom section of the app is this section, the editor. This is where you can edit the contents of your notes. You can focus this section by pressing \`enter\`. If a note is highlighted in the notes list, it will open that file. If no results are displayed, it will create a new note with the name of whatever is in the search input.

## Markdown actions

You can trigger Markdown actions for the following by positioning the cursor over a checkbox or link item and then pressing \`alt\` + \`enter\` or if using the mouse \`alt\` + \`click\`. This works for:

- Toggling checkbox items
- Visiting external links in your browser
- Navigating between notes

`;
	}
};
