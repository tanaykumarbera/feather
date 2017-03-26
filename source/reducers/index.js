import { combineReducers } from 'redux';

import PostListReducer from './post_list_reducer';
import PostReducer from './post_reducer';

export default combineReducers({
  postList: PostListReducer,
  active: PostReducer
});
