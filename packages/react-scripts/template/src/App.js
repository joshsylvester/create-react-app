import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import makeStore from 'store';
import Routes from './Routes';

const store = makeStore();

/**
 * This will be the application file for everything that happens in your app.
 *
 * Note the two wrapping components that are added here - <Provider> for the react-redux connection,
 * and <BrowserRouter> to handle routing within the browser. The <Routes> are kept seperately to
 * allow those routes to be unit tested using <MemoryRouter>, since <BrowserRouter> won't work in a
 * unit test without mocking.
 *
 * To add a new route, or change how the current routes work - you should start in Routes.js
 */
const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>
);

export default App;
