import { combineReducers } from 'redux';
import { reducer as helloReducer } from 'actions/hello';
import { reducer as SFCall } from 'actions/SFCall';
import { actionLoadingReducer } from './loading';

export default function makeReducer() {
  return combineReducers({
    hello: helloReducer,
    loading: actionLoadingReducer,
    SFCall,
  });
}
