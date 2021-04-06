import {FETCH_SPECIFIC_TITLE} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SPECIFIC_TITLE:
      return action.payload;
    default:
      return state;
  }
};