import { combineReducers } from 'redux';
import app from './app';
import inkList from './inklist';
import ink from './ink';

export default combineReducers({
  app,
  inkList,
  ink
});
