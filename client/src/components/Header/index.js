import React, {Component} from 'react';
import {Link} from 'react-router';
import './style.css';

import Nav from '../Nav';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1><Link to="/">Ink Exchange</Link></h1>
        <Nav {...this.props} />
      </header>
      // nav here
    );
  }
}

Header.propTypes = {
  navItems: React.PropTypes.array,
  mainPage: React.PropTypes.bool
};

Header.defaultProps = {
  navItems: [],
  mainPage: true
};

export default Header;
