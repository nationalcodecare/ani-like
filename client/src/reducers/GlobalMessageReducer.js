import {
  API_FAIL,
  FORGOT_PASSWORD
} from '../actions/types';

const initialState = {
  status: null,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case API_FAIL:
    case FORGOT_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
