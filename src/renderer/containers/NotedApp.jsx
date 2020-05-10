import React, { useReducer } from 'react';
import { render } from 'react-dom';

import Mousetrap from 'mousetrap';

import logger from '../lib/rendererLogger';

import * as ActionCreators from '../actions/actionCreators';
import * as legacySnapMigration from '../lib/legacySnapMigration';

import { initialState, notedReducer } from '../reducers/notedReducer';

import Noted from '../components/Noted';

export default function NotedApp() {
  const [state, dispatch] = useReducer(notedReducer, initialState);

  // Ensure Mousetrap fires even if focus is within input fields
  Mousetrap.prototype.stopCallback = (e, element, combo) => false;

  Mousetrap.bind(['mod+d'], () => {
    const filename = state.files[state.fileIndex];

    if (filename && confirm(`Are you sure you want to delete: ${filename}?`)) {
      dispatch(ActionCreators.deleteFile(state.allFiles, filename));
    }

    return false;
  });

  const checkForNotesToMigrate = () => {
    logger('debug', 'Checking for legacy snap notes');

    if (legacySnapMigration.isSnapPlatform()) {
      const legacyFiles = legacySnapMigration.checkForLegacyNotes();

      if (legacyFiles.length) {
        const confirmMessage = "It looks like Noted has been updated and found some notes from an old version.\n\nShould Noted recover the notes?";

        if (confirm(confirmMessage)) {
          logger('debug', 'Migrating legacy notes');

          legacySnapMigration.migrateLegacyNotes(legacyFiles);

          logger('debug', 'Notes migrated');
        }

        logger('debug', 'Renaming directory');

        legacySnapMigration.renameLegacyNotesDirectory();

        logger('debug', 'Legacy directory renamed');
      }
    }
  }

  return <Noted {...state} {...ActionCreators} dispatch={dispatch} onInit={checkForNotesToMigrate} />;
}