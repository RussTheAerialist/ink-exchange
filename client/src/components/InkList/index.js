import React from 'react';
import './style.css';
import Ink from '../Ink';

const InkList = ((inks) => {
  const realInks = inks.inks || inks;
  return (
  <ul className="inkList">
    {realInks.map((ink) => (
      <Ink key={ink.id}
           {...ink}
      />
    ))}
  </ul>
);});

InkList.propTypes = {
  inks: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    owner_name: React.PropTypes.string,
    image_url: React.PropTypes.string,
    purchase_url: React.PropTypes.string,
    available: React.PropTypes.bool
  }).isRequired).isRequired
};

InkList.defaultProps = {
  inks: []
};

export default InkList;
