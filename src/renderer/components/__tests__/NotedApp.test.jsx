import React from 'react';

import { shallow } from 'enzyme';

import NotedApp from '../NotedApp'

describe('<NotedApp />', () => {
    it('should render', () => {
        const component = shallow(<NotedApp />);

        const introText = component.find('h1').text()

        expect(introText).toBe('Noted')
    });
});
