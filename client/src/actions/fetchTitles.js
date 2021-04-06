import {
  FETCH_TITLES,
  SEARCH_TITLES,
  FETCH_TOP_10,
  FETCH_SPECIFIC_TITLE,
  API_FAIL,
} from './types';
import api from '../globalUtils/api';
import dispatchData from '../globalUtils/DispatchDataWithMessage';
import history from '../history';

// GET array of titles
export const fetchTop10 = () => async (dispatch) => {
  try {
    const res = await api.get(`/titles/top-10`);
    dispatch({ type: FETCH_TOP_10, payload: res.data.data.doc });
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Get All Titles
export const fetchTitles = (term = '') => async (dispatch) => {
  try {
    const res = await api.get(`/titles?name=${term}`);
    if (term.length > 0) {
      dispatch({ type: SEARCH_TITLES, payload: res.data.data.doc });
    } else {
      dispatch({ type: FETCH_TITLES, payload: res.data.data.doc });
    }
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
  }
};

// Get Sprecific Title by id
export const fetchSpecificTitle = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/titles/${id}`);
    dispatch({ type: FETCH_SPECIFIC_TITLE, payload: res.data.data.doc });
  } catch (err) {
    dispatchData(
      { status: 'error', message: err.response.data.message },
      API_FAIL,
      dispatch
    );
    history.push('/');
  }
};
