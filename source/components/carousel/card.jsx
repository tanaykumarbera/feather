import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
    const image = post.feature_image || post.image || '/assets/images/sample.png';

    return (
        <div className="f-carousel-item">
            <Link to={`/${post.slug}`}>
                <img src={image} alt={post.title} className="f-card-image" loading="lazy" />
                <div className="f-card-content">
                    <h3 className="f-card-title">{post.title}</h3>
                    <div className="f-card-meta">
                        <time dateTime={post.published_at}>
                            {new Date(post.published_at).toLocaleDateString()}
                        </time>
                        {post.reading_time && <span>{post.reading_time} min read</span>}
                    </div>
                </div>
            </Link>
        </div>
    );
};

Card.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        image: PropTypes.string,
        published_at: PropTypes.string,
        reading_time: PropTypes.number
    }).isRequired
};

export default Card;
