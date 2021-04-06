import {
  CREATE_COMMENT,
  EDIT_USER_COMMENT,
  DELETE_USER_COMMENT,
  CURRENT_COMMENT_CLEAN_UP,
} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return { ...state, ...action.payload, isCreated: true, isDeleted: false };
    case EDIT_USER_COMMENT:
      return {
        ...state,
        ...action.payload,
        isDeleted: false,
        isCreated: false,
      };
    case DELETE_USER_COMMENT:
      return { _id: action.payload, isDeleted: true, isCreated: false };
    case CURRENT_COMMENT_CLEAN_UP:
      return initialState;
    default:
      return state;
  }
};
