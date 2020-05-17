const path = require('path');
const {app} = require('electron');

if (process.platform === 'linux' && process.env.SNAP) {
	app.setPath(
		'userData',
		path.join(process.env.SNAP_USER_COMMON, '.config', app.getName()));

	app.setAppLogsPath();
}

const userDataPath = app.getPath('userData');
const logPath = app.getPath('logs');

module.exports = {userDataPath,logPath};
