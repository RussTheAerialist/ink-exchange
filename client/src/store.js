import { createStore, applyMiddleware, combineReducers } from 'redux';
import inkExchangeAppReducer from './reducers';
import {requestsReducer, createRequestMiddleware} from 'redux-requests';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, createRequestMiddleware())(createStore);
const reducers = combineReducers({
  requests: requestsReducer,
  InkExchangeApp: inkExchangeAppReducer
});
let store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

export default store;
