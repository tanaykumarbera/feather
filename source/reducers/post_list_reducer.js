import { FETCH_POSTS, LOADING, API_ERROR } from '../actions/index';
import INITIAL_STATE from '../feather_initial';

export default function (currentState = INITIAL_STATE.list, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      const meta = action.payload.meta || {};
      const pagination = meta.pagination || { pages: 0, page: 0 };
      const { pages: totalPages, page: pageLoaded } = pagination;
      return {
        totalPages,
        pageLoaded,
        posts: [...currentState.posts, ...action.payload.posts],
        identifier: action.identifier,
        hasMore: pageLoaded < totalPages,
        isLoading: false,
        hasError: false
      };
    }
    case LOADING:
    case API_ERROR:
      if (action.payload.kind === FETCH_POSTS) {
        const newIdentifier = (currentState.identifier === action.identifier);
        return {
          identifier: action.identifier,
          pageLoaded: newIdentifier ? INITIAL_STATE.list.pageLoaded : currentState.pageLoaded,
          totalPages: newIdentifier ? INITIAL_STATE.list.totalPages : currentState.totalPages,
          hasMore: newIdentifier ? INITIAL_STATE.list.hasMore : currentState.hasMore,
          posts: (currentState.identifier === action.identifier) ? currentState.posts : [],
          isLoading: (action.type === LOADING),
          hasError: (action.type === API_ERROR),
          errorCode: action.payload.error?.response?.status
        };
      }
      break;
    default:
      return currentState;
  }
  return currentState;
}
