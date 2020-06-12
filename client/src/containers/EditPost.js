import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostForm from "../components/PostForm";

export class EditPost extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    title: this.props.title,
    body: this.props.body,
    image: this.props.image,
    previewText: this.props.previewText,
  };
  /* eslint-enable react/destructuring-assignment */

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleImageChange = (e) => {
    let image = e.target.files[0];
    this.setState(() => ({ image }));
  };

  handleBodyChange = (body) => {
    this.setState(() => ({ body }));
  };

  handlePreviewTextChange = (e) => {
    const previewText = e.target.value;
    this.setState(() => ({ previewText }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, image, previewText } = this.state;
    const {
      id,
      author,
      editPost,
      handleModalClose
    } = this.props;
    if (!title.trim()) return;
    editPost(id, title, body, image, previewText, author);
    handleModalClose();
  };

  render() {
    const { title, body, image, previewText } = this.state;
    return (
      <PostForm
        title={title}
        body={body}
        previewText={previewText}
        handleTitleChange={this.handleTitleChange}
        handleBodyChange={this.handleBodyChange}
        handleImageChange={this.handleImageChange}
        handlePreviewTextChange={this.handlePreviewTextChange}
        handleSubmit={this.handleSubmit}
      />
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

export default EditPost;
