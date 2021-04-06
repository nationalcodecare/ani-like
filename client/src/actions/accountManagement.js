import {
  CHANGE_ACC_DETAILS_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  COLLECTION_UPDATED,
  API_FAIL,
} from './types';
import api from '../globalUtils/api';
import dispatchData from '../globalUtils/DispatchDataWithMessage';

export const changeDetails = (form) => async (dispatch) => {
  try {
    const res = await api.patch('/users/updateMe', form);

    const currentResponse = {
      status: res.data.status,
      user: res.data.data.user,
      message: 'Data was updated successfully',
      isAuthorized: true,
      loading: false,
    };

    dispatchData(currentResponse, CHANGE_ACC_DETAILS_SUCCESS, dispatch);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Password change
export const changePassword = (formValues) => async (dispatch) => {
  try {
    const res = await api.patch('/users/updatePassword', { ...formValues });

    const currentResponse = {
      token: res.data.token,
      status: res.data.status,
      user: res.data.data.user,
      message: 'Password updated successfully',
      isAuthorized: true,
      loading: false,
    };

    dispatchData(currentResponse, CHANGE_PASSWORD_SUCCESS, dispatch);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

export const updateCollection = (data) => async (dispatch) => {
  try {
    const res = await api.patch('/users/updateMyTitles', data);

    const currentResponse = {
      status: res.data.status,
      user: res.data.data.user,
      message: data.message,
      isAuthorized: true,
      loading: false,
    };
    dispatchData(currentResponse, COLLECTION_UPDATED, dispatch);
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};
