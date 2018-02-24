import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import INITIAL_STATE from '../../feather_initial';
import FIcon from '../../components/icon';
import SideBarPage from '../../components/sidebarpage';
import AutoTriggerScroll from '../../components/autotriggerscroll';
import PostListItem from '../../components/postlistitem';
import Config from '../../utils/config';
import { IconFont, scrollToTop } from '../../utils';
import { fetchPosts, fetchHomeContents } from '../../actions';

import './list.less';
// move default css from home to base <<<<<<<<
class FList extends React.Component {

  static Type = {
    POSTS: 'posts',
    TAGS: 'tags',
    AUTHOR: 'author'
  };

  static propTypes = {
    type: React.PropTypes.string,
    fetchPosts: React.PropTypes.func.isRequired,
    fetchHomeContents: React.PropTypes.func.isRequired,
    match: React.PropTypes.shape({
      params: React.PropTypes.shape({
        slug: React.PropTypes.string
      })
    }).isRequired,
    author: React.PropTypes.shape({
      user: React.PropTypes.object,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }),
    list: React.PropTypes.shape({
      posts: React.PropTypes.array,
      identifier: React.PropTypes.string,
      totalPages: React.PropTypes.number,
      pageLoaded: React.PropTypes.number,
      hasMore: React.PropTypes.bool,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }),
    history: React.PropTypes.shape({
      replace: React.PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    type: FList.Type.POSTS,
    author: INITIAL_STATE.author,
    list: INITIAL_STATE.list
  }

  constructor(props) {
    super(props);
    this.type = props.type;
    this.triggerNext = this.triggerNext.bind(this);
    this.fetchContents = this.fetchContents.bind(this);
  }

  componentWillMount() {
    // load user meta only if not loaded
    if (!this.props.author.user) this.props.fetchHomeContents();
    this.fetchContents();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.list.errorCode === 404) {
      // post not found. Redirect to error page
      this.props.history.replace('/error');
    } else if (this.props.match.params.slug !== newProps.match.params.slug) {
      // check for url change. If changed reload contents for new url
      this.type = newProps.type;
      this.fetchContents(0, newProps.match.params.slug);
      scrollToTop();
    }
  }

  fetchContents(page = 0, slug = null) {
    const fSlug = slug || this.props.match.params.slug;
    switch (this.type) {
      case FList.Type.TAGS:
        // extra should be a tag slug
        this.props.fetchPosts(10, {
          page,
          filter: `tag:${fSlug}`
        }, fSlug);
        break;
      case FList.Type.AUTHOR:
        // extra should be an author slug
        this.props.fetchPosts(10, {
          page,
          filter: `author:${fSlug}`
        }, fSlug);
        break;
      case FList.Type.POSTS:
      default:
        this.props.fetchPosts(10, { page });
    }
  }

  triggerNext() {
    const { hasMore, isLoading, pageLoaded, totalPages } = this.props.list;
    if (!hasMore || pageLoaded >= totalPages) return;
    if (!isLoading) this.fetchContents(pageLoaded + 1);
  }

  render() {
    const { posts, isLoading, hasMore } = this.props.list;
    const isTag = this.type === FList.Type.TAGS;
    const navItem = isTag ? `#${this.props.match.params.slug}` : 'Archive';
    return (<SideBarPage author={this.props.author}>
      <Helmet>
        <title>{ `${navItem} - ${Config.BLOG_TITLE}` }</title>
      </Helmet>
      <AutoTriggerScroll
        trigger={this.triggerNext}
        hasMore={hasMore}
        isLoading={isLoading}
        itemScope
        itemType="http://schema.org/ItemList"
      >
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
            { isTag && 'tags » ' }
            <span className="f-nav-active">{ navItem }</span>
          </nav>
        </div>
        <ReactCSSTransitionGroup
          key={isTag ? `f-${this.props.match.params.slug}` : 'f-archive'}
          component="div"
          className="f-list-content"
          transitionName="f-list-item"
          transitionAppearTimeout={500}
          transitionEnter
          transitionEnterTimeout={500}
          transitionLeave={false}
        >
          { posts.map((post, index) => <PostListItem key={post.id} post={post} index={index} />) }
          { ((!posts.length && isLoading) || hasMore) && <PostListItem key="loading" /> }
        </ReactCSSTransitionGroup>
      </AutoTriggerScroll>
    </SideBarPage>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPosts, fetchHomeContents }, dispatch)
)(FList);
