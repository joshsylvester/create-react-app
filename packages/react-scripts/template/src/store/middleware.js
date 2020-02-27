import { compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reduxLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { actionLoadingMiddleware } from './loading';
import httpRequestLoadingMiddleware from './httpRequestLoadingMiddleware';

let composeEnhancers = compose;

/* eslint-disable no-underscore-dangle */
if (typeof __DEV__ !== 'undefined' && typeof __TEST__ === 'undefined'
  && global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}
/* eslint-enable no-underscore-dangle */

const middlewares = [
  actionLoadingMiddleware,
  promiseMiddleware,
  reduxLogger,
  httpRequestLoadingMiddleware,
  thunkMiddleware,
];

function makeEnhancers() {
  /* eslint-disable function-paren-newline */
  return composeEnhancers(
    applyMiddleware(...middlewares),
  );
  /* eslint-enable function-paren-newline */
}

export {
  makeEnhancers,
  middlewares,
};
