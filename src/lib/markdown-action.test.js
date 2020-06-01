const test = require('ava');
const MarkdownAction = require('./markdown-action');

const text = `Hello

- [ ] buy apples
- [x] buy bananas

Test [a link](https://abc.com) and [another](http://123.co.uk) here.

Must finish [my todo](todo) list.

All good.`;

test('it will mark checkbox as done', t => {
	let action = new MarkdownAction({text});
	let result = action.atCursor({line: 2, ch: 3});

	t.deepEqual(result, {
		type: 'checkbox',
		key: 'buy apples',
		value: true,
		text: `Hello

- [x] buy apples
- [x] buy bananas

Test [a link](https://abc.com) and [another](http://123.co.uk) here.

Must finish [my todo](todo) list.

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

Test [a link](https://abc.com) and [another](http://123.co.uk) here.

Must finish [my todo](todo) list.

All good.`
	});
});

test('it will return an external URL to visit', t => {
	const action = new MarkdownAction({text});
	let result = action.atCursor({line: 5, ch: 52});

	t.deepEqual(result, {
		type: 'externalLink',
		key: 'another',
		value: 'http://123.co.uk'
	});

	result = action.atCursor({line: 5, ch: 29});

	t.deepEqual(result, {
		type: 'externalLink',
		key: 'a link',
		value: 'https://abc.com'
	});
});

test('it will return an internal note to visit', t => {
	const action = new MarkdownAction({text});
	const result = action.atCursor({line: 7, ch: 15});

	t.deepEqual(result, {
		type: 'internalLink',
		key: 'my todo',
		value: 'todo'
	});
});

test('it will not action an external link if cursor outside', t => {
	const action = new MarkdownAction({text});
	const result = action.atCursor({line: 5, ch: 0});

	t.is(result, undefined);
});

test('it will do nothing if no action found', t => {
	const action = new MarkdownAction({text});
	const result = action.atCursor({line: 7, ch: 1});

	t.is(result, undefined);
});
