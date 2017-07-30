import { FETCH_POST, LOADING, API_ERROR } from '../actions/index';
import INITIAL_STATE from '../feather_initial';

export default function (currentState = INITIAL_STATE.active, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...currentState,
        post: action.payload.posts[0],
        isLoading: false,
        hasError: false
      };
    case LOADING:
    case API_ERROR:
      if (action.payload.kind === FETCH_POST) {
        return {
          post: null,
          isLoading: (action.type === LOADING),
          hasError: (action.type === API_ERROR),
          errorCode: action.payload.error
            ? action.payload.error.response.status
            : undefined
        };
      }
      break;
    default:
      return currentState;
  }
  return currentState;
}
