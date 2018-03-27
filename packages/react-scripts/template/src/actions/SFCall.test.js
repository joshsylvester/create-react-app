import { apiFetchDataSuccess, reducer } from './SFCall';

describe('test actions and reducer', () => {
  it('should run a fetch data action', () => {
    expect(apiFetchDataSuccess({ type: 'test' })).toEqual({
      type: 'API_FETCH_DATA_SUCCESS',
      data: { type: 'test' },
    });
  });

  it('should change the state and return the new state', () => {
    const state = { type: 'test-old' };
    const result = reducer(state, { type: 'API_FETCH_DATA_SUCCESS', data: { type: 'test-new' } });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      data: { type: 'test-new' },
      hasLoaded: true,
    });
  });
});

