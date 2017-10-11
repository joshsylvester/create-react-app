import React from 'react';
import { shallow } from 'enzyme';
import AppHello from './AppHello';

it('renders without crashing', () => {
  const wrapper = shallow(<AppHello onSubmitHello={jest.fn()} />);
  expect(wrapper).toBeDefined();
});
