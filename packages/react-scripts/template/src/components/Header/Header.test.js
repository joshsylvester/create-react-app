import React from 'react';
import { shallowWithContext, mountWithContext } from 'test/withContext';
import { Header } from './Header';

it('shallow renders without crashing', () => {
  const wrapper = shallowWithContext(<Header match={{ url: '/' }} />);
  expect(wrapper).toBeDefined();
});

it('mount renders without crashing', () => {
  const wrapper = mountWithContext(<Header match={{ url: '/' }} />);
  expect(wrapper).toBeDefined();
  expect(wrapper.find('header').hasClass('Header')).toBe(true);
  expect(wrapper.find('Link').length).toBe(3);
  expect(wrapper.find('Link.Header__link--selected').length).toBe(0);
});

it('highlights the current route', () => {
  const wrapper = mountWithContext(<Header match={{ url: '/apicall' }} />);
  expect(wrapper.find('Link.Header__link--selected').length).toBe(1);
  expect(wrapper.find('Link.Header__link--selected').text()).toBe('APICall');
});
