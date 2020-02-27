import { combineReducers } from 'redux';
import { reducer as helloReducer } from 'actions/hello';
import { reducer as APICall } from 'actions/APICall';
import { reducer as SFCall } from 'actions/SFCall';
import { actionLoadingReducer } from './loading';
import { httpRequestLoadingReducer } from './httpRequestLoadingMiddleware';
import { reducer as getUserInfo } from '../actions/UserInfoAction';

export default function makeReducer() {
  return combineReducers({
    APICall,
    hello: helloReducer,
    httpRequestStatus: httpRequestLoadingReducer,
    loading: actionLoadingReducer,
    SFCall,
    UserInfo: getUserInfo,
  });
}
