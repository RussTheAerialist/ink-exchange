import {connect} from 'react-redux';

import * as actions from '../actions';
import InkList from '../components/InkList';

const getInks = (inks, selectedInk) => {
  return inks;
};

const mapStateToProps = (state) => {
  const inks = state.InkExchangeApp.loadInks.inks;
  return {
    inks: getInks(inks, state.InkExchangeApp.selectInk.selectedInk)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInkSelect: (ink_id) => {
      dispatch(actions.selectInk(ink_id))
    }
  }
};

const InkListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InkList);

export default InkListContainer;
