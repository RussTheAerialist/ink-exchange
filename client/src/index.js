import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';
import App from './App';
import InkListContainer from './containers/InkListContainer';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={InkListContainer} />
        <Route path="/login" component={() => <div>login</div>} />
        <Route path="/data" component={() => <div>data</div>} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root')
);


