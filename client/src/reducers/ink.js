import actions from '../actions';

const defaultState = {
  ink: null
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case actions.INK_LOADED:
      return {
        ...state,
        ink: action.payload.data || null
      };

    default:
      return state;
  }
};
