import React from 'react';
import { shallow } from 'enzyme';
import AppHello from './AppHello';

it('renders without crashing', () => {
  const wrapper = shallow(<AppHello onSubmitHello={jest.fn()} />);
  expect(wrapper).toBeDefined();
  expect(wrapper.find('h2').text()).toEqual('Welcome to ServiceMax!');
});

it('renders custom greeting when rendered', () => {
  const wrapper = shallow(<AppHello onSubmitHello={jest.fn()} greeting="Hello SVMX" />);
  expect(wrapper.find('h2').text()).toEqual('Hello SVMX');
});
