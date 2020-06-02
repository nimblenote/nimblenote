module.exports = class InitialState {
	constructor({ipcRenderer, process, notesHandler}) {
		this._ipcRenderer = ipcRenderer;
		this._process = process;
		this._notesHandler = notesHandler;
	}

	getState() {
		const files = this._getFiles();

		return {
			titlebar: this._getShowTitleBar(),
			searchValue: '',
			query: '',
			startSelection: false,
			endSelection: false,
			allFiles: files,
			files,
			fileIndex: '',
			editorContent: '',
			editorDisabled: true,
			newlyCreatedFile: false,
			focusOnSearch: true,
			fileListHeight: this._getFileListHeight()
		};
	}

	_getFiles() {
		return this._notesHandler.list();
	}

	_getShowTitleBar() {
		return this._process.platform === 'darwin';
	}

	_getFileListHeight() {
		return this._ipcRenderer.sendSync('getPreference', 'fileListHeight');
	}
};
