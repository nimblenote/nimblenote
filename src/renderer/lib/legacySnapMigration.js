import fs from 'fs';
import path from 'path';

import { ipcRenderer } from 'electron';

import logger from './rendererLogger';

import NotesHandler from './NotesHandler';

const notesStoragePath = ipcRenderer.sendSync(
  'getPreference',
  'notesStoragePath',
);

const notes = new NotesHandler(notesStoragePath, fs);
notes.setup();

function legacySnapNotesDirectory() {
  if (process.env.SNAP_USER_DATA) {
    return path.join(
      process.env.SNAP_USER_DATA,
      '.config',
      'Noted',
      'NotedNotes',
    );
  }

  throw new Error('Not running as a snap. Legacy snap notes directory doesnt exist');
}

function getMigratedFilename(filename) {
  let fileNameToCheck = filename;

  logger('debug', `Filename to check exists: ${fileNameToCheck}`);

  while (notes.exists(fileNameToCheck)) {
    logger('debug', `Filename to already exists: ${fileNameToCheck}`);

    fileNameToCheck = `${filename}-migrated-${Date.now()}`;

    logger('debug', `Will try this filename instead: ${fileNameToCheck}`);
  }

  logger('debug', `Filename to use for migration: ${fileNameToCheck}`);

  return fileNameToCheck;
}

function getLegacyNoteContents(filename) {
  const legacyFilePath = path.join(legacySnapNotesDirectory(), filename);

  return fs.readFileSync(legacyFilePath, 'utf8');
}

export function isSnapPlatform() {
  return process.platform === 'linux' && process.env.SNAP;
}

export function checkForLegacyNotes() {
  logger('debug', 'Checking for files to migrate');

  let files = [];

  if (fs.existsSync(legacySnapNotesDirectory())) {
    files = fs.readdirSync(legacySnapNotesDirectory());
  }

  logger('debug', 'Results:');
  logger('debug', JSON.stringify(files));

  return files;
}

export function migrateLegacyNotes(files) {
  logger('debug', 'Files to migrate');
  logger('debug', JSON.stringify(files));

  files.forEach((filename) => {
    logger('debug', `Attempt to migrate: ${filename}`);

    const newFileName = getMigratedFilename(filename);

    logger('debug', `Will migrate to: ${newFileName}`);

    const contents = getLegacyNoteContents(filename);

    logger('debug', 'Contents retrieved');

    logger('debug', 'Writing note to new directory');

    notes.write(newFileName, contents);

    logger('debug', 'Note migrated');
  });

  logger('debug', 'All files migrated');
}

export function renameLegacyNotesDirectory() {
  logger('debug', 'Attempt to rename legacy directory');

  if (fs.existsSync(legacySnapNotesDirectory())) {
    fs.renameSync(legacySnapNotesDirectory(), `${legacySnapNotesDirectory()}-fromLegacyVersion`);
  }

  logger('debug', 'Directory renamed');
}
