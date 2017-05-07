import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions';

require('./base.less');

class Comp extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    fetchPosts: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool.isRequired
  }
  static defaultProps = {
    children: '',
    fetchPosts: null,
    isLoading: false
  }
  componentWillMount() {
    this.props.fetchPosts();
  }
  render() {
    return this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        { JSON.stringify(this.props) }
        <br />
        { this.props.children }
      </div>
    );
  }
}

function mapStateToProps({ postList }) {
  return { ...postList };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp);
