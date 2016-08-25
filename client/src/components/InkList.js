import React, { Component } from 'react';
// import './App.css';
import Ink from './Ink';

class InkList extends Component {
  render() {
    return (
      <ul className="App-intro">
        {this.props.inks.map(function(v) {
          return <Ink ink={v} key={v.id} />;
        })}
      </ul>
    );
  }
}

InkList.propTypes = {
  inks: React.PropTypes.array.isRequired
};

InkList.defaultProps = {
  inks: []
};

export default InkList;
