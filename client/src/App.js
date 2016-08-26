import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import * as actions from './actions';
import agent from './agent';

const mapStateToProps = state => ({
  appLoaded: state.app.appLoaded,
  appName: state.app.appName,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch(actions.loadApp())
});

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? 'user' : null, token);
  }

  render() {
    if (this.props.appLoaded)
      return (
        <div className="wrapper">
          <Header navItems={[]} mainPage={undefined}/>
          {this.props.children || "Nothing" }
          <Footer user={undefined}/>
        </div>
      );

    return (
      <div className="wrapper">
        Loading...
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
