import {
  FETCH_USER_COMMENTS,
  FETCH_TITLE_COMMENTS,
  CREATE_COMMENT,
  EDIT_USER_COMMENT,
  DELETE_USER_COMMENT,
  CURRENT_COMMENT_CLEAN_UP,
  API_FAIL,
} from './types';
import api from '../globalUtils/api';
import dispatchData from '../globalUtils/DispatchDataWithMessage';

// Get Comments on specific Title
export const fetchTitleComments = (titleId) => async (dispatch) => {
  try {
    const res = await api.get(`/titles/${titleId}/comments`);
    dispatch({ type: FETCH_TITLE_COMMENTS, payload: res.data.data.doc });
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Get User Comments
export const fetchUserComments = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/users/${userId}/comments`);
    dispatch({ type: FETCH_USER_COMMENTS, payload: res.data.data.doc });
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Create Comment
export const createComment = (titleId, comment) => async (dispatch) => {
  try {
    const res = await api.post(`/titles/${titleId}/comments`, { comment });

    dispatch({ type: CREATE_COMMENT, payload: res.data.data.doc });
    setTimeout(() => {
      dispatch({ type: CURRENT_COMMENT_CLEAN_UP });
    }, 10);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};
// Edit User Comment
export const editUserComment = (commentId, content) => async (dispatch) => {
  try {
    const res = await api.patch(`/comments/${commentId}`, { ...content });

    dispatch({ type: EDIT_USER_COMMENT, payload: res.data.data.doc });
    setTimeout(() => {
      dispatch({ type: CURRENT_COMMENT_CLEAN_UP });
    }, 10);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Delete User Comment
export const deleteUserComment = (commentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/comments/${commentId}`);
    dispatch({ type: DELETE_USER_COMMENT, payload: res.data.data._id });
    setTimeout(() => {
      dispatch({ type: CURRENT_COMMENT_CLEAN_UP });
    }, 10);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};
