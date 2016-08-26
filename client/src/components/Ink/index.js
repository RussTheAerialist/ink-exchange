import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import agent from '../../agent';
import {InkPreview} from '../InkPreview';
import './style.css';

const mapStateToProps = state => ({
  ...state.ink,
  currentUser: state.app.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch(actions.loadInk(payload))
});

class Ink extends Component {
  componentWillMount() {
    this.props.onLoad(agent.Inks.get(this.props.params.id));
  }

  componentWillUnmount() {
  }

  render() {
    const ink = this.props.ink;

    if (ink) {
      console.dir(ink);
      return (
        <div className="columns">
          <InkPreview className="large" {...ink[0]}/>
          <div className="inkSidebar">Request History</div>
        </div>
      )
    }

    return (<div>Loading...</div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ink);
