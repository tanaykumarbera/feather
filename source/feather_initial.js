/* eslint no-underscore-dangle: [2, { "allow": ["__FEATHER_INITIAL__"] }] */
export default (window && window.__FEATHER_INITIAL__ !== undefined) ?
  window.__FEATHER_INITIAL__ : {
    active: {
      post: null,
      isLoading: false,
      hasError: false
    },
    author: {
      user: null,
      isLoading: false,
      hasError: false
    },
    list: {
      posts: [],
      identifier: null,
      totalPages: 0,
      pageLoaded: 0,
      hasMore: true,
      isLoading: false,
      hasError: false
    },
    recent: {
      posts: [],
      isLoading: false,
      hasError: false
    }
  };
