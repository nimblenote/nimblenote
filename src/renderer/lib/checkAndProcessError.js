import { ipcRenderer } from 'electron';

import logger from './logger';
import * as Actions from '../actions/actionTypes';

export default function checkAndProcessError(data) {
  if (data.type !== Actions.ERROR) {
    return data;
  }

  logger.error(`showError: ${data.title}: ${data.message}`);

  ipcRenderer.send('showError', { title: data.title, content: data.message });

  return data;
}
