const path = require('path');

const test = require('ava');

const Preferences = require('./preferences');

class InMemoryStore {
  constructor(options) {
    this._data = options.defaults;
  }

  get(key) {
    return this._data[key];
  }

  set(key, value) {
    this._data[key] = value;
  }
}

test('create a new preference store with defaults', t => {
  const expectedPath = path.join('~', 'NotedNotes');

  const preferences = new Preferences({StoreClass: InMemoryStore, userDataPath: '~'});

  t.is(preferences.get('windowWidth'), 400);
  t.is(preferences.get('windowHeight'), 600);
  t.is(preferences.get('notesStoragePath'), expectedPath);
});

test('it can set preferences', t => {
  const preferences = new Preferences({StoreClass: InMemoryStore, userDataPath: '~'});

  t.is(preferences.get('windowWidth'), 400);

  preferences.set('windowWidth', 200);

  t.is(preferences.get('windowWidth'), 200);
});
