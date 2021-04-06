import { FETCH_TITLES, FETCH_TOP_10, SEARCH_TITLES } from '../actions/types';

export const fetchTop10Reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_10:
      return action.payload;
    default:
      return state;
  }
};

const initialState = {
  titles: [],
  loading: true,
};

export const fetchTitlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TITLES:
      return { ...initialState, titles: [...action.payload], loading: false };
    default:
      return state;
  }
};

const initialStateSearch = {
  titles: [],
  loading: true,
};

export const searchTitlesReducer = (state = initialStateSearch, action) => {
  switch (action.type) {
    case SEARCH_TITLES:
      return { titles: [...action.payload], loading: false };
    default:
      return state;
  }
};
