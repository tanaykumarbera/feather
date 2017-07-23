import React from 'react';
import throttle from 'lodash.throttle';

import './autotriggerscroll.less';

class AutoTriggerScroll extends React.Component {

  // measured from bottom of the page
  static TRIGGER_HEIGHT = 300;

  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    hasMore: React.PropTypes.bool.isRequired,
    trigger: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.trigger = throttle(props.trigger, 5000);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    const { hasMore, isLoading } = this.props;
    if (!hasMore || isLoading) return;
    /** Required condition
    * (window.scrollY + window.innerHeight + TRIGGER_HEIGHT >= document.body.scrollHeight)
    */
    const autoScroller = document.getElementById('f-auto-scroll');
    if (autoScroller && autoScroller.scrollHeight - (
      autoScroller.scrollTop + window.innerHeight) <= AutoTriggerScroll.TRIGGER_HEIGHT) {
      // The scoll bottom is yet to reach. No actions needed.
      this.trigger();
    }
  }

  render() {
    return (<div
      id="f-auto-scroll"
      onScroll={throttle(this.onScroll, 1000)}
    >
      { this.props.children }
    </div>);
  }
}

export default AutoTriggerScroll;
