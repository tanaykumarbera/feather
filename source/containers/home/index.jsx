import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import FLoader from '../../components/loader';
import SiteLogo from '../../components/sitelogo';
import AuthorBio from '../../components/authorbio';
import SearchBar from '../../components/searchbar';
import RecentPosts from '../../components/recentposts';
import FIcon from '../../components/icon';
import FSearch from '../search';

import { IconFont } from '../../utils';
import Config from '../../utils/config';

import { fetchHomeContents } from '../../actions';

import './home.less';
// move default css from home to base <<<<<<<<
class FHome extends React.Component {

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

  constructor(props) {
    super(props);
    this.state = { searchActive: false };
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentWillMount() {
    if (!this.props.author.user) {
      this.props.fetchHomeContents();
    }
  }

  toggleSearch(active = false) {
    this.setState({
      searchActive: active
    });
  }

  render() {
    const { posts } = this.props.recent;
    const { user } = this.props.author;
    const loaded = (posts.length > 0 && user !== null);
    if (!loaded) {
      return (<FLoader />);
    }
    return (<div className="f-page f-home parallax">
      <Helmet>
        <title>{ `Home - ${Config.BLOG_TITLE}` }</title>
      </Helmet>
      <div className="f-background parallax-layer parallax-layer-background">
        <div className="f-abstract-1" />
      </div>
      <div className="f-contents parallax-layer parallax-layer-foreground">
        <img
          alt="author logo"
          className="f-author-logo"
          src="/assets/images/logo.png"
          srcSet="/assets/images/logo@2x.png 2x"
        />
        <SiteLogo />
        <AuthorBio author={this.props.author} />
        <SearchBar theme="dark" onClick={() => this.toggleSearch(true)} />
        <div className="f-icons-container">
          <FIcon theme="f-dark" url={Config.URL_TWITTER} icon={IconFont.TWITTER} />
          <FIcon theme="f-dark" url={Config.URL_GITHUB} icon={IconFont.GITHUB} />
          <FIcon theme="f-dark" url={Config.URL_INSTAGRAM} icon={IconFont.INSTAGRAM} />
        </div>
        <RecentPosts recent={this.props.recent} minPlaceholder={5} />
        <footer>
          <img
            alt="free icons by freepik.com"
            className="f-icons-attribution"
            src="/assets/images/freepik.png"
            srcSet="/assets/images/freepik@2x.png 2x"
          />
        </footer>
      </div>
      { this.state.searchActive && <FSearch close={() => this.toggleSearch()} /> }
    </div>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchHomeContents }, dispatch)
)(FHome);
