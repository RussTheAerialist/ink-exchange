import React from 'react';
import './style.css';

const Ink = ({ onClick, ink}) => (
  <li onClick={onClick}
    className={ink.available ? 'ink available' : 'ink unavailable'}>
    <span className="sample"><img src={ink.url || "//placehold.it/150x150"} alt={ink.name} /></span>
    <span className="name">{ ink.name }</span>
    <span className="owner">{ ink.owner_name }</span>
  </li>
);

Ink.propTypes = {
  onClick: React.PropTypes.func,
  ink: React.PropTypes.object.isRequired
};

// class Ink extends Component {
//   render() {
//     const v = this.props.ink;
//     return (
//       <li key={v.id}>Ink: {v.name}</li>
//     );
//   }
// }
//
// Ink.propTypes = {
//   ink: React.PropTypes.object.isRequired
// };
//
// Ink.defaultProps = {
//   ink: {}
// };

export default Ink;
