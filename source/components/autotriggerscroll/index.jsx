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
    this.isPortrait = false;
    this.trigger = throttle(props.trigger, 5000);
    this.onScroll = throttle(this.onScroll, 1000).bind(this);
    this.updateDimensions = throttle(this.updateDimensions, 1000).bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  /** Mobile / Portrait devices, which has height auto and body is scrolling
  * Required condition
  * Portrait: Height left i.e. scroll_total_height - (scroll_top + 2 * window_height)  <= Trigger
  * In Portrait, footer is of 100vh, so twice the window height
  * Landscape: Height left i.e. scroll_total_height - (scroll_top + window_height) <= Trigger
  */
  onScroll() {
    const { hasMore, isLoading } = this.props;
    if (!hasMore || isLoading) return;
    if (this.scrollTarget.scrollHeight - (this.scrollTarget.scrollTop
      + ((this.isPortrait ? 2 : 1) * window.innerHeight))
      <= AutoTriggerScroll.TRIGGER_HEIGHT) {
      this.trigger();
    }
  }

  updateDimensions() {
    const oldScrollTarget = this.scrollTarget;
    this.isPortrait = window.innerWidth < 986;
    this.scrollTarget = this.isPortrait ? document.getElementsByClassName('f-page')[0]
      : document.getElementById('f-auto-scroll');
    if (oldScrollTarget !== undefined) {
      if (oldScrollTarget !== this.scrollTarget) {
        // reassignment - as scroll target may change.
        oldScrollTarget.removeEventListener('scroll', this.onScroll);
        this.scrollTarget.addEventListener('scroll', this.onScroll);
      } // else same. no need to remove or modify
    } else {
      // first time assignment
      this.scrollTarget.addEventListener('scroll', this.onScroll);
    }
  }

  render() {
    return (<div id="f-auto-scroll">
      { this.props.children }
    </div>);
  }
}

export default AutoTriggerScroll;
