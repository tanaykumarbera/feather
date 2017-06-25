import React, { PropTypes } from 'react';

import SideBar from '../sidebar';

import './sidebarpage.less';

const SideBarPage = ({ author, children }) => (
  <div className="f-page f-sidebar-page">
    <SideBar author={author} />
    <div className="f-sp-contents">
      { children }
    </div>
  </div>
);

SideBarPage.propTypes = {
  author: PropTypes.shape({
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    bio: PropTypes.string
  }).isRequired,
  children: React.PropTypes.node.isRequired
};

export default SideBarPage;
