import React from 'react';
import { Link } from 'react-router-dom';
import { IconFont } from '../../utils';
import Config from '../../utils/config';

const SiteLogo = () => (<div className="f-sitelogo">
  <Link to={Config.URL_HOME}>
    <span className="f-icon" data-icon={IconFont.SITE_LOGO} />
  </Link>
</div>);

export default SiteLogo;
