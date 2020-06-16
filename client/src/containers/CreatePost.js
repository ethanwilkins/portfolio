import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import PostForm from "../components/PostForm";

import { createPost } from '../actions/postActions';
import { getCategories } from '../actions/categoryActions';

export class CreatePost extends Component {
  state = {
    title: '',
    image: '',
    body: '',
    previewText: '',
    wysiwygKey: Math.random(),
    inputKey: Math.random()
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getCategories());
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
    const { categories } = this.props;

    return localStorage.jwtToken ? (
      <PostForm
        title={title}
        body={body}
        previewText={previewText}
        categories={categories}
        handleTitleChange={this.handleTitleChange}
        handleBodyChange={this.handleBodyChange}
        handleImageChange={this.handleImageChange}
        handlePreviewTextChange={this.handlePreviewTextChange}
        handleSubmit={this.handleSubmit}
        wysiwygKey={wysiwygKey}
        inputKey={inputKey}
      />
    ) : null;
  }
}

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
  categories: state.categoryReducer.categories
});

export default compose(
  connect(mapStateToProps)
)(CreatePost);
