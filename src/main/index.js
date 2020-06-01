const {ipcMain, app, BrowserWindow, dialog, Menu, shell} = require('electron');
const {argv} = require('yargs');
const {userDataPath} = require('../lib/app-paths');
const Store = require('electron-store');
const logger = require('../lib/logger');
const MenuBar = require('./menu-bar');
const Preferences = require('./preferences');
const initMainListeners = require('./main-listeners');
const AppWindow = require('./app-window');

const isDevelopment = process.env.NODE_ENV !== 'production';

logger.info('nimblenote');

const preferences = new Preferences({StoreClass: Store, userDataPath}, argv);

initMainListeners(ipcMain, preferences, dialog, logger, shell);

const menuBar = new MenuBar({
	isMac: process.platform === 'darwin',
	isDevelopment,
	appName: app.name,
	shell
});

Menu.setApplicationMenu(
	Menu.buildFromTemplate(menuBar.getTemplate()));

const appWindow = new AppWindow({
	BrowserWindowClass: BrowserWindow,
	AppClass: app,
	preferences,
	isDevelopment,
	process
});

appWindow.init();
