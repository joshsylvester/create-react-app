import React from 'react';
import { shallow } from 'enzyme';
import ComponentsList from './ComponentsList';
import { Link } from 'react-router-dom';

describe('ComponentsList', () => {
  it('should render without crashing', () => {
    const compList = shallow(<ComponentsList />);
    expect(compList).toBeDefined();
  });
  const compList = shallow(<ComponentsList />);
  it('ComponentsList should only have a Link inside each list item', () => {
    compList.children().forEach((child, index) => {
      expect(child.type()).toEqual('li');
      expect(child.children().length).toEqual(1);
      expect(child.childAt(0).type()).toEqual(Link);
    });
  });

  it('ComponentsList should have a Route for each app/component', () => {
    compList.children().forEach((child, index) => {
      const link = child.childAt(0);
      expect(link.props().to).toEqual(ComponentsList.components[index]['path']);
    });
  });
});
