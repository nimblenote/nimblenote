const test = require('ava');

const MenuBar = require('./menu-bar');

const macMenuBar = new MenuBar({isMac: true, appName: 'nimblenote'});
const nonMacMenuBar = new MenuBar({isMac: false, appName: 'nimblenote'});

test('it will generate a macOS menu', t => {
	const template = macMenuBar.getTemplate();

	const macMenuItems = template.map(item => {
		return item.label || item.role;
	});

	t.deepEqual(macMenuItems, ['nimblenote', 'File', 'Edit', 'View', 'Window', 'help']);
});

test('it will generate a non-macOS menu for other platforms', t => {
	const template = nonMacMenuBar.getTemplate();

	const nonMacMenuItems = template.map(item => {
		return item.label || item.role;
	});

	t.deepEqual(nonMacMenuItems, ['File', 'Edit', 'View', 'Window', 'help']);
});
