import fs from 'fs';

import { ipcRenderer } from 'electron';

import checkAndProcessError from '../lib/checkAndProcessError';

import NotesHandler from '../lib/NotesHandler';
import NotedActions from './NotedActions';

const notesStoragePath = ipcRenderer.sendSync(
  'getPreference',
  'notesStoragePath',
);

const notes = new NotesHandler(notesStoragePath, fs);
notes.setup();
const notedActions = new NotedActions(notes);

// Is this an unnecessary middleman to NotedActions?

export function showTitlebar() {
  return NotedActions.showTitlebar(process.platform === 'darwin');
}

export function showHelp() {
  return NotedActions.help();
}

export function deleteFile(files, filename) {
  return checkAndProcessError(notedActions.delete(files, filename));
}

export function loadFiles() {
  return checkAndProcessError(notedActions.list());
}

export function selectFile(files, selectedIndex) {
  return checkAndProcessError(notedActions.selectFile(files, selectedIndex));
}

export function changeSelectedFile(files, currentlySelected, upDirection) {
  return checkAndProcessError(
    notedActions.moveToNextFile(files, currentlySelected, upDirection),
  );
}

export function resetToInitialState() {
  return NotedActions.reset();
}

export function createFile(filename) {
  return checkAndProcessError(notedActions.create(filename));
}

export function updateFile(filename, content) {
  return checkAndProcessError(notedActions.update(filename, content));
}

export function searchQuery(files, query, previousQuery) {
  return checkAndProcessError(notedActions.search(files, query, previousQuery));
}
