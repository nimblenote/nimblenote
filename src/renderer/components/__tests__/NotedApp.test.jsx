import React from 'react';

import { shallow } from 'enzyme';

import Noted from '../Noted';
import TitleBar from '../TitleBar';

describe('<Noted />', () => {
    it('should render', () => {
        const component = shallow(<Noted />);

        expect(component.contains(<TitleBar />)).toBe(true)
    });
});
