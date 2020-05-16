import {
  ipcMain, app, BrowserWindow, dialog, Menu, shell,
} from 'electron';

import { userDataPath } from '../lib/appPaths'; // eslint-disable-line import/order

import Store from 'electron-store'; // eslint-disable-line import/order
import updateMacOs from './update-macos';

import logger from '../lib/logger'; // eslint-disable-line import/first

import MenuBar from './menu-bar';
import Preferences from './preferences';
import initMainListeners from './main-listeners';
import AppWindow from './app-window';

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
  Menu.buildFromTemplate(menuBar.getTemplate())
);

new AppWindow({
  BrowserWindowClass: BrowserWindow,
  AppClass: app,
  preferences,
  isDevelopment,
  process
});
