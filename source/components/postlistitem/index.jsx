import React from 'react';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import FTag from '../tag';
import FIcon from '../icon';
import { IconFont } from '../../utils';
import Config from '../../utils/config';

import './postlistitem.less';

const src = '/assets/images/sample.png';

export default class PostListItem extends React.Component {

  static propTypes = {
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      image: React.PropTypes.string,
      meta: React.PropTypes.string,
      tags: React.PropTypes.array
    }),
    index: React.PropTypes.number
  };

  static defaultProps = {
    post: undefined,
    index: -1
  };

  static renderPost(post, index) {
    return (
      <div
        className="f-post-list-item"
        itemProp="itemListElement"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        {(index !== -1) && <meta itemProp="position" name="position" content={index} />}
        <img
          alt={`feature for ${post.title}`}
          src={post.image || src}
          className="post-feature"
          itemProp="image"
        />
        <Link
          to={`/${post.slug}`}
          itemProp="url"
          className="post-title-link"
        >
          <h2
            className="post-title"
            itemProp="headline"
          >
            { post.title }
          </h2>
        </Link>
        <div
          className="post-excerpt"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.html, {
              allowedTags: ['p', 'b', 'i', 'strong']
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
                {post.tags.map(tag => (<FTag key={tag.id} tag={tag} />))}
              </div>
            }
          </div>
        )}
        <time itemProp="datePublished" dateTime={post.published_at} />
        <time itemProp="dateModified" dateTime={post.updated_at} />
        <span
          itemProp="publisher"
          itemScope
          itemType="http://schema.org/Organization"
        >
          <meta itemProp="name" name="name" content={Config.BLOG_PUBLISHER} />
          <link itemProp="logo" href="/assets/images/favicon.png" />
        </span>
        <span
          itemProp="author"
          itemScope
          itemType="http://schema.org/Person"
        >
          <meta itemProp="name" name="name" content={Config.BLOG_AUTHOR_NAME} />
          <meta itemProp="email" name="email" content={Config.BLOG_AUTHOR_EMAIL} />
        </span>
        <link itemProp="mainEntityOfPage" href={Config.URL_HOME} />
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
    const { post, index } = this.props;
    return post ? PostListItem.renderPost(post, index) : PostListItem.renderLoader();
  }
}
