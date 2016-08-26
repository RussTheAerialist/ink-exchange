import {connect} from 'react-redux';
import InkList from '../components/InkList';

const getInks = (inks) => {
  if (inks.map === undefined) {
    return [];
  }
  return inks;
};

const mapStateToProps = (state) => {
  const inks = state.InkExchangeApp.loadInks.inks;
  return {
    inks: getInks(inks)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const InkListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InkList);

export default InkListContainer;
