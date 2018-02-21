import { combineReducers } from 'redux';
import { actionLoadingReducer } from './loading';

import { reducer as helloReducer } from 'actions/hello';
import { reducer as SFCall } from 'actions/SFCall';

export default function makeReducer() {
  return combineReducers({
    hello: helloReducer,
    loading: actionLoadingReducer,
    SFCall,
  });
}
