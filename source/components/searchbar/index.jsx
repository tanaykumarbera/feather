import React, { PropTypes } from 'react';
import FIcon from '../icon';
import { IconFont } from '../../utils';

import './searchbar.less';

const SearchBar = props => (
  <button className={`f-searchbar ${props.theme}`} >
    What&apos;s in your mind?
    <FIcon icon={IconFont.SEARCH} />
  </button>
);

SearchBar.propTypes = {
  theme: PropTypes.string
};

SearchBar.defaultProps = {
  theme: ''
};

export default SearchBar;
