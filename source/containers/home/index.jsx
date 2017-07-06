import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FLoader from '../../components/fullpageloader';
import SiteLogo from '../../components/sitelogo';
import AuthorBio from '../../components/authorbio';
import SearchBar from '../../components/searchbar';
import RecentPosts from '../../components/recentposts';
import FIcon from '../../components/icon';

import { IconFont } from '../../utils';

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
    postList: React.PropTypes.shape({
      posts: React.PropTypes.array,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }).isRequired
  };

  componentWillMount() {
    this.props.fetchHomeContents();
  }

  render() {
    const { posts } = this.props.postList;
    const { user } = this.props.author;
    const loaded = (posts.length > 0 && user !== null);
    if (!loaded) {
      return (<FLoader />);
    }
    return (<div className="f-page f-home parallax">
      <div className="f-background parallax-layer parallax-layer-background">
        <div className="f-abstract abstract-1" />
        <div className="f-abstract abstract-2" />
      </div>
      <div className="f-contents parallax-layer parallax-layer-foreground">
        <img alt="author logo" src="/assets/images/logo.png" className="f-author-logo" />
        <SiteLogo />
        <AuthorBio author={this.props.author} />
        <SearchBar theme="dark" />
        <div className="f-icons-container">
          <FIcon theme="f-dark" icon={IconFont.TWITTER} />
          <FIcon theme="f-dark" icon={IconFont.GITHUB} />
          <FIcon theme="f-dark" icon={IconFont.INSTAGRAM} />
        </div>
        <RecentPosts postList={this.props.postList} minPlaceholder={5} />
        <footer>Tanay Kumar <span>Bera</span></footer>
      </div>
    </div>);
  }
}

export default connect(state => state,
  dispatch => bindActionCreators({ fetchHomeContents }, dispatch)
)(FHome);
