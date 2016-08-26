import React, {Component} from 'react';
import {connect} from 'react-redux';
import './style.css';

import * as actions from '../../actions';
import agent from '../../agent';
import Inks from '../InkPreview';

const mapStateToProps = state => ({
  ...state.inkList,
  appName: state.app.appName,
  token: state.app.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch(actions.loadInkList(payload))
});

class InkList extends Component {
  componentWillMount() {
    const inks = agent.Inks.all();
    this.props.onLoad(inks);
  }

  render() {
    return (
        <Inks
          inks={this.props.inks}
        />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InkList);
