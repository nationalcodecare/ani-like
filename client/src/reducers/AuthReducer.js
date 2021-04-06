import Cookies from 'js-cookie';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  CHANGE_ACC_DETAILS_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  COLLECTION_UPDATED,
  RESTORE_PASSWORD,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_FAIL
} from '../actions/types';

const initialState = {
  token:
    process.env.NODE_ENV === 'development'
      ? localStorage.getItem('jwt')
      : Cookies.get('jwt'),
  status: null,
  user: null,
  message: null,
  isAuthorized: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_ACC_DETAILS_SUCCESS:
    case COLLECTION_UPDATED:
    case RESTORE_PASSWORD:
    case GOOGLE_SIGN_IN:
      return { ...state, ...action.payload };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthorized: false,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthorized: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthorized: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
