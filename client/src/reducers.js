import { combineReducers } from 'redux';
import * as actions from './actions';

function selectInk(state = {ink_id: undefined}, action) {
  switch(action.type) {
    case actions.SELECT_INK:
      return Object.assign({}, state, {ink_id: action.ink_id});
    default: return state;
  }
}

function loadInks(state = {inks: {}}, action) {
  switch(action.type) {
    case actions.LOAD_INKS:
      if (action.data && action.data.length && action.data.length() > 0) {
        // We have a response
        return Object.assign({}, state, {inks: action.data.data});
      } else {
        // If we don't have a response, it's an empty array
        return Object.assign({}, state, {inks: []});
      }
    default: return state;
  }
}

const InkExchangeApp = combineReducers({
  selectInk,
  loadInks
});

export default InkExchangeApp
