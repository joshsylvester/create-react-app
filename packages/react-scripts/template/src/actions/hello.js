import helloService from 'services/hello';

export const HELLO_WORLD = 'hello/world';

const actions = {
  greet(name) {
    return {
      payload: helloService(name),
      type: HELLO_WORLD,
    };
  },
};
export default actions;

const initialState = {
  greeting: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case HELLO_WORLD:
      return {
        ...state,
        greeting: action.payload,
      };

    default:
      return state;
  }
}
