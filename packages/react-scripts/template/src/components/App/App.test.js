import React from 'react';
import { shallow } from 'enzyme';
import App, {
  ComponentsList,
  ComponentsListHeader,
  Notice,
  Component,
} from './App';
import AppHello from 'components/AppHello';
import Hello from 'components/Hello';
import { Link } from 'react-router-dom';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App onSubmitHello={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });

  const apps = [
    new Component({
      name: '',
      comp: <ComponentsList />,
    }),
    new Component({
      name: 'Hello',
      comp: <Hello onSubmit={jest.fn()} />,
    }),
    new Component({
      name: 'AppHello',
      comp: <AppHello onSubmitHello={jest.fn()} />,
    }),
  ];

  it('should render ComponentsList without crashing', () => {
    const compList = shallow(<ComponentsList components={apps} />);
    expect(compList).toBeDefined();
  });

  it('should render ComponentsListHeader without crashing', () => {
    const header = shallow(<ComponentsListHeader />);
    expect(header).toBeDefined();
  });

  it('should render Notice without crashing', () => {
    const notice = shallow(<Notice />);
    expect(notice).toBeDefined();
  });

  const compList = shallow(<ComponentsList components={apps} />);

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
      expect(link.props().to).toEqual(apps[index]['path']);
    });
  });

  it('should have a Route for each app/component', () => {
    const app = shallow(<App componentsList={apps} />);
    const routes = app.find('Route');

    routes.forEach((route, index) => {
      const { path } = route.props();
      if (index === 0) {
        expect(path).toBe('/');
        return;
      }

      expect(path).toEqual(apps[index - 1].path);
    });
  });
});
