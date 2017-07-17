import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { generateInkRipple } from '../../utils';

import './tag.less';

export default class FTag extends React.Component {

  static LINK_DELAY = 650; // same as that of animation
  static propTypes = {
    tag: React.PropTypes.shape({
      name: React.PropTypes.string,
      slug: React.PropTypes.string,
      description: React.PropTypes.string,
      meta_title: React.PropTypes.string,
      meta_description: React.PropTypes.string
    }).isRequired,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    onClick: null
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (this.domInstance) {
      // diable rule, because Link is not in our territory and we need
      // dom element of anchor used to create ripple
      // eslint-disable-next-line react/no-find-dom-node
      const domElement = ReactDOM.findDOMNode(this.domInstance);
      if (!domElement) return;
      if (domElement.getAttribute('clicked')) {
        domElement.removeAttribute('clicked');
      } else {
        event.preventDefault();
        domElement.setAttribute('clicked', true);
        generateInkRipple(domElement, event);
        setTimeout(() => {
          domElement.querySelector('a').click();
        }, FTag.LINK_DELAY);
      }
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const { tag } = this.props;
    return (<div
      className="post-tag-wrap paper"
      ref={(instance) => { this.domInstance = instance; }}
    >
      <Link
        id={this.domId}
        to={`/tag/${tag.slug}`}
        onClick={this.onClick}
        className="post-tag"
      >
        { `#${tag.name}` }
      </Link>
    </div>);
  }
}
