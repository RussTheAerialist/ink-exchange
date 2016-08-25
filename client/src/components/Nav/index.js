import React, {Component} from 'react';
import {Link} from 'react-router';
import './style.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          {this.props.navItems.map((item) => {
            return (<li key={item.id} className={item.extraClass}><Link className={item.id} activeClassName="selected" to={item.path}>{item.name}</Link></li>)
          })}
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  navItems: React.PropTypes.array
};

Nav.defaultProps = {
  navItems: []
};

export default Nav;
