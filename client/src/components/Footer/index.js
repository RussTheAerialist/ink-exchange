import React, {Component} from 'react';
import './style.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="content">
          To get an account, email <a href="mailto:rhay">rhay</a>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
