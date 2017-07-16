import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FIcon from '../../components/icon';
import SideBarPage from '../../components/sidebarpage';
import AutoTriggerPostList from '../../components/autotriggerpostlist';
import { IconFont } from '../../utils';
import { fetchPosts } from '../../actions';

import './list.less';
// move default css from home to base <<<<<<<<
class FList extends React.Component {

  static Type = {
    POSTS: 'posts',
    TAGS: 'tags',
    AUTHOR: 'author'
  };

  static propTypes = {
    fetchPosts: React.PropTypes.func.isRequired,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string
    }).isRequired,
    author: React.PropTypes.shape({
      user: React.PropTypes.object,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }),
    postList: React.PropTypes.shape({
      posts: React.PropTypes.array,
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
    postList: {
      posts: [],
      isLoading: true,
      hasError: false
    }
  }

  constructor(props) {
    super(props);
    this.type = props.location.pathname === 'tag' ? FList.Type.TAGS : FList.Type.POSTS;
    this.triggerNext = this.triggerNext.bind(this);
    this.fetchContents = this.fetchContents.bind(this);
  }

  componentWillMount() {
    this.fetchContents();
  }

  fetchContents(page = 0) {
    console.log(page);
    switch (this.type) {
      case FList.Type.TAGS:
        this.props.fetchPosts(10, {
          // extra should be a tag slug
          filter: `tags:${this.match.params.slug}`
        });
        break;
      case FList.Type.AUTHOR:
        this.props.fetchPosts(10, {
          // extra should be an author slug
          filter: `author:${this.match.params.slug}`
        });
        break;
      case FList.Type.POSTS:
      default:
        this.props.fetchPosts(10);
    }
  }

  triggerNext() {
    console.log(this);
  }

  render() {
    const { posts, isLoading } = this.props.postList;
    const isTag = this.type === FList.Type.TAGS;
    return (<SideBarPage author={this.props.author}>
      <div className="f-list-head">
        <nav>
          <Link
            to="/"
            className="f-nav-home"
          >
            <FIcon theme="f-dark" icon={IconFont.HOME} />
            HOME
          </Link>
          { ' » ' }
          { isTag && (<Link to="/tags" className="f-nav-tags">
              tags
          </Link>)}
          { isTag && ' » ' }
          <span className="f-nav-active">
            { isTag ? `#${this.match.params.slug}` : 'Archieve' }
          </span>
        </nav>
      </div>
      <AutoTriggerPostList trigger={this.triggerNext} posts={posts} isLoading={isLoading} />
    </SideBarPage>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPosts }, dispatch)
)(FList);
