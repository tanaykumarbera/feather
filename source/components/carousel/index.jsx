import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import './carousel.less';

const Carousel = ({ posts, isLoading }) => {
    if (isLoading) {
        return (
            <div className="f-carousel">
                {/* Skeleton items */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="f-carousel-item" style={{ height: '300px', background: '#f5f5f5' }} />
                ))}
            </div>
        );
    }

    if (!posts || posts.length === 0) return null;

    return (
        <div className="f-carousel">
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </div>
    );
};

Carousel.propTypes = {
    posts: PropTypes.array,
    isLoading: PropTypes.bool
};

Carousel.defaultProps = {
    posts: [],
    isLoading: false
};

export default Carousel;
