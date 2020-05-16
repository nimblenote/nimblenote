import path from 'path';

export default class NotesHandler {
	constructor(notesPath, fsHandler) {
		this.path = notesPath;
		this.fs = fsHandler;
	}

	setup() {
		if (this.fs.existsSync(this.path) === false) {
			this.fs.mkdirSync(this.path);
		}
	}

	path() {
		return this.path;
	}

	list() {
		return this.fs.readdirSync(this.path);
	}

	exists(filename) {
		return this.fs.existsSync(path.join(this.path, filename));
	}

	read(filename) {
		return this.fs.readFileSync(path.join(this.path, filename), 'utf8');
	}

	write(filename, contents) {
		return this.fs.writeFileSync(
			path.join(this.path, filename),
			contents,
			'utf8',
			);
	}

	delete(filename) {
		return this.fs.unlinkSync(path.join(this.path, filename));
	}
}
