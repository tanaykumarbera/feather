import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { generateInkRipple } from '../../utils';

import './tag.less';

export default class FTag extends React.Component {

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
    console.log('Click');
    event.preventDefault();
    if (this.domInstance) {
      // diable rule, because Link is not in our territory and we need
      // dom element of anchor used to create ripple
      // eslint-disable-next-line react/no-find-dom-node
      const domElement = ReactDOM.findDOMNode(this.domInstance);
      if (domElement) generateInkRipple(domElement, event);
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
        to={`/${tag.slug}`}
        onClick={this.onClick}
        className="post-tag"
      >
        { `#${tag.name}` }
      </Link>
    </div>);
  }
}
