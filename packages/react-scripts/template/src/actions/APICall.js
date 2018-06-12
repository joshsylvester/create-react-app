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

export function apiFetchData(url) {
  return (dispatch) => {
    dispatch(apiDataIsLoading(true));

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(apiDataIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => dispatch(apiFetchDataSuccess(items)))
      .catch(() => dispatch(apiDataHasError(true)));
  };
}

const initialState = {
  data: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'API_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

