import React, { PropTypes } from 'react';
import { IconFont } from '../../utils';

const SiteLogo = (props) => {
  const theme = `f-sitelogo ${props.theme}`;
  return (<div className={theme}>
    <span className="f-icon" data-icon={IconFont.SITE_LOGO} />
  </div>);
};

SiteLogo.propTypes = {
  theme: PropTypes.string
};

SiteLogo.defaultProps = {
  theme: ''
};

export default SiteLogo;
