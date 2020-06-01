const test = require('ava');
const MarkdownAction = require('./markdown-action');

test('it will mark checkbox as done', t => {
	const text = `Hello

- [ ] buy apples
- [x] buy bananas

All good.`;

	let action = new MarkdownAction({text});
	let result = action.atCursor({line: 2, ch: 3});

	t.deepEqual(result, {
		type: 'checkbox',
		key: 'buy apples',
		value: true,
		text: `Hello

- [x] buy apples
- [x] buy bananas

All good.`
	});

	action = new MarkdownAction({text: result.text});
	result = action.atCursor({line: 3, ch: 0});

	t.deepEqual(result, {
		type: 'checkbox',
		key: 'buy bananas',
		value: false,
		text: `Hello

- [x] buy apples
- [ ] buy bananas

All good.`
	});
});
