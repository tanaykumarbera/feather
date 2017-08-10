import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

import './icon.less';

const FIcon = (props) => {
  const theme = `f-icon ${props.theme}`;
  return props.url ?
    (props.link
      ? (<Link to={props.url} className="f-icon-wrap">
        <span className={theme} data-icon={props.icon} />
      </Link>) : (<a
        href={props.url}
        className="f-icon-wrap"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={theme} data-icon={props.icon} />
      </a>)
    ) : (<span className={theme} data-icon={props.icon} />);
};

FIcon.propTypes = {
  theme: PropTypes.string,
  url: PropTypes.string,
  link: PropTypes.bool,
  icon: PropTypes.string.isRequired
};

FIcon.defaultProps = {
  theme: '',
  url: null,
  link: false
};

export default FIcon;
