import path from 'path';

import { app } from 'electron';

if (process.platform === 'linux' && process.env.SNAP) {
  app.setPath(
    'userData',
    path.join(process.env.SNAP_USER_COMMON, '.config', app.getName()),
  );

  app.setAppLogsPath();
}

export const userDataPath = app.getPath('userData');
export const logPath = app.getPath('logs');
