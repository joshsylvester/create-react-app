import React from 'react';
import { mount } from 'enzyme';

import APICall from './APICall';

describe('APICall', () => {
  it('should mount without crashing', () => {
    expect.assertions(1);
    const wrapper = mount(<APICall />);
    expect(wrapper).toBeDefined();
  });

  it('should mount with default props', () => {
    const wrapper = mount(<APICall />);
    expect(wrapper.prop('data')).toBe(null);
    expect(wrapper.prop('hasLoaded')).toBe(false);
    expect(wrapper.prop('hasError')).toBe(false);
    expect(wrapper.prop('url')).toEqual('');
    expect(wrapper.find('.APICall').length).toBe(1);
  });

  it('should set html accordingly to if data is passed in', () => {
    const testData = {
      test: 'data',
    };
    const wrapper = mount(<APICall data={testData} hasLoaded />);
    expect(wrapper.prop('data')).toEqual(testData);
    expect(wrapper.prop('hasLoaded')).toBe(true);
    expect(wrapper.find('.APICall__data').length).toBe(1);
  });

  it('should set render fail state accordingly to props passed in', () => {
    const wrapper = mount(<APICall hasLoaded hasError />);
    expect(wrapper.prop('hasError')).toBe(true);
    expect(wrapper.find('.APICall--error').length).toBe(1);
  });
});
