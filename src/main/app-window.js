const {format} = require('url');
const path = require('path');

module.exports = class AppWindow {
	constructor(options) {
		this._BrowserWindowClass = options.BrowserWindowClass;
		this._AppClass = options.AppClass;
		this._preferences = options.preferences;
		this._isDevelopment = options.isDevelopment;
		this._process = options.process;

		this._mainWindow = null;
	}

	init() {
		this._AppClass.on('window-all-closed', () => {
			if (this._process.platform !== 'darwin') {
				this._AppClass.quit();
			}
		});

		this._AppClass.on('activate', () => {
			if (this._mainWindow === null) {
				this._mainWindow = this._createMainWindow();
			}
		});

		this._AppClass.on('ready', () => {
			this._mainWindow = this._createMainWindow();
		});
	}

	_createMainWindow() {
		const window = new this._BrowserWindowClass({
			webPreferences: {
				nodeIntegration: true
			},
			backgroundColor: '#21252b',
			titleBarStyle: 'hidden',
			trafficLightPosition: {x: 10, y: 20},
			width: this._preferences.get('windowWidth'),
			height: this._preferences.get('windowHeight')
		});

		if (this._isDevelopment) {
			window.webContents.openDevTools();

			window.loadURL(`http://localhost:${this._process.env.ELECTRON_WEBPACK_WDS_PORT}`);
		} else {
			window.loadURL(format({
				pathname: path.join(__dirname, 'index.html'),
				protocol: 'file',
				slashes: true
			}));
		}

		if (this._process.platform !== 'darwin') {
			window.setMenu(null);
		}

		window.on('close', () => {
			const [width, height] = window.getSize();
			this._preferences.set('windowWidth', width);
			this._preferences.set('windowHeight', height);
		});

		window.on('closed', () => {
			this._mainWindow = null;
		});

		window.webContents.on('devtools-opened', () => {
			window.focus();
			setImmediate(() => {
				window.focus();
			});
		});

		return window;
	}
};
