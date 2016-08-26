import React from 'react';
import moment from 'moment';
import './style.css';

const _daysSince = (startDate, endDate) => {
  if (!endDate) {
    endDate = moment();
  }

  return Math.round(moment.duration(endDate.diff(startDate)).asDays());
};

const RequestDate = props => {
  if (props.fullfilled_date) {
    const daysToComplete = _daysSince(props.requested_date, props.fullfilled_date);
    return (<span className="RequestDate fullfilled">(completed in {daysToComplete} days)</span>);
  }

  const daysSinceOpen = _daysSince(props.requested_date);
  return (<span className='RequestDate unfullfilled'>(open for {daysSinceOpen} days)</span>);
};

const RequestState = props => {
  return (<img className="RequestStatus" src={props.fullfilled_date ? 'http://placehold.it/12x12/444444' : 'http://placehold.it/12x12/ff0000'} alt="presentational"/>)
};

const Request = props => {
  return (<div className="Request"><RequestState fullfilled_date={props.fullfilled_date} /><span className="Requestor">{props.requestor}</span><RequestDate {...props} /></div>)
};

const RequestHistory = props => {
  const requests = props.requests || [];
  return (<ul className="RequestHistory">{requests.map((request) => {
    return (<li key={request.id}><Request {...request} /></li>);
  })}</ul>)
};

export default RequestHistory;
