import { attemptRequest } from 'redux-requests';

export const SELECT_INK = 'SELECT_INK';
export const TOGGLE_INK_AVAILABLE = 'TOGGLE_INK_AVAILABLE';
export const LOAD_INKS = 'LOAD_INKS';

export const selectInk = (ink_id) => ({
  type: SELECT_INK,
  ink_id
});

export const toggleInkAvailable = (ink_id) => ({
  type: TOGGLE_INK_AVAILABLE,
  ink_id
});

export const getInksFromServer = () => {
  return (dispatch, getState) => {
    const url = 'http://localhost:8000/inks';
    attemptRequest(url, {
      begin: () => ({
        type: LOAD_INKS
      }),
      success: response => ({
        type: LOAD_INKS,
        data: response
      }),
      failure: error => ({
        type: LOAD_INKS,
        error
      })
    }, () => fetch(url).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then((response) => {
      return response.json()
    }),
    dispatch);
  }
};
