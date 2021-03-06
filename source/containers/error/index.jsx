import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PostListItem from '../../components/postlistitem';
import SideBarPage from '../../components/sidebarpage';
import { fetchHomeContents } from '../../actions';

import Config from '../../utils/config';
import './error.less';

class FError extends React.Component {

  static propTypes = {
    fetchHomeContents: React.PropTypes.func.isRequired,
    author: React.PropTypes.shape({
      user: React.PropTypes.object,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }).isRequired,
    recent: React.PropTypes.shape({
      posts: React.PropTypes.array,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }).isRequired
  };

  componentWillMount() {
    if (!this.props.author.user) this.props.fetchHomeContents();
  }

  render() {
    const { posts, isLoading, hasError } = this.props.recent;
    return (<SideBarPage author={this.props.author}>
      <Helmet>
        <title>{ `Not Found - Error 404 - ${Config.BLOG_TITLE}` }</title>
      </Helmet>
      <div className="f-error-wrap">
        <img className="f-error-img" src="/assets/images/f-404.png" alt="" />
        <h1 className="f-error-head">Dang! Seriously, a 404?</h1>
        <h2 className="f-error-suggestion">
          { 'While I don\'t have that stuff for you,' }
          <br />
          { 'how about going through some of my recent publications? ' }
        </h2>
        <div className="f-error-recent">
          {isLoading &&
            [...Array(3)].map(num => (<PostListItem key={num} />))
          }
          {(!hasError && posts.length > 0) &&
            posts.map(post => (<PostListItem key={post.id} post={post} />))
          }
        </div>
      </div>
    </SideBarPage>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchHomeContents }, dispatch)
)(FError);
