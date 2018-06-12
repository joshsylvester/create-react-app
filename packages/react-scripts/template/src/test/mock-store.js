import configureMockStore from 'redux-mock-store';
import { middlewares } from 'store/middleware';

const mockStore = configureMockStore(middlewares);

export default mockStore;
