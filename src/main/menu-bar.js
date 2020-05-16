module.exports = class MenuBar {
	constructor(options) {
		options = {
			isMac: false,
			isDevelopment: false,
			appName: '',
			shell: {},
			...options
		};

		this._isMac = options.isMac;
		this._isDevelopment = options.isDevelopment;
		this._shell = options.shell;
		this._appName = options.appName;
	}

	getTemplate() {
		return [
			...this._getAppMenu(),
			this._getFileMenu(),
			this._getEditMenu(),
			this._getViewMenu(),
			this._getWindowMenu(),
			this._getHelpMenu()
		];
	}

	_getAppMenu() {
		return (this._isMac ? [{
			label: this._appName,
			submenu: [
				{role: 'about'},
				{type: 'separator'},
				{role: 'services'},
				{type: 'separator'},
				{role: 'hide'},
				{role: 'hideothers'},
				{role: 'unhide'},
				{type: 'separator'},
				{role: 'quit'}
			]
		}] : []);
	}

	_getFileMenu() {
		return {
			label: 'File',
			submenu: [
				this._isMac ? {role: 'close'} : {role: 'quit'}
			]
		};
	}

	_getEditMenu() {
		return {
			label: 'Edit',
			submenu: [
				{role: 'undo'},
				{role: 'redo'},
				{type: 'separator'},
				{role: 'cut'},
				{role: 'copy'},
				{role: 'paste'},
				...(this._isMac ? [
					{role: 'selectAll'},
					{type: 'separator'},
					{
						label: 'Speech',
						submenu: [
							{role: 'startspeaking'},
							{role: 'stopspeaking'}
						]
					}
				] : [
					{role: 'delete'},
					{type: 'separator'},
					{role: 'selectAll'}
				])
			]
		};
	}

	_getViewMenu() {
		return {
			label: 'View',
			submenu: [
				...(this._isDevelopment ? [
					{role: 'reload'},
					{role: 'forcereload'},
					{role: 'toggledevtools'},
					{type: 'separator'},
					{role: 'resetzoom'},
					{role: 'zoomin'},
					{role: 'zoomout'},
					{type: 'separator'}
				] : []),
				{role: 'togglefullscreen'}
			]
		};
	}

	_getWindowMenu() {
		return {
			label: 'Window',
			submenu: [
				{role: 'minimize'},
				{role: 'zoom'},
				...(this._isMac ? [
					{type: 'separator'},
					{role: 'front'}
				] : [
					{role: 'close'}
				])
			]
		};
	}

	_getHelpMenu() {
		return {
			role: 'help',
			submenu: [
				...(this._isMac ? [] : [
					{role: 'about'}
				]),
				{
					label: 'Learn More',
					click: async () => {
						await this._shell.openExternal('https://notedapp.org');
					}
				}
			]
		};
	}
};
