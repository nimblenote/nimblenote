const React = require('react');
const {shallow} = require('enzyme');
const Noted = require('../Noted');
const TitleBar = require('../TitleBar');

describe('<Noted />', () => {
    it('should render', () => {
        const component = shallow(<Noted />);

        expect(component.contains(<TitleBar />)).toBe(true)
    });
});
