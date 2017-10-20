import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import ContainersList from './ContainersList';

describe('ContainersList', () => {
  it('should render without crashing', () => {
    const compList = shallow(<ContainersList />);
    expect(compList).toBeDefined();
  });
  const compList = shallow(<ContainersList />);
  it('ContainersList should only have a Link inside each list item', () => {
    compList.children().forEach(child => {
      expect(child.type()).toEqual('li');
      expect(child.children().length).toEqual(1);
      expect(child.childAt(0).type()).toEqual(Link);
    });
  });

  it('ContainersList should have a Route for each app/component', () => {
    compList.children().forEach((child, index) => {
      const link = child.childAt(0);
      expect(link.props().to).toEqual(ContainersList.containers[index].path);
    });
  });
});
