import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { makeStore } from 'store';
import { APICallContainer } from './SFAPICallContainer';

const store = makeStore();

describe('SFAPICallContainer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SFAPICallContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });
});
