import React from 'react';
import {Link} from 'react-router';
import './style.css';

export const InkPreview = props => {
  return (
    <div className={`inkPreview ${props.className}`}>
      <img src={props.image_url || 'http://placehold.it/350x350'} alt={props.name} />
      <header><h1>
        <Link to={`/inks/${props.id}`}>{props.name}</Link>
      </h1></header>
  </div>
  );
};

const Inks = props => {
  var inks = props.inks;

  if (inks) {
    return (<ul className="inkPreviewList">{
      inks.map(ink => {
        return (
          <li key={ink.id}><InkPreview {...ink}/></li>
        );
      })
    }</ul>);
  } else {
    return (<div>Loading...</div>);
  }
};

export default Inks;
