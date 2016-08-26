import React from 'react';
import {Link} from 'react-router';
import './style.css';

const InkDetail = ( { id, name, image_url, available, purchase_url, owner_name } ) => (
  <li
    className={available ? 'ink available' : 'ink unavailable'}><Link to={"/ink/" + id}>
    <span className="sample"><img src={image_url || "//placehold.it/150x150"} alt={name} /></span>
    <span className="name">{ name }</span>
    <span className="owner">{ owner_name }</span></Link>
  </li>
);

Ink.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  owner_name: React.PropTypes.string,
  image_url: React.PropTypes.string,
  purchase_url: React.PropTypes.string,
  available: React.PropTypes.bool
};

export default InkDetail;
