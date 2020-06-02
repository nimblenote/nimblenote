const Actions = require('../actions/action-types');

function nimbleNoteReducer(state, action) {
	if (action) {
		switch (action.type) {
			case Actions.RESIZE_FILELIST:
				return {
					...state,
					fileListHeight: action.newSize
				};
			case Actions.SHOW_HELP:
				return {
					...state,
					searchValue: '?',
					query: '?',
					files: [],
					editorContent: action.helpText,
					editorDisabled: true,
					newlyCreatedFile: false
				};
			case Actions.OPEN_FILE:
				return {
					...state,
					files: state.allFiles,
					fileIndex: state.allFiles.indexOf(action.filename),
					editorContent: action.content,
					searchValue: action.filename,
					startSelection: false,
					endSelection: false,
					query: action.filename,
					editorDisabled: false,
					newlyCreatedFile: false,
					focusOnSearch: false
				};
			case Actions.CHANGE_SELECTED_FILE:
				return {
					...state,
					fileIndex: action.nextIndex,
					editorContent: action.content,
					searchValue: action.filename,
					startSelection: false,
					endSelection: false,
					query: action.filename,
					editorDisabled: false,
					newlyCreatedFile: false,
					focusOnSearch: false
				};
			case Actions.SEARCH_QUERY:
				return {
					...state,
					searchValue: action.searchValue,
					query: action.query,
					startSelection: action.startSelection,
					endSelection: action.endSelection,
					files: action.results,
					fileIndex: action.selectedFileIndex,
					editorContent: action.content,
					editorDisabled: action.selectedFileIndex === '',
					newlyCreatedFile: false
				};
			case Actions.CREATE_FILE:
				return {
					...state,
					searchValue: action.filename,
					query: '',
					files: action.files,
					allFiles: action.files,
					fileIndex: action.newFileIndex,
					editorContent: '',
					editorDisabled: false,
					newlyCreatedFile: true,
					focusOnSearch: false
				};
			case Actions.UPDATE_FILE:
				return {
					...state,
					editorContent: action.content,
					newlyCreatedFile: false,
					focusOnSearch: false
				};
			case Actions.RESET_TO_INITIAL_STATE:
				return {
					...state,
					searchValue: '',
					query: '',
					files: state.allFiles,
					fileIndex: '',
					editorContent: '',
					editorDisabled: true,
					newlyCreatedFile: false,
					focusOnSearch: true
				};
			case Actions.DELETE_FILE:
				return {
					...state,
					searchValue: '',
					query: '',
					files: action.files,
					allFiles: action.files,
					fileIndex: '',
					editorContent: '',
					editorDisabled: true,
					newlyCreatedFile: false,
					focusOnSearch: true
				};
			default:
				return state;
		}
	}

	return state;
}

module.exports = nimbleNoteReducer;
