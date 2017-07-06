import React from 'react';
import FIcon from '../icon';
import PostListItem from '../postlistitem';
import { IconFont } from '../../utils';

import './recentposts.less';

const RecentPosts = ({ postList, minPlaceholder }) => {
  const { posts, hasError, isLoading } = postList;
  return (<div className="f-recent-posts-wrap">
    {isLoading &&
      [...Array(minPlaceholder)].map(num => (<PostListItem key={num} />))
    }
    {(!hasError && posts.length > 0) &&
      posts.map(post => (<PostListItem key={post.id} post={post} />))
    }
    <FIcon
      className="f-recent-more"
      icon={IconFont.DOWN_ARROW}
      url="/posts" link
    />
  </div>);
};

RecentPosts.propTypes = {
  postList: React.PropTypes.shape({
    posts: React.PropTypes.array,
    hasError: React.PropTypes.bool
  }).isRequired,
  minPlaceholder: React.PropTypes.number.isRequired
};

export default RecentPosts;
