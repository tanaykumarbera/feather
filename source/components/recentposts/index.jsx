import React from 'react';
import PostListItem from '../postlistitem';
// import { IconFont } from '../../utils';

import './recentposts.less';

const RecentPosts = ({ postList }) => {
  const { posts, hasError } = postList;
  return (<div className="f-recent-posts-wrap">
    {(!hasError && posts.length > 0) &&
      posts.map(post => (<PostListItem key={post.id} post={post} />))
    }
  </div>);
};

RecentPosts.propTypes = {
  postList: React.PropTypes.shape({
    posts: React.PropTypes.array,
    hasError: React.PropTypes.bool
  }).isRequired
};

export default RecentPosts;
