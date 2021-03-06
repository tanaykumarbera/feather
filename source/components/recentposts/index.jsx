import React from 'react';
import FIcon from '../icon';
import PostListItem from '../postlistitem';
import { IconFont } from '../../utils';

import './recentposts.less';

const RecentPosts = ({ recent, minPlaceholder }) => {
  const { posts, hasError, isLoading } = recent;
  return (<div
    className="f-recent-posts-wrap"
    itemScope
    itemType="http://schema.org/ItemList"
  >
    {isLoading &&
      [...Array(minPlaceholder)].map(num => (<PostListItem key={num} />))
    }
    {(!hasError && posts.length > 0) &&
      posts.map((post, index) => (<PostListItem key={post.id} post={post} index={index} />))
    }
    <FIcon
      className="f-recent-more"
      icon={IconFont.DOWN_ARROW}
      url="/archive" link
    />
  </div>);
};

RecentPosts.propTypes = {
  recent: React.PropTypes.shape({
    posts: React.PropTypes.array,
    hasError: React.PropTypes.bool
  }).isRequired,
  minPlaceholder: React.PropTypes.number.isRequired
};

export default RecentPosts;
