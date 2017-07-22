import { combineReducers } from 'redux';

import RecentPostsReducer from './recent_posts_reducer';
import PostListReducer from './post_list_reducer';
import PostReducer from './post_reducer';
import AuthorReducer from './author_reducer';

export default combineReducers({
  recent: RecentPostsReducer,
  list: PostListReducer,
  active: PostReducer,
  author: AuthorReducer
});
