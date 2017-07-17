/* global ghost */
import axios from 'axios';

export const FETCH_HOME_CONTENTS = 'FETCH_HOME_CONTENTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const LOADING = 'LOADING';
export const API_ERROR = 'API_ERROR';

export function fetchHomeContents() {
  const userDetails = axios.get(ghost.url.api('users', {
    fields: 'bio,image,name',
    limit: 1
  }));
  const initialPosts = axios.get(ghost.url.api('posts', {
    include: 'tags',
    fields: 'id,title,slug,image,tags,html',
    limit: 5
  }));
  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_HOME_CONTENTS }
    });
    Promise.all([userDetails, initialPosts]).then(responses => dispatch({
      type: FETCH_HOME_CONTENTS,
      payload: {
        user: responses[0].data.users[0],
        posts: responses[1].data.posts
      }
    })).catch(error => dispatch({
      type: API_ERROR,
      payload: { kind: FETCH_HOME_CONTENTS, error }
    }));
  };
}

export function fetchPosts(limit = '5', extras = null) {
  const request = axios.get(ghost.url.api('posts', { limit,
    include: 'tags',
    fields: 'id,title,slug,image,tags,html',
    ...(extras !== null ? extras : {}) }));
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
  const request = axios.get(ghost.url.api(`posts/slug/${slug}`, {
    include: 'tags'
  }));
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
