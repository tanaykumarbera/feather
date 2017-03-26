import { FETCH_POSTS, LOADING, API_ERROR } from '../actions/index';
import FEATHER_INITIAL from '../feather_initial';

export default function (currentState = FEATHER_INITIAL, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...currentState.postList,
        posts: action.payload.posts,
        isLoading: false,
        hasError: false
      };
    case LOADING:
    case API_ERROR:
      if (action.payload.kind === FETCH_POSTS) {
        return { ...currentState.postList,
          isLoading: (action.type === LOADING),
          hasError: (action.type === API_ERROR)
        };
      }
      break;
    default:
      return currentState;
  }
  return currentState;
}
