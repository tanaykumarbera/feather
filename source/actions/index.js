import { ghostClient } from '../utils/ghost-client';

export const FETCH_HOME_CONTENTS = 'FETCH_HOME_CONTENTS';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const LOADING = 'LOADING';
export const API_ERROR = 'API_ERROR';

export function fetchHomeContents() {
  // Fetch the first author (primary author) dynamically instead of hardcoding 'tanay'
  const userDetails = ghostClient.authors.browse({
    limit: 1,
    fields: 'bio,profile_image,name'
  });

  const initialPosts = ghostClient.posts.browse({
    include: 'tags',
    limit: 5
  });

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_HOME_CONTENTS }
    });
    Promise.all([userDetails, initialPosts]).then(responses => {
      // responses[0] could be a single author object or a list depending on browse vs read
      // ghostClient.authors.browse returns an array with meta.
      // ghostClient.authors.read returns an object.
      // Let's standardize in the logic below.

      let userResolves = responses[0];
      if (userResolves && userResolves.length && userResolves[0]) {
        userResolves = userResolves[0];
      } else if (Array.isArray(userResolves) && userResolves.length === 0) {
        userResolves = {}; // No author found
      }

      dispatch({
        type: FETCH_HOME_CONTENTS,
        payload: {
          user: userResolves, // Original expected: responses[0].data.users[0]
          posts: responses[1] // Original expected: responses[1].data.posts
        }
      });
    }).catch(error => dispatch({
      type: API_ERROR,
      payload: { kind: FETCH_HOME_CONTENTS, error }
    }));
  };
}

export function fetchPosts(limit = 10, extras = null, identifier = null) {
  // Original extras was passed directly to axios params.
  // Ghost SDK accepts similar options.
  const options = {
    limit,
    include: 'tags',
    ...extras
  };

  const request = ghostClient.posts.browse(options);

  return (dispatch) => {
    dispatch({
      type: LOADING,
      identifier,
      payload: { kind: FETCH_POSTS, extras }
    });
    request.then((data) => {
      // data from SDK is an array of posts with a `meta` property attached.
      dispatch({
        type: FETCH_POSTS,
        identifier,
        payload: { posts: data, meta: data.meta }, // Normalize payload structure if needed by reducer
        extras
      });
    }).catch((error) => {
      dispatch({
        type: API_ERROR,
        identifier,
        payload: { kind: FETCH_POSTS, error }
      });
    });
  };
}

export function fetchPost(slug) {
  const request = ghostClient.posts.read({ slug }, {
    include: 'tags'
  });

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_POST }
    });
    request.then((data) => {
      dispatch({ type: FETCH_POST, payload: { posts: [data] } }); // Reducer likely expects a list or specific structure. Original was `data`, which from axios is { posts: [...] }. SDK returns single object for read.
      // Need to check reducer to be sure. original axios: `response.data` -> `{ posts: [...] }`
    }).catch((error) => {
      dispatch({
        type: API_ERROR,
        payload: { kind: FETCH_POST, error }
      });
    });
  };
}

export function searchPosts(query) {
  const options = {
    limit: 'all',
    include: 'tags',
    fields: 'id,title,slug,plaintext,excerpt,published_at,feature_image,image'
  };

  const request = ghostClient.posts.browse(options);

  return (dispatch) => {
    dispatch({
      type: LOADING,
      payload: { kind: FETCH_POSTS }
    });
    request.then((data) => {
      // Client-side filtering
      const lowerQuery = query.toLowerCase();
      const filtered = data.filter(post => {
        const titleMatch = post.title && post.title.toLowerCase().includes(lowerQuery);
        const bodyMatch = post.plaintext && post.plaintext.toLowerCase().includes(lowerQuery);
        const tagMatch = post.tags && post.tags.some(tag => tag.name.toLowerCase().includes(lowerQuery));
        return titleMatch || bodyMatch || tagMatch;
      });

      // Construct meta to mock pagination
      const meta = {
        pagination: {
          page: 1,
          limit: filtered.length,
          pages: 1,
          total: filtered.length,
          next: null,
          prev: null
        }
      };
      // Attach meta to array as Ghost SDK does
      filtered.meta = meta;

      dispatch({
        type: FETCH_POSTS,
        identifier: query,
        payload: { posts: filtered, meta },
        extras: null
      });
    }).catch((error) => {
      dispatch({
        type: API_ERROR,
        payload: { kind: FETCH_POSTS, error }
      });
    });
  };
}
