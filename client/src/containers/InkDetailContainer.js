import {connect} from 'react-redux';

import * as actions from '../actions';
import InkList from '../components/InkList';

const getSelectedInk = (inks, selectedInkId) => {
  if (inks.filter === undefined) return {};
  const selectedInk = inks.filter((i) => i.id === selectedInkId, inks);
  console.log(selectedInkId);
  console.dir(selectedInk);
  if (selectedInk.id === undefined) {
    return {};
  }
  return selectedInk;
};

const mapStateToProps = (state) => {
  const inks = state.InkExchangeApp.loadInks.inks;
  const selectedInkId = state.InkExchangeApp.loadInks.selectedInk;
  return {
    selectedInk: getSelectedInk(inks, selectedInkId)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInkSelect: (ink_id) => {
      dispatch(actions.selectInk(ink_id))
    }
  }
};

const InkDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InkList);

export default InkDetailContainer;
