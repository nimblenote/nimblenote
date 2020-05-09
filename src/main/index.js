import {
  ipcMain, app, BrowserWindow, dialog, Menu,
} from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

import { userDataPath } from '../lib/appPaths'; // eslint-disable-line import/order

import { autoUpdater } from 'electron-updater'; // eslint-disable-line import/first

import Store from 'electron-store'; // eslint-disable-line import/first

import menu from './menu'; // eslint-disable-line import/first

import logger from '../lib/logger'; // eslint-disable-line import/first

logger.info('Noted');

const isDevelopment = process.env.NODE_ENV !== 'production';

const preferences = new Store({
  name: 'noted',
  defaults: {
    notesStoragePath: path.join(userDataPath, 'NotedNotes'),
    windowWidth: 400,
    windowHeight: 600,
  },
});

logger.debug(`userData ${app.getPath('userData')}`);
logger.debug(`SNAP_USER_COMMON ${process.env.SNAP_USER_COMMON}`);
logger.debug(`SNAP_USER_DATA ${process.env.SNAP_USER_DATA}`);

logger.debug('Preferences:', preferences.store);
logger.debug('Preferences path:', preferences);

ipcMain.on('getPreference', (event, arg) => {
  event.returnValue = preferences.get(arg); // eslint-disable-line no-param-reassign
});

ipcMain.on('showError', (event, arg) => {
  dialog.showErrorBox(arg.title, arg.content);
});

ipcMain.on('logger', (event, { level, message }) => {
  logger.log(level, message, { source: 'renderer' });
});

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

Menu.setApplicationMenu(menu);

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
  autoUpdater.checkForUpdatesAndNotify();

  mainWindow = createMainWindow();
});
