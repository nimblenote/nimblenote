module.exports = class MarkdownAction {
	constructor({text}) {
		this._text = text;
	}

	atCursor({line, _}) {
		const result = this._determineAction(
			this._textAtLine(line)
		);

		if (result && 'line' in result) {
			const lines = this._text.split('\n');
			lines[line] = result.line;
			result.text = lines.join('\n');
			delete result.line;
		}

		return result;
	}

	_textAtLine(line) {
		return this._text.split('\n')[line];
	}

	_determineAction(lineText) {
		let matches;

		if ((matches = lineText.match(/^\s?- (\[[ |x]]) (.*)$/))) {
			return this._actionToggleCheckbox(matches);
		}
	}

	_actionToggleCheckbox(matches) {
		const newValue = matches[1] === '[x]' ? '[ ]' : '[x]';

		return {
			type: 'checkbox',
			key: matches[2],
			value: newValue === '[x]',
			line: matches[0].replace(matches[1], newValue)
		};
	}
};
