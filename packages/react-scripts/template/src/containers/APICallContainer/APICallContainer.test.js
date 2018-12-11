import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  APICallContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './APICallContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('APICallContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store = null;
  });

  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <APICallContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('maps state and dispatch to props', () => {
    const fetchDataMock = jest.fn();
    const wrapper = shallow(<Provider store={store}>
      <APICallContainer fetchData={fetchDataMock} />
    </Provider>);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      fetchData: fetchDataMock,
    }));
  });

  it('calls mapStateToProps properly', () => {
    const mockData = {
      data: true,
      hasLoaded: true,
    };
    const mockState = {
      APICall: mockData,
    };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(mockData);
  });

  it('calls mapDispatchToProps properly', () => {
    const mockDispatch = jest.fn();
    const result = mapDispatchToProps(mockDispatch);
    expect(result).toEqual(expect.objectContaining({
      fetchData: expect.any(Function),
    }));

    result.fetchData('');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
