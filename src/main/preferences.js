const path = require('path');

module.exports = class Preferences {
	constructor(options) {
		this._userDataPath = options.userDataPath;

		this._defaults = {
			windowWidth: 400,
			windowHeight: 600,
			notesStoragePath: path.join(this._userDataPath, 'NotedNotes')
		};

		this._store = new options.StoreClass({
			name: 'noted',
			defaults: this._defaults
		});
	}

	get(key) {
		return this._store.get(key);
	}

	set(key, value) {
		return this._store.set(key, value);
	}
};
