import React from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { generateInkRipple } from '../../utils';

import './tag.less';

export default class FTag extends React.Component {

  static LINK_DELAY = 650; // same as that of animation
  static propTypes = {
    tag: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
      description: PropTypes.string,
      meta_title: PropTypes.string,
      meta_description: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func
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
