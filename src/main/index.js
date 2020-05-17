const {ipcMain, app, BrowserWindow, dialog, Menu, shell} = require('electron');
const {userDataPath} = require('../lib/app-paths');
const Store = require('electron-store');
const updateMacOs = require('./update-macos');
const logger = require('../lib/logger');
const MenuBar = require('./menu-bar');
const Preferences = require('./preferences');
const initMainListeners = require('./main-listeners');
const AppWindow = require('./app-window');

const isDevelopment = process.env.NODE_ENV !== 'production';

logger.info('Noted');

updateMacOs(logger);

const preferences = new Preferences({StoreClass: Store, userDataPath});

initMainListeners(ipcMain, preferences, dialog, logger);

const menuBar = new MenuBar({
	isMac: process.platform === 'darwin',
	isDevelopment,
	appName: app.getName(),
	shell
});

Menu.setApplicationMenu(
	Menu.buildFromTemplate(menuBar.getTemplate()));

new AppWindow({
	BrowserWindowClass: BrowserWindow,
	AppClass: app,
	preferences,
	isDevelopment,
	process
});
