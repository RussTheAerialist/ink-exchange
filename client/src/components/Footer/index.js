import React from 'react';
import {connect} from 'react-redux';
import './style.css';

const mapStateToProps = state => ({
  currentUser: state.app.currentUser // You'll probably need something specific here
});

const mapDispatchToProps = dispatch => ({
});

const Footer = (props) => {
  if (props.currentUser) {
    return (<span>&nbsp;</span>);
  }

  return (
    <div className="footer">
      <div className="content">
        To get an account, email <a href="mailto:rhay">rhay</a>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
