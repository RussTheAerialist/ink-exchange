import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import * as actions from './actions';
// import InkList from './components/InkList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inks: [],
      user: { name: 'rhay', id: 1 },
      navItems: [
        { id: 'data', path: '/data', name: 'Stats' },
        { id: 'login', path: '/login', name: 'Login', extraClass: 'right'}
      ],
      mainPage: true
    };
  }

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(actions.getInksFromServer());
  }

  render() {
    return (
      <div className="wrapper">
        <Header navItems={this.state.navItems} mainPage={this.state.mainPage}/>
        {this.props.children || "Nothing" }
        <Footer user={this.state.user}/>
      </div>
  );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    inks: state.inks,
    requests: state.requests
  };
}

export default connect(mapStateToProps)(App);
