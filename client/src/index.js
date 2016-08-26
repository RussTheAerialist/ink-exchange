import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';
import App from './App';
import InkList from './components/InkList';
import Ink from './components/Ink';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={InkList} />
        <Route path="/inks/:id" component={Ink} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root')
);


