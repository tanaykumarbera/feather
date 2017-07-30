import React from 'react';

import SiteLogo from '../../components/sitelogo';
import AuthorBio from '../../components/authorbio';
import SearchBar from '../../components/searchbar';
import FIcon from '../../components/icon';

import { IconFont } from '../../utils';
import Config from '../../utils/config';

import './sidebar.less';

const SideBar = ({ author }) => (
  <div className="f-sidebar">
    { author.user && (
      <div className="fs-contents">
        <SiteLogo theme="light" />
        <AuthorBio author={author} theme="light" />
        <SearchBar theme="light" />
        <div className="f-icons-container">
          <FIcon theme="f-light" url={Config.URL_TWITTER} icon={IconFont.TWITTER} />
          <FIcon theme="f-light" url={Config.URL_GITHUB} icon={IconFont.GITHUB} />
          <FIcon theme="f-light" url={Config.URL_INSTAGRAM} icon={IconFont.INSTAGRAM} />
        </div>
      </div>
    )}
  </div>
);

SideBar.propTypes = {
  author: React.PropTypes.shape({
    user: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
    hasError: React.PropTypes.bool
  }).isRequired
};

export default SideBar;
