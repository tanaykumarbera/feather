import React from 'react';
import PropTypes from 'prop-types';

const AuthorBio = ({ author, theme }) => (
  <p className={`f-author-bio ${theme}`}>
    {author.user && author.user.bio}
  </p>
);

AuthorBio.propTypes = {
  theme: PropTypes.string,
  author: PropTypes.shape({
    isLoading: PropTypes.bool,
    hasError: PropTypes.bool,
    bio: PropTypes.string
  }).isRequired
};

AuthorBio.defaultProps = {
  theme: ''
};

export default AuthorBio;
