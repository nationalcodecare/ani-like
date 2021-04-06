import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FORGOT_PASSWORD,
  RESTORE_PASSWORD,
  LOGOUT,
  AUTH_ERROR,
  API_FAIL,
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_FAIL,
} from './types';
import history from '../history';
import api from '../globalUtils/api';
import dispatchData from '../globalUtils/DispatchDataWithMessage';

// Load User while first Rendering the page
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    await api.get('/users/logout'); // Handle this error
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
  try {
    const res = await api.post(`/users/login`, { email, password });

    const currentResponse = {
      token: res.data.token,
      status: res.data.status,
      user: res.data.data.user,
      message: 'Successfully logged in',
      isAuthorized: true,
      loading: false,
    };

    dispatchData(currentResponse, LOGIN_SUCCESS, dispatch);

    history.push('/');
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      LOGIN_FAIL,
      dispatch
    );
  }
};

// Register user
export const register = ({ name, email, password, confirmPassword }) => async (
  dispatch
) => {
  try {
    const res = await api.post(`/users/signup`, {
      name,
      email,
      password,
      confirmPassword,
    });

    const currentResponse = {
      token: res.data.token,
      status: res.data.status,
      user: res.data.data.user,
      message: 'Successfully signed in',
      isAuthorized: true,
      loading: false,
    };

    dispatchData(currentResponse, REGISTER_SUCCESS, dispatch);

    history.push('/');
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      REGISTER_FAIL,
      dispatch
    );
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await api.post('/users/forgotPassword', { email });

    dispatchData(
      { status: res.data.status, message: res.data.message },
      FORGOT_PASSWORD,
      dispatch
    );
    history.push('/');
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Restore password
export const restorePassword = (data) => async (dispatch) => {
  try {
    const res = await api.patch(
      `/users/resetPassword/${window.location.href.split('/').pop()}`,
      data
    );

    const currentResponse = {
      token: res.data.token,
      status: res.data.status,
      user: res.data.data.user,
      message: 'Password was restored',
      isAuthorized: true,
      loading: false,
    };
    dispatchData(currentResponse, RESTORE_PASSWORD, dispatch);
    history.push('/');
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await api.get('/users/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
  dispatch({ type: LOGOUT });

  history.push('/');
};

export const googleSignIn = ({ name, email }) => async (dispatch) => {
  try {
    const res = await api.post('/users/google/signin', { name, email });
    const currentResponse = {
      token: res.data.token,
      status: res.data.status,
      user: res.data.data.user,
      message: 'Successfully logged in',
      isAuthorized: true,
      loading: false,
    };
    dispatchData(currentResponse, GOOGLE_SIGN_IN, dispatch);

    history.push('/');
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      GOOGLE_SIGN_IN_FAIL,
      dispatch
    );
  }
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  try {
    await api.delete('/users/me');
    history.go();
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};
