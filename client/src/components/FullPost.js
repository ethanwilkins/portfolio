import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import PostTag from "./PostTag";
import PostMenu from "./PostMenu";

import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from '../styles/FullPost.module.scss';

import { getCategory } from '../actions/categoryActions';
import { getTag } from '../actions/tagActions';

class FullPost extends Component {
  state = {
    category: {}
  };

  componentDidMount = () => {
    const { categoryId, getCategory } = this.props;
    getCategory(categoryId).then((res) => {
      this.setState({
        category: res.payload.category,
      });
    });
  };

  goToEditPostPage = (prettyId) => {
    window.location.href = `/edit_post/${prettyId}`;
  };

  render() {
    const {
      _id,
      authorId,
      prettyId,
      deletePost,
      getTag,
      signedInUserId,
      tags,
      title,
      body,
      imageData,
      timestamp
    } = this.props;
    const { category } = this.state;
    const relativeTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(timestamp);
    return (
      <div className={styles.card}>
        <PostMenu
          _id={_id}
          authorId={authorId}
          signedInUserId={signedInUserId}
          prettyId={prettyId}
          goToEditPostPage={this.goToEditPostPage}
          deletePost={deletePost}
        />

        <div className={styles.cardContent}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.time}>{relativeTime} —</div>

          {imageData &&
            <div className={styles.mainImgContainer}>
              <LazyLoadImage
                alt="Main image for blog post should show here."
                effect="opacity"
                src={'/' + imageData}
                className={styles.mainImg}
              />
            </div>
          }
          
          <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />

          <div>
            {body}
          </div>
          
          <div className={styles.category + ' linkSoft'}>
            <i>
              <Link to={`/blog/category/${category.prettyId}`} className='linkSoft'>
                {category.name}
              </Link> - {

              (tags ? tags.map(tag => 
                <PostTag
                  key={tag}
                  _id={tag}
                  tags={tags}
                  getTag={getTag}
                />
              ) : null)}
            </i>
          </div>
        </div>
      </div>
    );
  }
}

FullPost.propTypes = {
  _id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  prettyId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  getCategory: PropTypes.func.isRequired,
  getTag: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  timestamp: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => ({
  getTag: id => dispatch(getTag(id)),
  getCategory: id => dispatch(getCategory(id))
});

export default connect(
  null,
  mapDispatchToProps
)(FullPost);
