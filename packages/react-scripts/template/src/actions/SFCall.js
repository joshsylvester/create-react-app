import React from 'react';
const localhostServUrl = 'http://localhost:5000';

export function apiFetchDataSuccess(data) {
  return {
    data,
    type: 'API_FETCH_DATA_SUCCESS',
  };
}

export function apiDataIsLoading(bool) {
  return {
    isLoading: bool,
    type: 'API_DATA_IS_LOADING',
  };
}

export function apiDataHasError(bool, error) {
  return {
    error: error.toString(),
    hasError: bool,
    type: 'API_DATA_HAS_ERROR',
  };
}

export function handleLocal(dispatch, config) {
  // This url is the external Salesforce URL that gets executed by the local node server
  const url = '/services/data/v41.0/query?q=Select Id, Name from Account Limit 5';

  // Call "through" the local node server for local development
  return fetch(`${localhostServUrl}/get?url=${url}`, config)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(apiDataIsLoading(false));
      return response;
    })
    .then(response => response.json())
    .then(data => dispatch(apiFetchDataSuccess(data)))
    .catch((error) => dispatch(apiDataHasError(true, error)));
}

export function handleRemote(dispatch, loadData) {
  if (window && window.ReactTestJSR) {
    return window.ReactTestJSR.JsrGetAccountData(loadData)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(apiDataIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(data => dispatch(apiFetchDataSuccess(data)))
      .catch((error) => dispatch(apiDataHasError(true, error)));
  }
  return false;
}

export function apiSFFetchData() {
  return (dispatch, config) => {
    dispatch(apiDataIsLoading(true));
    if (window && window.isRemote) {
      return handleRemote(dispatch, config);
    }
    return handleLocal(dispatch, config);
  };
}

const initialState = {
  data: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API_FETCH_DATA_SUCCESS':
      return {
        data: action.data,
        hasLoaded: true,
      };
    case 'API_DATA_HAS_ERROR':
      action.error = (
        <React.Fragment>
          <p>{action.error}</p>
          <p>Make sure that <tt>npm run sf-server</tt> is running.</p>
        </React.Fragment>
      );
      return {
        ...action,
        hasLoaded: true,
      };
    default:
      return state;
  }
}
