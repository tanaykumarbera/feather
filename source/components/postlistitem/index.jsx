import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { Link } from 'react-router-dom';
import FIcon from '../icon';
import { IconFont } from '../../utils';

import './postlistitem.less';

const src = '/assets/images/sample.png';

export default class PostListItem extends React.Component {

  static propTypes = {
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      image: React.PropTypes.string,
      meta: React.PropTypes.string,
      tags: React.PropTypes.array
    })
  };

  static defaultProps = {
    post: undefined
  };

  static renderPost(post) {
    return (
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
        {post.tags && (
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
        )}
      </div>
    );
  }

  static renderLoader() {
    return (<div className="f-post-list-item f-post-loading">
      <div className="post-loader-mask-wrap" >
        <div className="post-loader-mask mask-1" />
        <div className="post-loader-mask mask-2-stub" />
        <div className="post-loader-mask mask-2" />
        <div className="post-loader-mask mask-3" />
        <div className="post-loader-mask mask-4" />
        <div className="post-loader-mask mask-5" />
        <div className="post-loader-mask mask-6" />
      </div>
    </div>);
  }

  render() {
    const { post } = this.props;
    return post ? PostListItem.renderPost(post) : PostListItem.renderLoader();
  }
}
