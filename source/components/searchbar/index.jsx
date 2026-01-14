import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FIcon from '../icon';
import { IconFont } from '../../utils';

import './searchbar.less';

const SearchBar = ({ theme }) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleBlur = () => {
    if (!query) setIsActive(false);
  };

  if (!isActive) {
    return (
      <button
        className={`f-searchbar ${theme}`}
        onClick={() => setIsActive(true)}
        type="button"
      >
        Enter keywords...
        <FIcon icon={IconFont.SEARCH} />
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`f-searchbar ${theme} active`}
      style={{ display: 'inline-flex', alignItems: 'center', cursor: 'text', padding: '0.8em 1.4em' }}
    >
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={handleBlur}
        placeholder="Enter keywords..."
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          width: '100%',
          color: 'inherit',
          fontSize: 'inherit',
          fontFamily: 'inherit'
        }}
      />
      <button type="submit" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
        <FIcon icon={IconFont.SEARCH} />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  theme: PropTypes.string
};

SearchBar.defaultProps = {
  theme: ''
};

export default SearchBar;
