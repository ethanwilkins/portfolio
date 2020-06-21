import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from '../styles/Post.module.scss';

const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

class PostTag extends Component {
  state = {
    anchorEl: null
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const {
      _id,
      authorId,
      signedInUserId,
      prettyId,
      goToEditPostPage,
      deletePost
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return authorId === signedInUserId ? (
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
                (option === 'Edit' ? goToEditPostPage(prettyId) : null) ||
                (option === 'Delete' ? deletePost(_id) : null)
              }
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    ) : null;
  }
}

PostTag.propTypes = {
  _id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  prettyId: PropTypes.string.isRequired,
  goToEditPostPage: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

export default PostTag;
