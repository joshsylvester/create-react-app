import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import ComponentsList from './ComponentsList';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App onSubmitHello={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });

  it('should have a Route for each app/component', () => {
    const app = shallow(<App />);
    const routes = app.find('Route');

    routes.forEach((route, index) => {
      const { path } = route.props();
      if (index === 0) {
        expect(path).toBe('/');
        return;
      }

      expect(path).toEqual(ComponentsList.components[index - 1].path);
    });
  });
});
