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
    categoryId: '',
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

  handleCategoryIdChange = (e) => {
    const categoryId = e.target.value;
    this.setState(() => ({ categoryId }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, previewText, image, categoryId } = this.state;
    const { dispatch, user } = this.props;
    if (!title.trim()) return;

    dispatch(createPost(title, body, previewText, image, user, categoryId));
    // updates wysiwygKey to remount Wysiwyg
    this.setState({
      title: '',
      image: '',
      body: '',
      previewText: '',
      categoryId: '',
      wysiwygKey: Math.random(),
      inputKey: Math.random()
    });
  };

  render() {
    const { title, body, previewText, categoryId, wysiwygKey, inputKey } = this.state;
    const { categories } = this.props;

    return localStorage.jwtToken ? (
      <PostForm
        title={title}
        body={body}
        previewText={previewText}
        categories={categories}
        categoryId={categoryId}
        handleTitleChange={this.handleTitleChange}
        handleBodyChange={this.handleBodyChange}
        handleImageChange={this.handleImageChange}
        handlePreviewTextChange={this.handlePreviewTextChange}
        handleCategoryIdChange={this.handleCategoryIdChange}
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
