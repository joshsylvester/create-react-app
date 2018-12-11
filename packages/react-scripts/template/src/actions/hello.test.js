import actions, { HELLO_WORLD, reducer } from './hello';

describe('actions/greet', () => {
  it('should create a greet action', () => {
    expect(actions.greet('foo')).toEqual({
      payload: Promise.resolve('Hello, foo'),
      type: HELLO_WORLD,
    });
  });
});

describe('reducer', () => {
  it('should greeting on new state', () => {
    const state = { foo: true };
    const result = reducer(state, {
      payload: 'foo',
      type: HELLO_WORLD,
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      foo: true,
      greeting: 'foo',
    });
  });

  it('should return the state with an invalid action', () => {
    const state = { foo: true };
    const result = reducer(state, {
      payload: 'foo',
      type: 'INVALID_ACTION',
    });
    expect(result).toEqual(state);
  });

  it('should use the default if none is given', () => {
    const expectedState = {
      greeting: null,
    };
    const result = reducer(undefined, {
      payload: 'foo',
      type: 'INVALID_ACTION',
    });
    expect(result).toEqual(expectedState);
  });
});
