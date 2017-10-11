import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';

import { Switch, Route } from 'react-router';
import { Link, BrowserRouter } from 'react-router-dom';
import * as Components from './ComponentsList';

const components = [];

Object.keys(Components).forEach(val => {
  if (Components[val]) {
    components.push({
      name: val,
      comp: Components[val],
      path: `/${val}`,
    });
  }
});

const ComponentsListHeader = () => (
  <div className="component-list-header">Components List</div>
);

const ComponentsList = () => (
  <div className="components-list">
    <ComponentsListHeader />
    <ul>
      {components.map(comp => (
        <li key={comp.name}>
          {/* Path is the same as component name + / */}
          <Link to={comp.path}>{comp.name}</Link>
        </li>
      ))}
    </ul>
    <div className="notice">
      run <b>npm run tree</b> to update component list
    </div>
  </div>
);

export default class App extends React.PureComponent {
  static propTypes = {
    onSubmitHello: PropTypes.func.isRequired,
    greeting: PropTypes.string,
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="route-container">
                <ComponentsList />
              </div>
            )}
          />
          {components.map(comp => (
            <Route
              key={comp.path}
              exact
              path={comp.path}
              render={() => (
                <div className="route-container">
                  {React.createElement(comp.comp, this.props)}
                </div>
              )}
            />
          ))}
        </Switch>
      </BrowserRouter>
    );
  }
}
