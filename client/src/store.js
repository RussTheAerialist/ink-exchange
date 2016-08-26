import { createStore, applyMiddleware } from 'redux';
import inkExchangeAppReducer from './reducers';
import { promiseMiddleware, localStorageMiddleware} from './middleware';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)(createStore);
const reducers = inkExchangeAppReducer;
let store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

export default store;
