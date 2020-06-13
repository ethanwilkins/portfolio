import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from '../styles/FullPost.module.scss';

class FullPost extends Component {
  render() {
    const {
      title,
      body,
      imageData,
      timestamp
    } = this.props;
    const relativeTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(timestamp);
    return (
      <div className={styles.card}>
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
          <div className={styles.category + ' linkSoft'}>
            <i>Web Development - Ruby on Rails</i>
          </div>
        </div>
      </div>
    );
  }
}

FullPost.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default FullPost;
