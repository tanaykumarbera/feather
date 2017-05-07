import { combineReducers } from 'redux';

import PostListReducer from './post_list_reducer';
import PostReducer from './post_reducer';
import AuthorReducer from './author_reducer';

export default combineReducers({
  postList: PostListReducer,
  active: PostReducer,
  author: AuthorReducer
});
