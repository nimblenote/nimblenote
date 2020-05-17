const Actions = require('../actions/action-types');

const initialState = {
	titlebar: true,
	searchValue: '',
	query: '',
	startSelection: false,
	endSelection: false,
	allFiles: [],
	files: [],
	fileIndex: '',
	editorContent: '',
	editorDisabled: true,
	newlyCreatedFile: false,
	focusOnSearch: true,
};

function notedReducer(state, action) {
	switch (action.type) {
		case Actions.SHOW_TITLEBAR:
			return {
				...state,
				titlebar: action.titlebar,
			};
		case Actions.SHOW_HELP:
			return {
				...state,
				searchValue: '?',
				query: '?',
				files: [],
				editorContent: action.helpText,
				editorDisabled: true,
				newlyCreatedFile: false,
			};
		case Actions.LOAD_FILES:
			return {
				...state,
				allFiles: action.files,
				files: action.files,
				newlyCreatedFile: false,
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
				focusOnSearch: false,
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
				newlyCreatedFile: false,
			};
		case Actions.CREATE_FILE:
			return {
				...state,
				searchValue: action.filename,
				query: '',
				files: [action.filename],
				allFiles: state.allFiles.concat([action.filename]),
				fileIndex: 0,
				editorContent: '',
				editorDisabled: false,
				newlyCreatedFile: true,
				focusOnSearch: false,
			};
		case Actions.UPDATE_FILE:
			return {
				...state,
				editorContent: action.content,
				newlyCreatedFile: false,
				focusOnSearch: false,
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
				focusOnSearch: true,
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
				focusOnSearch: true,
			};
		default:
			return state;
	}
}

module.exports = {initialState, notedReducer};
