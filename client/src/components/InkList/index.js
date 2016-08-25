import React, { Component } from 'react';
import './style.css';
import Ink from '../Ink';

class InkList extends Component {
  render() {
    console.dir(this.props.inks);

    return (
      <ul className="inkList">
        <li>Something</li>
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
