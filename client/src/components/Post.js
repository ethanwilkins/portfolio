import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from '../styles/Post.module.scss';

const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;


class Post extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  goToEditPostPage = (prettyId) => {
    window.location.href = `/post/${prettyId}`;
  };

  render() {
    const {
      _id,
      authorId,
      prettyId,
      deletePost,
      signedInUserId,
      title,
      previewText,
      imageData,
      timestamp
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const relativeTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(timestamp);
    return (
      <div className={styles.card}>
        {authorId === signedInUserId &&
          <div className={styles.cardHeader}>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={styles.iconButton}
              style={{padding: '0'}}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option}
                  onClick={() =>
                    this.handleClose() ||
                    (option === 'Edit' ? this.goToEditPostPage(prettyId) : null) ||
                    (option === 'Delete' ? deletePost(_id) : null)
                  }
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        }
        
        <div className={styles.cardContent}>
          {imageData &&
            <Link to={`/posts/${prettyId}`}>
              <div className={styles.mainImgContainer}>
                <LazyLoadImage
                  alt="Main image for blog post should show here."
                  effect="opacity"
                  src={'/' + imageData}
                  className={styles.mainImg}
                />
              </div>
            </Link>
          }
          <div className={styles.time}>{relativeTime} —</div>
          
          <Link to={`/posts/${prettyId}`}>
            <h2 className={styles.title}>
              {title}
            </h2>
          </Link>
          <div className={styles.previewText}>
            {previewText}
          </div>
          <div className={styles.category + ' linkSoft'}>
            <i>Web Development - Ruby on Rails</i>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  prettyId: PropTypes.string.isRequired,
  deletePost: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  previewText: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default Post;
