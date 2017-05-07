import { FETCH_HOME_CONTENTS, LOADING, API_ERROR } from '../actions/index';
import INITIAL_STATE from '../feather_initial';

export default function (currentState = INITIAL_STATE.author, action) {
  switch (action.type) {
    case FETCH_HOME_CONTENTS:
      return { ...currentState,
        user: action.payload.user,
        isLoading: false,
        hasError: false
      };
    case LOADING:
      if (action.payload.kind === FETCH_HOME_CONTENTS) {
        const newState = { ...currentState,
          isLoading: (action.type === LOADING),
          hasError: (action.type === API_ERROR)
        };
        return newState;
      }
      break;
    case API_ERROR:
      if (action.payload.kind === FETCH_HOME_CONTENTS) {
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
