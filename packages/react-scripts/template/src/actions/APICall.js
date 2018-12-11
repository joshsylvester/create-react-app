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

export function fetchDataFromUrl(dispatch, url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(apiDataIsLoading(false));
      return response;
    })
    .then((response) => response.json())
    .then((data) => dispatch(apiFetchDataSuccess(data)))
    .catch((error) => dispatch(apiDataHasError(true, error)));
}

export function apiFetchData(url) {
  return (dispatch) => {
    dispatch(apiDataIsLoading(true));
    return fetchDataFromUrl(dispatch, url);
  };
}

const initialState = {
  data: null,
  url: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API_FETCH_DATA_SUCCESS':
      return {
        data: action.data,
        hasLoaded: true,
      };
    case 'API_DATA_HAS_ERROR':
      return {
        ...action,
        hasLoaded: true,
      };
    default:
      return state;
  }
}

