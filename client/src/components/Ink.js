import React, { Component } from 'react';
// import './App.css';

class Ink extends Component {
  render() {
    const v = this.props.ink;
    return (
      <li key={v.id}>Ink: {v.name}</li>
    );
  }
}

Ink.propTypes = {
  ink: React.PropTypes.object.isRequired
};

Ink.defaultProps = {
  ink: {}
};

export default Ink;
