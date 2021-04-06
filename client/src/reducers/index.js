import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { fetchTop10Reducer, fetchTitlesReducer, searchTitlesReducer } from './TitleReducer';
import SpecificTitleReducer from './SpecificTitleReducer';
import AuthReducer from './AuthReducer';
import GlobalMessageReducer from './GlobalMessageReducer';
import CommentsReducer from './CommentsReducer';
import CurrentCommentReducer from './CurrentCommentReducer';
import AlertReducer from './AlertReducer';

export default combineReducers({
  auth: AuthReducer,
  top10: fetchTop10Reducer,
  titles: fetchTitlesReducer,
  searchTitles: searchTitlesReducer,
  currentTitle: SpecificTitleReducer,
  comments: CommentsReducer,
  currentComment: CurrentCommentReducer,
  form: formReducer,
  globalMessages: GlobalMessageReducer,
  alert: AlertReducer,
});
