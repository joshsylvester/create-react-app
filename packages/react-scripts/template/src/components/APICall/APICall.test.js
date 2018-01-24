import React from 'react';
import { shallow, mount } from 'enzyme';

jest.mock('./APICall');
import APICall from './APICall';

describe('APICall', () => {
  it('should mount without crashing', async () => {
    expect.assertions(1);
    const wrapper = await mount(<APICall />);
    expect(wrapper).toBeDefined();
  });

  it('should set html accordingly to states', async () => {
    const wrapper = await shallow(<APICall />);

    const data = {
      test: 'data',
    };
    wrapper.setState({
      data: JSON.stringify(data),
    });

    setTimeout(() => {
      expect(wrapper.state('data')).toEqual(false);
      expect(wrapper.state('hasLoaded')).toEqual(true);
    }, 100);
  });

  it('should go to fail state if bad API call', () => {
    const wrapper = mount(<APICall url="FDASFASFDASFDAVAFVW" />);
    setTimeout(() => {
      expect(wrapper.state('data')).toEqual(false);
      expect(wrapper.state('hasLoaded')).toEqual(false);
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
