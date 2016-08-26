import actions from '../actions';

const defaultState = {
  inks: []
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actions.LOAD_INKLIST:
      return {
        ...state,
        inks: action.payload.data || []
      };

    default:
      return state;
  }
};
