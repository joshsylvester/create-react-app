import { apiFetchDataSuccess, reducer, apiFetchData } from './APICall';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test actions and reducer', () => {
  it('should create a get Data action', () => {
    expect(apiFetchDataSuccess({ type: 'test' })).toEqual({
      type: 'API_FETCH_DATA_SUCCESS',
      data: { type: 'test' },
    });
  });

  it('should change the state and return the new state', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, { type: 'API_FETCH_DATA_SUCCESS', data: { type: 'test-new' } });
    expect(result).not.toEqual(state);
    expect(result).toEqual({ type: 'test-new' });
  });

  it('should change the state and return the new state', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, { type: 'API_FETCH_NOTHING', data: { type: 'test-new' } });
    expect(result).toEqual(state);
  });
});
