module.exports = class MarkdownAction {
	constructor({text}) {
		this._text = text;
	}

	atCursor({line, ch}) {
		const result = this._determineAction(this._textAtLine(line), ch);

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

	_determineAction(lineText, cursorPosition) {
		let matches;

		if ((matches = [...lineText.matchAll(/\[(.*?)]\((https?:\/\/){0,1}(.+?)\)/gi)]).length > 0) {
			return this._actionLink(matches, cursorPosition);
		}

		if ((matches = lineText.match(/^\s*[-*+] (\[[ |x]]) (.*)$/))) {
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

	_actionLink(matches, cursorPosition) {
		let foundMatch;

		matches.forEach(match => {
			const start = match.index;
			const end = start + match[0].length;

			if (cursorPosition >= start && cursorPosition < end) {
				foundMatch = match;
			}
		});

		if (foundMatch) {
			return {
				type: foundMatch[2] ? 'externalLink' : 'internalLink',
				key: foundMatch[1],
				value: `${foundMatch[2] || ''}${foundMatch[3]}`
			};
		}
	}
};
