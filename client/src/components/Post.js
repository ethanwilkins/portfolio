import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LikeIcon from '@material-ui/icons/ThumbUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import EditModal from './EditModal';

const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

const styles = theme => ({
  actions: {
    display: 'flex'
  },
  card: {
    margin: '20px auto',
    width: '95%'
  },
  link: {
    color: '#000',
    textDecoration: 'none'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

class Post extends Component {
  state = {
    anchorEl: null,
    avatarColor: 18,
    expanded: false,
    modalOpen: false,
    name: ''
  };

  componentDidMount = () => {
    const { authorId, getUser } = this.props;
    getUser(authorId).then((res) => {
      this.setState({
        avatarColor: res.payload.user.avatarColor,
        name: res.payload.user.name
      });
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      _id,
      authorId,
      classes,
      deletePost,
      editPost,
      likers,
      likesCount,
      signedInUserId,
      title,
      body,
      timestamp,
      updatePostLikes
    } = this.props;
    const { anchorEl, modalOpen } = this.state;
    const open = Boolean(anchorEl);
    const relativeTime = moment(timestamp).fromNow();
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            authorId !== signedInUserId ? null : (
              <div>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
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
                        (option === 'Delete' ? deletePost(_id) : null) ||
                        (option === 'Edit' ? this.handleModalOpen() : null)
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )
          }
          subheader={relativeTime}
        />
        
        <CardContent>
          <Typography>{title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </CardContent>

        <EditModal
          _id={_id}
          editPost={editPost}
          handleModalClose={this.handleModalClose}
          modalOpen={modalOpen}
          title={title}
          body={body}
        />
      </Card>
    );
  }
}

Post.defaultProps = {
  comments: []
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired
};

export default withStyles(styles)(Post);
