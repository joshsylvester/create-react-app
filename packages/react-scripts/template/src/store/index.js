import { createStore } from 'redux';
import makeReducer from './reducer';
import { makeEnhancers } from './middleware';

export default function makeStore(initialState = {}) {
  return createStore(makeReducer(), initialState, makeEnhancers());
}
