import mockStore from 'test/mock-store';
import { actionLoadingMiddleware, actionLoadingReducer } from './loading';

describe('store/actionLoadingMiddleware', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('does nothing if payload is not a promise', () => {
    const next = jest.fn();
    const action = {
      payload: 'value',
      type: 'test/dummy',
    };

    actionLoadingMiddleware(store)(next)(action);

    expect(store.getActions()).toEqual([]);
  });

  it('dispatches loading action if payload is a promise', () => {
    const next = jest.fn();
    const action = {
      payload: Promise.resolve('foo'),
      type: 'test/asyncDummy',
    };

    actionLoadingMiddleware(store)(next)(action);

    expect(store.getActions()).toEqual([
      {
        payload: true,
        type: 'test/loading',
      },
    ]);
  });

  it('dispatches original action with promise result', async () => {
    const promise = Promise.resolve('foo');
    const next = jest.fn();
    const action = {
      payload: promise,
      type: 'test/asyncDummy',
    };

    actionLoadingMiddleware(store)(next)(action);

    await promise;

    expect(store.getActions()).toEqual([
      {
        payload: true,
        type: 'test/loading',
      },
      {
        payload: 'foo',
        type: 'test/asyncDummy',
      },
    ]);
  });

  it('dispatches unloading action after promise payload is resolved', async () => {
    const promise = Promise.resolve('foo');
    const next = jest.fn();
    const action = {
      payload: promise,
      type: 'test/asyncDummy',
    };

    actionLoadingMiddleware(store)(next)(action);

    await new Promise((resolve) => {
      setTimeout(() => resolve('foo'), 10);
    });

    expect(store.getActions()).toEqual([
      {
        payload: true,
        type: 'test/loading',
      },
      {
        payload: 'foo',
        type: 'test/asyncDummy',
      },
      {
        payload: false,
        type: 'test/loading',
      },
    ]);
  });

  it('dispatches original action with error', async () => {
    const err = new Error('bar');
    const promise = Promise.reject(err);
    const next = jest.fn();
    const action = {
      payload: promise,
      type: 'test/asyncDummy',
    };

    actionLoadingMiddleware(store)(next)(action);

    await new Promise((resolve) => {
      setTimeout(() => resolve('foo'), 10);
    });

    expect(store.getActions()).toEqual([
      {
        payload: true,
        type: 'test/loading',
      },
      {
        error: err,
        payload: undefined,
        type: 'test/asyncDummy',
      },
      {
        payload: false,
        type: 'test/loading',
      },
    ]);
  });
});

describe('store/actionLoadingReducer', () => {
  const state = {};

  it('returns state without loading action', () => {
    const action = {
      payload: 'foo',
      type: 'test/dummy',
    };
    const result = actionLoadingReducer(state, action);
    expect(result).toEqual(state);
  });

  it('returns true with loading action and true payload', () => {
    const action = {
      payload: true,
      type: 'test/loading',
    };
    const result = actionLoadingReducer(state, action);
    expect(result).toEqual(true);
  });

  it('returns false with loading action and false payload', () => {
    const action = {
      payload: false,
      type: 'test/loading',
    };
    const result = actionLoadingReducer(state, action);
    expect(result).toEqual(false);
  });
});
