import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ComponentsList from './ComponentsList';
import ContainersList from './ContainersList';
import './App.scss';

const appComponents = ComponentsList.components;
const appContainers = ContainersList.containers;
const ComponentsListHeader = () => (
  <div className="components-list-header">Components List</div>
);
const ContainersListHeader = () => (
  <div className="containers-list-header">Containers List</div>
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

            <ContainersListHeader />
            <ContainersList />

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
      {appContainers.map(comp => (
        <Route
          key={comp.path}
          exact
          path={comp.path}
          render={() => (
            <div className="route-container">
              {React.createElement(comp.container, props)}
            </div>
          )}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default App;
