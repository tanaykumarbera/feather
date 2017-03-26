/* global ghost */
import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const LOADING = 'LOADING';
export const API_ERROR = 'API_ERROR';

export function fetchPosts(limit = '5') {
  const request = axios.get(ghost.url.api('posts', { limit }));
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_POSTS }
    });
    request.then(({ data }) => {
      dispatch({ type: FETCH_POSTS, payload: data });
    }).catch((error) => {
      dispatch({
        type: API_ERROR,
        payload: { kind: FETCH_POSTS, error }
      });
    });
  };
}

export function fetchPost(slug) {
  const request = axios.get(ghost.url.api('posts', { slug }));
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_POST }
    });
    request.then(({ data }) => {
      dispatch({ type: FETCH_POST, payload: data });
    }).catch((error) => {
      dispatch({
        type: API_ERROR,
        payload: { kind: FETCH_POST, error }
      });
    });
  };
}
