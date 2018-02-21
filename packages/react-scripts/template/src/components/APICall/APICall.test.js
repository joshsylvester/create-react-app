import React from 'react';
import { shallow, mount } from 'enzyme';

//jest.mock('./APICall');
import APICall from './APICall';

describe('APICall', () => {
  const fetchFn = jest.fn();

  it('should mount without crashing', () => {
    expect.assertions(1);
    const wrapper = mount(<APICall fetchData={fetchFn} />);
    expect(wrapper).toBeDefined();
  });

  it('should mount with default props', () => {
    const wrapper = mount(<APICall fetchData={fetchFn} />);
    expect(wrapper.prop('url')).toEqual('http://date.jsontest.com/');
    expect(wrapper.prop('data')).toBe(null);
    expect(wrapper.prop('hasLoaded')).toBe(false);
    expect(wrapper.prop('hasErrored')).toBe(false);
    expect(wrapper.find('.APICall').length).toBe(1);
  });

  it('should mount initially with the state set properly', () => {
    const wrapper = mount(<APICall fetchData={fetchFn} />);
    expect(wrapper.state('data')).toEqual(null);
    expect(wrapper.state('hasLoaded')).toEqual(false);
    expect(fetchFn).toHaveBeenCalled();
  });

  it('should call componentDidMount', () => {
    const spy = jest.spyOn(APICall.prototype, 'componentDidMount');
    const wrapper = mount(<APICall fetchData={fetchFn} />);
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('should throw an error if used without a fetchData function', () => {
    try {
      mount(<APICall fetchData={fetchFn} />);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toMatch('/fetchData/');
    };
  });

  it('should set html accordingly to states', () => {
    const wrapper = shallow(<APICall fetchData={fetchFn} />);
    const data = {
      test: 'data',
    };
    const stringData = JSON.stringify(data);
    wrapper.setState({
      data: stringData,
      hasLoaded: true,
    });

    expect(wrapper.state('data')).toEqual(stringData);
    expect(wrapper.state('hasLoaded')).toEqual(true);
    expect(wrapper.find('.APICall__data').length).toBe(1);
  });

  it('should set render fail state accordingly to states', () => {
    const wrapper = shallow(<APICall fetchData={fetchFn} />);
    wrapper.setState({
      hasLoaded: false,
      hasErrored: true,
    });

    expect(wrapper.state('hasErrored')).toEqual(true);
    expect(wrapper.find('.APICall--error').length).toBe(1);
  });
});
