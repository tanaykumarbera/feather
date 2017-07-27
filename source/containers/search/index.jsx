import React from 'react';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import FIcon from '../../components/icon';
import FTag from '../../components/tag';
import { IconFont } from '../../utils';
import './search.less';

class FSearch extends React.Component {

  static propTypes = {
    close: React.PropTypes.func.isRequired,
    searchList: React.PropTypes.shape({
      posts: React.PropTypes.array,
      isLoading: React.PropTypes.bool,
      hasError: React.PropTypes.bool
    })
  };

  static defaultProps = {
    searchList: {
      posts: [],
      isLoading: true,
      hasError: false
    }
  }

  static searchItem(post) {
    return (<div className="fs-item">
      <Link to={`/${post.slug}`} >
        <h2 className="fs-item-title">{ post.title }</h2>
      </Link>
      <div
        className="fs-item-excerpt"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(post.html, {
            allowedTags: ['p', 'b', 'i', 'strong', 'a']
          })
        }}
      />
      <div className="fs-item-tags">
        <FIcon theme="f-dark" icon={IconFont.BUBBLE} />
        {post.tags.map(tag => (<FTag key={tag.id} tag={tag} />))}
      </div>
    </div>);
  }

  render() {
    const { posts, isLoading } = this.props.searchList;
    return (<div className="f-search-container">
      <div className="f-search-wrap">
        <input id="f-search-input" type="text" placeholder="What are you looking for?" />
        <span className={`f-inputLoader ${isLoading ? 'loading' : ''}`} />
        <div className="f-search-result-wrap">
          { posts.length > 0 && posts.map(post => FSearch.searchItem(post)) }
        </div>
        <button onClick={this.props.close}>
          <FIcon icon={IconFont.CROSS} />
        </button>
      </div>
    </div>);
  }
}

/** Kept for reference
export default connect(state => state,
  dispatch => bindActionCreators(null, dispatch)
)(FSearch);
*/
export default FSearch;
