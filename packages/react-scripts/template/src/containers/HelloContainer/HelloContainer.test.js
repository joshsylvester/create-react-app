import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  HelloContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './HelloContainer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('HelloContainer', () => {
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
        <HelloContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls sayHello from onSubmitHello', () => {
    const sayHello = jest.fn();
    const wrapper = shallow(<HelloContainer sayHello={sayHello} />);
    wrapper.instance().onSubmitHello({ name: 'foo' });
    expect(sayHello.mock.calls.length).toEqual(1);
  });

  it('expect the props to be what was passed in.', () => {
    const sayHello = jest.fn();
    const wrapper = shallow(
      <Provider store={store}>
        <HelloContainer sayHello={sayHello} />
      </Provider>);
    expect(wrapper).toBeDefined();
    expect(wrapper.props()).toEqual(expect.objectContaining({
      sayHello: expect.any(Function),
    }));
  });

  it('calls mapStateToProps properly', () => {
    const mockData = {
      greeting: 'hello!',
      loading: false,
    };
    const mockState = {
      hello: {
        greeting: 'hello!',
      },
      loading: false,
    };
    const result = mapStateToProps(mockState);
    expect(result).toEqual(mockData);
  });

  it('calls mapDispatchToProps properly', () => {
    const mockDispatch = jest.fn();
    const result = mapDispatchToProps(mockDispatch);
    expect(result).toEqual(expect.objectContaining({
      sayHello: expect.any(Function),
    }));

    result.sayHello('');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
