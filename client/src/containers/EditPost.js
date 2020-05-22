import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  }
});

export class EditPost extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    title: this.props.title,
    body: this.props.body
  };
  /* eslint-enable react/destructuring-assignment */

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = this.state;
    const {
      commentPostId,
      id,
      isEditingComment,
      author,
      editPost,
      handleModalClose
    } = this.props;
    if (!title.trim()) return;

    if (isEditingComment) {
      editPost('editComment', id, commentPostId, title, body);
    } else {
      editPost(id, title, body, author);
    }

    handleModalClose();
  };

  render() {
    const { title, body } = this.state;
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="textarea"
          placeholder="Title"
          multiline
          className={classes.textField}
          margin="normal"
          rowsMax="5"
          value={title}
          defaultValue={title}
          onChange={this.handleTitleChange}
        />
        <TextField
          id="textarea"
          placeholder="Body"
          multiline
          className={classes.textField}
          margin="normal"
          rowsMax="5"
          value={body}
          onChange={this.handleBodyChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Update
        </Button>
      </form>
    );
  }
}

EditPost.propTypes = {
  classes: PropTypes.object.isRequired,
  commentPostId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isEditingComment: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  editPost: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  connect()
)(EditPost);
