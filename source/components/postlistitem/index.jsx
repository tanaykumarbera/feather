import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { Link } from 'react-router-dom';
import FIcon from '../icon';
import { IconFont } from '../../utils';

import './postlistitem.less';

const src = '/assets/images/sample.png';

const PostListItem = ({ post }) => (
  <div className="f-post-list-item">
    <img src={post.image || src} className="post-feature" alt="" />
    <h2 className="post-title">{ post.title }</h2>
    <div
      className="post-excerpt"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(post.html, {
          allowedTags: ['p', 'b', 'i', 'strong', 'a']
        })
      }}
    />
    <div className="post-tags">
      <div className="post-tags-icon">
        <FIcon theme="f-dark" icon={IconFont.BUBBLE} />
      </div>
      {post.tags.length > 0 &&
        <div className="post-tags-container">
          {post.tags.map(tag => (
            <Link key={tag.id} className="post-tag" to={`/${tag.slug}`}>
              { `#${tag.name}` }
            </Link>)
          )}
        </div>
      }
    </div>
  </div>
);

PostListItem.propTypes = {
  post: React.PropTypes.shape({
    title: React.PropTypes.string,
    image: React.PropTypes.string,
    meta: React.PropTypes.string,
    tags: React.PropTypes.array
  }).isRequired
};

export default PostListItem;
