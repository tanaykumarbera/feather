import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from '../../actions';

import './base.less';

class Comp extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  }
  static defaultProps = {
    children: '',
    fetchPosts: null,
    isLoading: false
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        {JSON.stringify(this.props)}
        <br />
        {this.props.children}
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
