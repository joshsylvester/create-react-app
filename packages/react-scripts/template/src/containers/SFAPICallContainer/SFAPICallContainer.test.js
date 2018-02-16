import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { makeStore } from 'store';
import { SFAPICallContainer } from './SFAPICallContainer';

const store = makeStore();

describe('SFAPICallContainer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SFAPICallContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('maps state and dispatch to props', () => {
    const fetchData = jest.fn();
    const wrapper = shallow(<SFAPICallContainer fetchData={fetchData} />);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      fetchData: expect.any(Function),
    }));
  });
});
