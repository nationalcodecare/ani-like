import { FETCH_USER_COMMENTS, FETCH_TITLE_COMMENTS } from '../actions/types';

const initialState = {
  comments: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_COMMENTS:
    case FETCH_TITLE_COMMENTS:
      return {
        ...initialState,
        comments: [...action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
