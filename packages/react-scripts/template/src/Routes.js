import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import HelloContainer from 'containers/HelloContainer';
import APICallContainer from 'containers/APICallContainer';
import SFAPICallContainer from 'containers/SFAPICallContainer';

/**
 * This is the default routes file for the entire app. Each route that you wish to navigate to
 * should exist below - you may nest Route files into the Container files for sub-routing - but
 * BEWARE - make sure you include your routes in a <Switch> so that it only renders the first route
 * that matches the path. Without a <Switch>, it will render every route that matches potentially
 * causing unwanted results.
 *
 * As you create your routes, it is wise to contain each route in a seperate container for
 * consistency, event if that route only renders a single component; In the Redux world, each of
 * these Containers would be where you are connecting to the Redux store, and each container should
 * have a unique mapStateToProps function.
 */
const Routes = () => (
  <Switch>
    <Route path="/hello" render={() => <HelloContainer />} />
    <Route path="/apicall" render={() => <APICallContainer />} />
    <Route path="/sfapicall" render={() => <SFAPICallContainer />} />
    <Redirect from="*" to="/hello" />
  </Switch>
);

export default Routes;
