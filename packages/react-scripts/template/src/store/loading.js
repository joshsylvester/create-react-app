import { isEmpty } from 'lodash';

let loadingByType = {};
const loadingType = action => action.type.replace(/\/.*/, '/loading');

function setActionLoading(dispatch, action) {
  loadingByType[action.type] = true;
  dispatch({
    payload: true,
    type: loadingType(action),
  });
}

function unsetActionLoading(dispatch, action) {
  delete loadingByType[action.type];
  setTimeout(() => {
    dispatch({
      payload: false,
      type: loadingType(action),
    });
  }, 1);
}

// Allow the loadingByType object for testing.
export function setLoadingByType(loadingArray) {
  loadingByType = loadingArray;
}

export function actionLoadingMiddleware({ dispatch }) {
  return next => (action) => {
    // If promise
    if (action.payload && action.payload.then) {
      setActionLoading(dispatch, action);
      return action.payload
        .then((result) => {
          unsetActionLoading(dispatch, action);
          dispatch({ ...action, payload: result });
          return result;
        })
        .catch((err) => {
          unsetActionLoading(dispatch, action);
          dispatch({
            ...action,
            error: err,
            payload: undefined,
          });
        });
    }

    // Continue
    return next(action);
  };
}

export function actionLoadingReducer(state = false, action) {
  if (action.type.indexOf('/loading') > 0) {
    if (action.payload) {
      return true;
    } else if (isEmpty(loadingByType)) {
      return false;
    }
  }
  return state;
}
