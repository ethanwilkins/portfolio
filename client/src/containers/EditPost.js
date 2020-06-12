import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Wysiwyg from "../components/Wysiwyg";

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
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="textarea"
          placeholder="Title"
          multiline
          margin="normal"
          rowsMax="5"
          value={title}
          onChange={this.handleTitleChange}
        />

        <Wysiwyg
          value={body}
          onChange={this.handleBodyChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>
      </form>
    );
  }
}

EditPost.propTypes = {
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
  connect()
)(EditPost);
