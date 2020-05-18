const test = require('ava');
const React = require('react');
const {shallow} = require('enzyme');

const Noted = require('./Noted');
const TitleBar = require('./TitleBar');

test('Noted contains TitleBar', t => {
	const component = shallow(<Noted/>);

	t.true(component.contains(<TitleBar/>));
});
