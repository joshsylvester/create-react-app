import { apiFetchDataSuccess, reducer, apiFetchData } from './APICall';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test actions and reducer', () => {
  it('should create a get Data action', () => {
    expect(apiFetchDataSuccess.apiFetchDataSuccess({ type: 'test' }).toEqual({
      type: 'API_FETCH_DATA_SUCCESS',
      data: { type: 'test' },
    }));
  });

  it('should change the state and return the new state', () => {
    const state = { type: 'test-new' };
    const result = reducer(state, { type: 'API_FETCH_DATA_SUCCESS', data: { type: 'test' } });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      data: { type: 'test-new' },
    });
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates API_FETCH_DATA_SUCCESS after fetching API data', () => {
    fetchMock.getOnce('/data');

    const expectedActions = [
      {
        type: 'API_FETCH_DATA_SUCCESS',
      },
    ];
    const store = mockStore({ data: [] });

    return store.dispatch(apiFetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
