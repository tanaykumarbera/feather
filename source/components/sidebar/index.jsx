import React from 'react';
import PropTypes from 'prop-types';


import SiteLogo from '../../components/sitelogo';
import AuthorBio from '../../components/authorbio';
import SearchBar from '../../components/searchbar';
import FIcon from '../../components/icon';

import { IconFont } from '../../utils';
import Config from '../../utils/config';

import './sidebar.less';

const SideBar = ({ author }) => (
  <div className="f-sidebar">
    <div className={`fs-contents${author.user ? '' : ' fs-not-ready'}`}>
      <SiteLogo theme="light" />
      <AuthorBio author={author} theme="light" />
      <SearchBar theme="light" />
      <div className="f-icons-container">
        <FIcon theme="f-light" url={Config.URL_TWITTER} icon={IconFont.TWITTER} />
        <FIcon theme="f-light" url={Config.URL_GITHUB} icon={IconFont.GITHUB} />
        <FIcon theme="f-light" url={Config.URL_INSTAGRAM} icon={IconFont.INSTAGRAM} />
      </div>
    </div>
  </div>
);

SideBar.propTypes = {
  author: PropTypes.shape({
    user: PropTypes.object,
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool
  }).isRequired
};

export default SideBar;
