const localhostServUrl = 'http://localhost:5000';
export function apiFetchDataSuccess(data) {
  return {
    data,
    type: 'API_FETCH_DATA_SUCCESS',
  };
}

export function apiDataIsLoading(bool) {
  return {
    hasLoaded: bool,
    type: 'API_DATA_IS_LOADING',
  };
}

export function apiDataHasError(bool) {
  return {
    hasErrored: bool,
    type: 'API_DATA_HAS_ERROR',
  };
}

export function handleLocal(dispatch) {
  // This url is the external Salesforce URL that gets executed by the local node server
  const url = '/services/data/v41.0/query?q=Select Id, Name from Account Limit 5';

  // Call "through" the local node server for local development
  fetch(`${localhostServUrl}/get?url=${url}`)
    .then(response => {
      if (!response.ok) {
        dispatch(apiDataHasError(true));
      }

      dispatch(apiDataIsLoading(false));

      return response;
    })
    .then(response => response.json())
    .then(items => dispatch(apiFetchDataSuccess(items.records)))
    .catch(() => dispatch(apiDataHasError(true)));
}

export function handleRemote(dispatch) {
  if (window && window.ReactTestJSR) {
    window.ReactTestJSR.JsrGetAccountData('{}', result => {
      dispatch(apiFetchDataSuccess(result));
    });
  }
}

export function apiSFFetchData() {
  return dispatch => {
    dispatch(apiDataIsLoading(true));
    if (window && window.isRemote) {
      handleRemote(dispatch);
    } else {
      handleLocal(dispatch);
    }
  };
}

const initialState = {
  data: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API_FETCH_DATA_SUCCESS':
      return { data: action.data, hasLoaded: true };
    default:
      return state;
  }
}
