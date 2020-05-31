const path = require('path');

module.exports = class Preferences {
	constructor(options, overrides = {}) {
		this._userDataPath = options.userDataPath;
		this._overrides = overrides;

		this._defaults = {
			windowWidth: 400,
			windowHeight: 600,
			fileListHeight: 95,
			notesStoragePath: path.join(this._userDataPath, 'notes')
		};

		this._store = new options.StoreClass({
			name: 'nimblenote',
			defaults: this._defaults
		});
	}

	get(key) {
		if (key in this._overrides) {
			return this._overrides[key];
		}

		return this._store.get(key);
	}

	set(key, value) {
		return this._store.set(key, value);
	}
};
