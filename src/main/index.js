import {
  ipcMain, app, BrowserWindow, dialog, Menu, shell,
} from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

import { userDataPath } from '../lib/appPaths'; // eslint-disable-line import/order

import Store from 'electron-store'; // eslint-disable-line import/order
import updateMacOs from './update-macos';

import logger from '../lib/logger'; // eslint-disable-line import/first

import MenuBar from './menu-bar';
import Preferences from './preferences';
import initMainListeners from './main-listeners';

const isDevelopment = process.env.NODE_ENV !== 'production';

logger.info('Noted');

updateMacOs(logger);

const preferences = new Preferences({StoreClass: Store, userDataPath});

initMainListeners(ipcMain, preferences, dialog, logger);

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    backgroundColor: '#21252b',
    titleBarStyle: 'hidden',
    width: preferences.get('windowWidth'),
    height: preferences.get('windowHeight'),
  });

  if (isDevelopment) {
    window.webContents.openDevTools();

    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  if (process.platform !== 'darwin') {
    window.setMenu(null);
  }

  window.on('close', () => {
    const [width, height] = window.getSize();
    preferences.set('windowWidth', width);
    preferences.set('windowHeight', height);
  });

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

const menuBar = new MenuBar({
  isMac: process.platform === 'darwin',
  isDevelopment,
  appName: app.getName(),
  shell
});

Menu.setApplicationMenu(
  Menu.buildFromTemplate(menuBar.getTemplate())
);

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});
