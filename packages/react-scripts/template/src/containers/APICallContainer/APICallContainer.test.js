import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { makeStore } from 'store';
import { APICallContainer } from './APICallContainer';


const store = makeStore();

describe('APICallContainer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <APICallContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
});
