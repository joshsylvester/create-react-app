import { fetchData } from 'services/service';
import { isEmpty } from 'lodash';

const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
const initialState = {};

export function getUserInfoSuccess(data) {
  return {
    data,
    type: USER_INFO_SUCCESS,
  };
}

export function reducer(state = initialState, action) {
  const { data } = action;
  if (action.type === USER_INFO_SUCCESS) {
    let userInfoDetails = { ...data };
    // Only Availabe In VF Page from salesforce.
    // Note: Local environment will be the default server sent.
    // So any issues related to dateTime formatting needs to be tested only in salesforce.
    const userContext = window.UserContext || {};
    if (!isEmpty(userContext)) {
      userInfoDetails = {
        ...userInfoDetails,
        timeFormat: userContext.timeFormat,
      };
    }
    return userInfoDetails;
  }
  return state;
}

export function getUserInfoAction() {
  return {
    callAPI: () => fetchData({
      jsrActionMappingKey: 'JsrGetUserInfo',
      url: '/getUserInfo/',
    }),
    httpLoadTrackingKey: 'userInfoLoading',
    isHttpAction: true,
    responseHandler: (dispatch, promise) => {
      promise.then(data => {
        dispatch({
          data,
          type: USER_INFO_SUCCESS,
        });
      });
    },
  };
}

function fetchUserInfoData() {
  return dispatch => {
    dispatch(getUserInfoAction());
  };
}

export default fetchUserInfoData;