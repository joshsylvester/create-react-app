import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Components from './ComponentsList';

let components = [];

/**
 * Each component takes the structure of
 * { name: String, comp: ReactElement, path: '/{name}' }
 *
 *  @class Component
 */
class Component {
  constructor({ name = '', comp = null }) {
    this.name = name;
    this.comp = comp;
    this.path = '/' + name;
  }
}

Object.keys(Components).forEach(val => {
  if (Components[val])
    components.push(
      new Component({
        name: val,
        comp: Components[val],
      })
    );
});

const ComponentsListHeader = () => (
  <div className="component-list-header">Components List</div>
);

const ComponentsList = ({ components }) => (
  <ul div="components-list">
    {components.map(comp => (
      <li key={comp.name}>
        {/* Path is the same as component name + / */}
        <Link to={comp.path}>{comp.name}</Link>
      </li>
    ))}
  </ul>
);

const Notice = () => (
  <div className="notice">
    run <b>npm run tree</b> to update component list
  </div>
);

export default class App extends React.PureComponent {
  static propTypes = {
    componentsList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        comp: PropTypes.node.isRequired,
      })
    ),
  };
  render() {
    const appComponents = this.props.componentsList || components;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="route-container">
                <ComponentsListHeader />
                <ComponentsList components={appComponents} />
                <Notice />
              </div>
            )}
          />
          {appComponents.map(comp => (
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
export { ComponentsList, ComponentsListHeader, Notice, Component };
