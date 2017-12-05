import React from 'react';
import { shallow, mount } from 'enzyme';

import APICall from './APICall';

describe('APICall', () => {
  it('should mount without crashing', () => {
    const wrapper = mount(<APICall />);
    expect(wrapper).toBeDefined();
  });

  it('should set html accordingly to states', () => {
    const wrapper = shallow(<APICall />);
    expect(wrapper.find('.api-call > div').text()).toEqual('Loading..');

    wrapper.setState({
      hasLoaded: true,
    });

    expect(wrapper.find('.api-call > div').text()).toEqual('Error on fetch!');

    const data = {
      test: 'data',
    };
    wrapper.setState({
      data: JSON.stringify(data),
    });

    expect(wrapper.find('.api-call > div').text()).toEqual(
      JSON.stringify(data),
    );
  });

  it('should go to fail state if bad API call', () => {
    const wrapper = mount(<APICall url="FDASFASFDASFDAVAFVW" />);
    setTimeout(() => {
      expect(wrapper.state('data')).toEqual(false);
      expect(wrapper.state('hasLoaded')).toEqual(true);
    }, 100);
  });

  it('should go to loaded state if successful API call', () => {
    const wrapper = mount(<APICall />);
    setTimeout(() => {
      expect(wrapper.state('data')).toEqual(true);
      expect(wrapper.state('hasLoaded')).toEqual(true);
    }, 100);
  });
});
