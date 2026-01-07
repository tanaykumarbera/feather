import React from 'react';
import PropTypes from 'prop-types';
import './loader.less';

const FLoader = ({ text, light }) => (<div className="f-loader-wrap">
  <div className={`f-loader${light ? ' f-loader-light' : ''}`}>
    <span className="f-loader-item-1" />
    <span className="f-loader-item-2" />
    <span className="f-loader-item-3" />
  </div>
  {text && <p>{text}</p>}
</div>);

FLoader.propTypes = {
  text: PropTypes.string,
  light: PropTypes.bool
};

FLoader.defaultProps = {
  text: undefined,
  light: false
};

export default FLoader;
