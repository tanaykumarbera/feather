import { FETCH_HOME_CONTENTS, FETCH_POSTS, LOADING, API_ERROR } from '../actions/index';
import INITIAL_STATE from '../feather_initial';

export default function (currentState = INITIAL_STATE.postList, action) {
  switch (action.type) {
    case FETCH_HOME_CONTENTS:
    case FETCH_POSTS:
      return { ...currentState,
        posts: action.payload.posts,
        isLoading: false,
        hasError: false
      };
    case LOADING:
    case API_ERROR:
      if (action.payload.kind === FETCH_POSTS ||
        action.payload.kind === FETCH_HOME_CONTENTS) {
        return { ...currentState,
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
