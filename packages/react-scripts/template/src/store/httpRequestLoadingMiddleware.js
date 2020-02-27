/**
 * When you call an asynchronous API, there are two crucial moments in time: the moment you start
 * the call, and the moment when you receive an answer (or a timeout). Each of these two moments 
 * usually require a change in the application state; to do that, you need to dispatch normal 
 * actions that will be processed by reducers synchronously. Usually, for any API request you'll
 * want to dispatch at least three different kinds of actions:
 * 
 * HTTP_REQUEST_LOADING
 * An action informing the reducers that the request began: The reducers may handle this action by
 * toggling an `httpLoadTrackingKey` flag in state. This way UI knows it's time to show a spinner.
 * 
 * HTTP_REQUEST_LOADED
 * An action informing the reducers that the request finished successfully: The reducers may handle
 * this action by merging the new data into the state they manage & resetting `httpLoadTrackingKey`.
 * The UI would hide the spinner, and display the fetched data.
 * 
 * HTTP_REQUEST_FAILED
 * An action informing the reducers that the request failed: The reducers may handle this action by
 * resetting `httpLoadTrackingKey`. Additionally, some reducers may want to store the error message
 * so the UI can display it.
 */

const HTTP_REQUEST_LOADING = 'HTTP_REQUEST_LOADING';
const HTTP_REQUEST_FAILED = 'HTTP_REQUEST_FAILED';
const HTTP_REQUEST_LOADED = 'HTTP_REQUEST_LOADED';

const httpRequestInProgress = (dispatch, httpRequestTrackingKey) => {
  dispatch({
    type: 'HTTP_REQUEST_LOADING',
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
};
const httpRequestFailure = (dispatch, httpRequestTrackingKey) => {
  dispatch({
    type: 'HTTP_REQUEST_FAILED',
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
};
const httpRequestSuccess = (dispatch, httpRequestTrackingKey) => {
  dispatch({
    type: 'HTTP_REQUEST_LOADED',
    httpLoadTrackingKey: httpRequestTrackingKey,
  });
};

const getHttpResponseDataHandler = (
  dispatch,
  serviceResponse,
  httpRequestTrackingKey,
) => {
  return new Promise((resolve, reject) => {
    if (!serviceResponse.success) {
      httpRequestFailure(dispatch, httpRequestTrackingKey);
      reject(serviceResponse);
    } else {
      resolve(serviceResponse.data);
    }
  });
};

const httpRequestLoadingMiddleware = ({ dispatch }) => {
  return next => action => {
    const {
      isHttpAction,
      callAPI,
      httpLoadTrackingKey,
      // used to pass remaining props from dispatch action along
    } = action;
    // if we don't have the `isHttpAction` prop
    // we're not supposed to intercept it with this middleware... move it along
    if (!isHttpAction) {
      return next(action);
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    // dispatch the request action
    httpRequestInProgress(dispatch, httpLoadTrackingKey);

    const api = callAPI();
    return api
      .then(serviceResponse => {
        const responsePromise = getHttpResponseDataHandler(
          dispatch,
          serviceResponse,
          httpLoadTrackingKey,
        );
        const returnPromise = action.responseHandler(dispatch, responsePromise);
        if (returnPromise) {
          returnPromise
            .then(() => {
              httpRequestSuccess(dispatch, httpLoadTrackingKey);
            })
            .catch(() => {
              httpRequestFailure(dispatch, httpLoadTrackingKey);
            });
        } else {
          httpRequestSuccess(dispatch, httpLoadTrackingKey);
        }
      })
      .catch(jsrErrorEvent => {
        const responsePromise = getHttpResponseDataHandler(
          dispatch,
          jsrErrorEvent,
          httpLoadTrackingKey,
        );
        action.responseHandler(dispatch, responsePromise);
      });
  };
};

export const httpRequestLoadingReducer = (state = {}, action) => {
  if (action.httpLoadTrackingKey) {
    const { httpLoadTrackingKey, type } = action;
    switch (type) {
      case HTTP_REQUEST_LOADING:
        return { ...state, [httpLoadTrackingKey]: true };
      case HTTP_REQUEST_FAILED:
      case HTTP_REQUEST_LOADED: {
        return { ...state, [httpLoadTrackingKey]: false };
      }
      default:
        return state;
    }
  }
  return state;
};

export default httpRequestLoadingMiddleware;
