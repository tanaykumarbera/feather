import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
import { fetchPosts, fetchHomeContents, searchPosts } from '../../actions';

import './list.less';
import '../error/error.less';

class FList extends React.Component {

  static Type = {
    POSTS: 'posts',
    TAGS: 'tags',
    AUTHOR: 'author',
    SEARCH: 'search'
  };

  static propTypes = {
    type: PropTypes.string,
    fetchPosts: PropTypes.func.isRequired,
    searchPosts: PropTypes.func, // Optional as it's not strictly required by all FList types, but good to add
    fetchHomeContents: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      })
    }).isRequired,
    author: PropTypes.shape({
      user: PropTypes.object,
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool
    }),
    list: PropTypes.shape({
      posts: PropTypes.array,
      identifier: PropTypes.string,
      totalPages: PropTypes.number,
      pageLoaded: PropTypes.number,
      hasMore: PropTypes.bool,
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool
    }),
    history: PropTypes.shape({
      replace: PropTypes.func
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

  componentDidMount() {
    // load user meta only if not loaded
    if (!this.props.author.user) this.props.fetchHomeContents();
    this.fetchContents();
  }

  componentDidUpdate(prevProps) {
    if (this.props.list.errorCode === 404 && prevProps.list.errorCode !== 404) {
      // post not found. Redirect to error page
      this.props.history.replace('/error');
    } else {
      const currentSlug = this.props.match?.params?.slug || this.props.params?.slug;
      const prevSlug = prevProps.match?.params?.slug || prevProps.params?.slug;
      if (currentSlug !== prevSlug) {
        // check for url change. If changed reload contents for new url
        this.type = this.props.type;
        this.fetchContents(0, currentSlug);
        scrollToTop();
      }
    }
  }

  fetchContents(page = 0, slug = null) {
    const fSlug = slug || this.props.match?.params?.slug || this.props.params?.slug;
    switch (this.type) {
      case FList.Type.TAGS:
        // extra should be a tag slug
        this.props.fetchPosts(10, {
          page,
          filter: `tag:${fSlug}`
        }, fSlug);
        break;
      case FList.Type.SEARCH:
        this.props.searchPosts(fSlug);
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
    const isSearch = this.type === FList.Type.SEARCH;
    const slug = this.props.match?.params?.slug || this.props.params?.slug;

    let navItem = 'Archive';
    if (isTag) navItem = `#${slug}`;
    if (isSearch) navItem = `Search: ${slug}`;
    const showNoResults = isSearch && !isLoading && posts.length === 0;

    return (<SideBarPage author={this.props.author}>
      <Helmet>
        <title>{`${navItem} - ${Config.BLOG_TITLE}`}</title>
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
            {' » '}
            {isTag && 'tags » '}
            <span className="f-nav-active">{navItem}</span>
          </nav>
        </div>
        {showNoResults ? (
          <div className="f-error-wrap" style={{ marginTop: '2em' }}>
            <img className="f-error-img" src="/assets/images/f-404.png" alt="" />
            <h1 className="f-error-head">Nothing matched my indexed result</h1>
            <h2 className="f-error-suggestion">
              Try searching for something else?
            </h2>
          </div>
        ) : (
          <TransitionGroup
            className="f-list-content"
            component="div"
          >
            {posts.map((post, index) => (
              <CSSTransition
                key={post.id}
                timeout={500}
                classNames="f-list-item"
              >
                <PostListItem post={post} index={index} />
              </CSSTransition>
            ))}
            {((!posts.length && isLoading) || hasMore) && (
              <CSSTransition
                key="loading"
                timeout={500}
                classNames="f-list-item"
              >
                <PostListItem />
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
      </AutoTriggerScroll>
    </SideBarPage>);
  }
}

import { withRouter } from '../../utils/with-router';

export default connect(state => state,
  dispatch => bindActionCreators({ fetchPosts, fetchHomeContents, searchPosts }, dispatch)
)(withRouter(FList));
