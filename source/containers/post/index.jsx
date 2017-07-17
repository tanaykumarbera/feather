import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import FIcon from '../../components/icon';
import FTag from '../../components/tag';
import SideBarPage from '../../components/sidebarpage';
import { IconFont } from '../../utils';
import { fetchPost } from '../../actions';

import './post.less';

class FPost extends React.Component {

  static propTypes = {
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        slug: React.PropTypes.string
      })
    }).isRequired,
    fetchPost: React.PropTypes.func.isRequired,
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
      hasError: React.PropTypes.bool
    })
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
    'sub', 'sup', 'blockquote', 'pre'
  ]

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.slug);
  }

  render() {
    const { post, isLoading } = this.props.active;
    return (isLoading || post === null) ? (<h1>Loading</h1>) : (<SideBarPage author={this.props.author}>
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
              allowedTags: this.allowedTags
            })
          }}
        />
      </div>
    </SideBarPage>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPost }, dispatch)
)(FPost);
