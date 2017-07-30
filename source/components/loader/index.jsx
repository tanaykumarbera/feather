import React, { PropTypes } from 'react';
import './loader.less';

const FLoader = ({ text }) => (<div className="f-loader-wrap">
  <div className="f-loader">
    <span className="f-loader-item-1" />
    <span className="f-loader-item-2" />
    <span className="f-loader-item-3" />
  </div>
  { text && <p>{ text }</p> }
</div>);

FLoader.propTypes = {
  text: PropTypes.string
};

FLoader.defaultProps = {
  text: undefined
};

export default FLoader;
