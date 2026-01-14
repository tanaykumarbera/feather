import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import SideBarPage from '../../components/sidebarpage';
import { fetchHomeContents } from '../../actions';

import Carousel from '../../components/carousel';
import Config from '../../utils/config';
import './error.less';

class FError extends React.Component {

  static propTypes = {
    fetchHomeContents: PropTypes.func.isRequired,
    author: PropTypes.shape({
      user: PropTypes.object,
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool
    }).isRequired,
    recent: PropTypes.shape({
      posts: PropTypes.array,
      isLoading: PropTypes.bool,
      hasError: PropTypes.bool
    }).isRequired
  };

  componentDidMount() {
    if (!this.props.author.user) this.props.fetchHomeContents();
  }

  render() {
    const { posts, isLoading } = this.props.recent;
    return (<SideBarPage author={this.props.author}>
      <Helmet>
        <title>{`Not Found - Error 404 - ${Config.BLOG_TITLE}`}</title>
      </Helmet>
      <div className="f-error-wrap">
        <img className="f-error-img" src="/assets/images/f-404.png" alt="" />
        <h1 className="f-error-head">Dang! Seriously, a 404?</h1>
        <h2 className="f-error-suggestion">
          {'While I don\'t have that stuff for you,'}
          <br />
          {'how about going through some of my recent publications? '}
        </h2>
        <div className="f-error-recent">
          <Carousel posts={posts} isLoading={isLoading} />
        </div>
      </div>
    </SideBarPage>);
  }
}

import { withRouter } from '../../utils/with-router';

export default connect(state => state,
  dispatch => bindActionCreators({ fetchHomeContents }, dispatch)
)(withRouter(FError));
