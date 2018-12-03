import React from 'react';
import { mountWithContext, shallowWithContext } from 'test/withContext';
import PageContainer from './PageContainer';

describe('PageContainer', () => {
  it('shallow renders without crashing', () => {
    const wrapper = shallowWithContext(<PageContainer><div /></PageContainer>);
    expect(wrapper).toBeDefined();
  });

  it('mount renders without crashing', () => {
    const wrapper = mountWithContext(<PageContainer><div /></PageContainer>);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.Header').length).toBe(1);
  });
});
