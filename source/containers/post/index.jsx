import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import { Helmet } from 'react-helmet';

import FIcon from '../../components/icon';
import FLoader from '../../components/loader';
import FTag from '../../components/tag';
import SideBarPage from '../../components/sidebarpage';
import Config from '../../utils/config';
import { IconFont, scrollToTop } from '../../utils';
import { fetchPost, fetchHomeContents } from '../../actions';

import './post.less';

class FPost extends React.Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      })
    }).isRequired,
    fetchPost: PropTypes.func.isRequired,
    fetchHomeContents: PropTypes.func.isRequired,
    author: PropTypes.shape({
      user: PropTypes.object,
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool
    }),
    active: PropTypes.shape({
      post: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        meta: PropTypes.string,
        tags: PropTypes.array
      }),
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool,
      errorCode: PropTypes.number
    }),
    history: PropTypes.shape({
      replace: PropTypes.func
    }).isRequired,
    location: PropTypes.shape({
      hash: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    author: {
      user: null,
      isLoading: true,
      hasError: false
    },
    active: {
      post: null,
      isLoading: true,
      hasError: false
    }
  }

  static allowedTags = [
    'p', 'b', 'i', 'strong', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'sub', 'sup', 'blockquote', 'pre', 'iframe'
  ]

  componentDidMount() {
    scrollToTop();
    if (!this.props.author.user) this.props.fetchHomeContents();

    const slug = this.props.match?.params?.slug || this.props.params?.slug;

    if (slug) {
      this.props.fetchPost(slug);
    } else {
      console.error('FPost: slug is missing');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active.errorCode === 404 && prevProps.active.errorCode !== 404) {
      // post not found. Redirect to error page
      this.props.history.replace('/error');
    }

    const { post, isLoading } = this.props.active;
    const postLoaded = !(isLoading || post === null);
    if (postLoaded && !this.hasDisqus) {
      this.addDisqus(`/${post.slug}`, post.uuid);
      this.hasDisqus = true;
    }
    if (postLoaded && this.props.location.hash) {
      const { hash } = this.props.location;
      if (hash === '#discussion') {
        document.getElementById('disqus_thread').scrollIntoView();
      }
    }
    if (postLoaded && window.Prism) {
      window.Prism.plugins.autoloader.languages_path = Config.PRISM_GRAMMER;
      window.Prism.highlightAll();
    }
  }

  addDisqus(pageUrl, pageIdentifier) {
    window.disqus_config = function () {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
    };
    if (window.disqus_added) {
      // eslint-disable-next-line
      DISQUS.reset({
        reload: true,
        config: window.disqus_config
      });
    } else {
      const dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = Config.BLOG_DISQUS;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      window.disqus_added = true;
    }
  }

  render() {
    const { post, isLoading } = this.props.active;
    const hasPost = !isLoading && post;
    return (<SideBarPage author={this.props.author}>
      <Helmet>
        <title>{hasPost ? `${post.title} - ${Config.BLOG_TITLE}` : Config.BLOG_TITLE}</title>
        {hasPost && post.meta_title && <meta name="title" content={post.meta_title} />}
        {hasPost && post.meta_description && <meta name="description" content={post.meta_description} />}
      </Helmet>
      {!hasPost ? <FLoader /> : (<div
        className="f-post-wrap"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <h1 className="f-post-title" itemProp="headline">{post.title}</h1>
        <link itemProp="image" href={post.image} />
        {post.tags && (<div className="f-post-tags">
          <FIcon theme="f-dark" icon={IconFont.BUBBLE} />
          <meta name="keywords" content={post.tags.map(tag => tag.name).join(',')} />
          {post.tags.map(tag => (<FTag key={tag.id} tag={tag} />))}
        </div>)}
        <div
          itemProp="articleBody"
          className="f-post-contents"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(post.html, {
              allowedAttributes: false,
              allowedTags: FPost.allowedTags
            })
          }}
        />
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
        <div id="disqus_thread" className="f-post-comment" />
      </div>)}
    </SideBarPage>);
  }
}

import { withRouter } from '../../utils/with-router';

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPost, fetchHomeContents }, dispatch)
)(withRouter(FPost));
