import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import PostForm from "../components/PostForm";

import { createPost } from '../actions/postActions';

export class CreatePost extends Component {
  state = {
    title: '',
    image: '',
    body: '',
    previewText: '',
    wysiwygKey: Math.random(),
    inputKey: Math.random()
  };

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
    const { title, body, previewText, image } = this.state;
    const { dispatch, user } = this.props;
    if (!title.trim()) return;

    dispatch(createPost(title, body, previewText, image, user));
    // updates wysiwygKey to remount Wysiwyg
    this.setState({
      title: '',
      image: '',
      body: '',
      previewText: '',
      wysiwygKey: Math.random(),
      inputKey: Math.random()
    });
  };

  render() {
    const { title, body, previewText, wysiwygKey, inputKey } = this.state;

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
        wysiwygKey={wysiwygKey}
        inputKey={inputKey}
      />
    );
  }
}

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default compose(
  connect(mapStateToProps)
)(CreatePost);
