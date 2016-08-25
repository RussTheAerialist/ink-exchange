import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={() => <div>homepage</div>} />
        <Route path="/login" component={() => <div>login</div>} />
      </Route>
    </Router>
), document.getElementById('root')
);


