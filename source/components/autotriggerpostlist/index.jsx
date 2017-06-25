import React from 'react';

import './autotriggerpostlist.less';

class AutoTriggerPostList extends React.Component {

  static postType = {
    author: React.PropTypes.shape({
      user: React.PropTypes.object,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    console.log(this);
  }

  render() {
    return (<div className="f-post-container" onScroll={this.onScroll}>
      { 'Post List' }
    </div>);
  }
}

export default AutoTriggerPostList;
