import React from 'react';

import { shallow } from 'enzyme';

import NotedApp from '../NotedApp';
import TitleBar from '../TitleBar';

describe('<NotedApp />', () => {
    it('should render', () => {
        const component = shallow(<NotedApp />);

        expect(component.contains(<TitleBar />)).toBe(true)
    });
});
