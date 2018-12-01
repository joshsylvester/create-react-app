import mockStore from 'test/mock-store';
import {
  apiFetchData,
  apiDataHasError,
  apiDataIsLoading,
  apiFetchDataSuccess,
  fetchDataFromUrl,
  reducer,
} from './APICall';

describe('actions and reducer', () => {
  it('should create a getData action', () => {
    expect(apiFetchDataSuccess({ type: 'test' })).toEqual({
      data: { type: 'test' },
      type: 'API_FETCH_DATA_SUCCESS',
    });
  });

  it('should change the state and return the new state', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, {
      data: { type: 'test-new' },
      type: 'API_FETCH_DATA_SUCCESS',
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      data: {
        type: 'test-new',
      },
      hasLoaded: true,
    });
  });

  it('should change data and respond with an error string', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, {
      error: 'There was an error',
      hasError: true,
      type: 'API_DATA_HAS_ERROR',
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      error: 'There was an error',
      hasError: true,
      hasLoaded: true,
      type: 'API_DATA_HAS_ERROR',
    });
  });

  it('should not change the state with an invalid type', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, {
      data: { type: 'test-new' },
      type: 'API_FETCH_NOTHING',
    });
    expect(result).toEqual(state);
  });

  it('should return the default state from the reducer', () => {
    const expectedState = { data: null, url: '' };
    const result = reducer(undefined, {
      data: { type: 'test-new' },
      type: 'API_FETCH_NOTHING',
    });
    expect(result).toEqual(expectedState);
  });

  it('should return the correct success object on apiFetch', () => {
    const data = { foo: 'bar' };
    const expectedResult = {
      data,
      type: 'API_FETCH_DATA_SUCCESS',
    };
    expect(apiFetchDataSuccess(data)).toEqual(expectedResult);
  });

  it('should return the correct isLoading object on apiFetch', () => {
    const isLoading = true;
    const expectedResult = {
      isLoading,
      type: 'API_DATA_IS_LOADING',
    };
    expect(apiDataIsLoading(isLoading)).toEqual(expectedResult);
  });

  it('should return the correct error object on apiFetch', () => {
    const hasError = true;
    const errorObj = new Error('has an error');
    const expectedResult = {
      error: errorObj.toString(),
      hasError,
      type: 'API_DATA_HAS_ERROR',
    };
    expect(apiDataHasError(hasError, errorObj)).toEqual(expectedResult);
  });
});

describe('fetching data', () => {
  let store;
  const fetchData = {
    name: 'test',
  };

  beforeEach(() => {
    store = mockStore({});
    global.fetch = undefined;
  });

  it('dispatches loading action if payload is a promise', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      data: fetchData,
      json: () => fetchData,
      ok: true,
      statusText: '',
    }));

    await fetchDataFromUrl(store.dispatch, '/');
    expect(store.getActions()).toEqual([
      {
        isLoading: false,
        type: 'API_DATA_IS_LOADING',
      },
      {
        data: fetchData,
        type: 'API_FETCH_DATA_SUCCESS',
      },
    ]);
  });

  it('dispatches an error action if payload is marked a failure', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      data: fetchData,
      json: () => fetchData,
      ok: false,
      statusText: 'there was an error',
    }));
    await fetchDataFromUrl(store.dispatch, '/');
    expect(store.getActions()).toEqual([
      {
        error: 'Error: there was an error',
        hasError: true,
        type: 'API_DATA_HAS_ERROR',
      },
    ]);
  });

  it('dispatches loading, and fetch data from apiFetchData', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      data: fetchData,
      json: () => fetchData,
      ok: true,
      statusText: '',
    }));

    await apiFetchData('/')(store.dispatch);
    expect(store.getActions()).toEqual([
      {
        isLoading: true,
        type: 'API_DATA_IS_LOADING',
      },
      {
        isLoading: false,
        type: 'API_DATA_IS_LOADING',
      },
      {
        data: fetchData,
        type: 'API_FETCH_DATA_SUCCESS',
      },
    ]);
  });
});
