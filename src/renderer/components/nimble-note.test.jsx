const test = require('ava');
const React = require('react');
const {shallow} = require('enzyme');

const NimbleNote = require('./NimbleNote');
const TitleBar = require('./TitleBar');

test('NimbleNote contains TitleBar', t => {
	const component = shallow(<NimbleNote/>);

	t.true(component.contains(<TitleBar/>));
});
