import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ComponentsList from './ComponentsList';

const appComponents = ComponentsList.components;
const ComponentsListHeader = () => (
  <div className="component-list-header">Components List</div>
);
const Notice = () => (
  <div className="notice">
    run <b>npm run tree</b> to update component list
  </div>
);

const App = props => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <div className="route-container">
            <ComponentsListHeader />
            <ComponentsList />
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
              {React.createElement(comp.component, props)}
            </div>
          )}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default App;
