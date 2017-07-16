import React from 'react';

import PostListItem from '../postlistitem';

import './autotriggerpostlist.less';

class AutoTriggerPostList extends React.Component {

  static propTypes = {
    posts: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      image: React.PropTypes.string,
      meta: React.PropTypes.string,
      tags: React.PropTypes.array
    })).isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    trigger: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.renderLoaderIfLoading = this.renderLoaderIfLoading.bind(this);
  }

  onScroll() {
    console.log(this);
  }

  trigger() {
    this.props.trigger();
  }

  renderLoaderIfLoading() {
    return this.props.isLoading ? (<PostListItem key="loading" />) : '';
  }

  render() {
    return (<div className="f-auto-post-container" onScroll={this.onScroll}>
      { this.props.posts.map(post => (<PostListItem key={post.id} post={post} />)) }
      <PostListItem key="loading" />
      { this.renderLoaderIfLoading() }
    </div>);
  }
}

export default AutoTriggerPostList;
