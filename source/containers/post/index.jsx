import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import FIcon from '../../components/icon';
import FLoader from '../../components/loader';
import FTag from '../../components/tag';
import SideBarPage from '../../components/sidebarpage';
import { IconFont } from '../../utils';
import { fetchPost, fetchHomeContents } from '../../actions';

import './post.less';

class FPost extends React.Component {

  static propTypes = {
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        slug: React.PropTypes.string
      })
    }).isRequired,
    fetchPost: React.PropTypes.func.isRequired,
    fetchHomeContents: React.PropTypes.func.isRequired,
    author: React.PropTypes.shape({
      user: React.PropTypes.object,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }),
    active: React.PropTypes.shape({
      post: React.PropTypes.shape({
        title: React.PropTypes.string,
        image: React.PropTypes.string,
        meta: React.PropTypes.string,
        tags: React.PropTypes.array
      }),
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool,
      errorCode: React.PropTypes.number
    }),
    history: React.PropTypes.shape({
      replace: React.PropTypes.func
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

  componentWillMount() {
    if (!this.props.author.user) this.props.fetchHomeContents();
    this.props.fetchPost(this.props.match.params.slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active.errorCode === 404) {
      // post not found. Redirect to error page
      this.props.history.replace('/error');
    }
  }

  componentDidUpdate() {
    if (!this.hasDisqus) {
      const { post, isLoading } = this.props.active;
      const postLoaded = !(isLoading || post === null);
      if (postLoaded) {
        this.addDisqus(`/${post.slug}`, post.uuid);
        this.hasDisqus = true;
      }
    }
  }

  addDisqus(pageUrl, pageIdentifier) {
    window.disqus_config = () => {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
    };
    const disqusScript = document.createElement('script');
    disqusScript.src = 'https://thehandpickers.disqus.com/embed.js';
    disqusScript.setAttribute('data-timestamp', +new Date());
    disqusScript.async = true;

    const disqusDiv = document.getElementById('disqus_thread');
    if (disqusDiv) {
      disqusDiv.appendChild(disqusScript);
    }
  }

  render() {
    const { post, isLoading } = this.props.active;
    return (<SideBarPage author={this.props.author}>
      {(isLoading || post === null) ? <FLoader /> : (
        <div className="f-post-wrap">
          <h1 className="f-post-title">{post.title}</h1>
          { post.tags && (<div className="f-post-tags">
            <FIcon theme="f-dark" icon={IconFont.BUBBLE} />
            {post.tags.map(tag => (<FTag key={tag.id} tag={tag} />))}
          </div>)}
          <div
            className="f-post-contents"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(post.html, {
                allowedAttributes: false,
                allowedTags: this.allowedTags
              })
            }}
          />
          <div id="disqus_thread" className="f-post-comment" />
        </div>
      )}
    </SideBarPage>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPost, fetchHomeContents }, dispatch)
)(FPost);
