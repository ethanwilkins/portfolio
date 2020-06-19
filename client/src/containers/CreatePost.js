import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import PostForm from "../components/PostForm";

import { createPost } from '../actions/postActions';
import { getCategories } from '../actions/categoryActions';
import { getTags } from '../actions/tagActions';

export class CreatePost extends Component {
  state = {
    title: '',
    image: '',
    body: '',
    previewText: '',
    categoryId: '',
    selectedTags: [],
    wysiwygKey: Math.random(),
    selectKey: Math.random(),
    inputKey: Math.random()
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(getCategories());
    dispatch(getTags());
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

  handleTagsChange = (tags) => {
    let selectedTags = [];
    tags.forEach(function(tag) {
      // strips each down to _id
      selectedTags.push(tag.value);
    });
    this.setState(() => ({ selectedTags }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, previewText, image, categoryId, selectedTags } = this.state;
    const { dispatch, user } = this.props;
    if (!title.trim()) return;

    dispatch(createPost(title, body, previewText, categoryId, selectedTags, image, user));
    // updates wysiwygKey to remount Wysiwyg
    this.setState({
      title: '',
      image: '',
      body: '',
      previewText: '',
      categoryId: '',
      selectedTags: [],
      wysiwygKey: Math.random(),
      selectKey: Math.random(),
      inputKey: Math.random()
    });
  };

  render() {
    const { title, body, previewText, categoryId, selectedTags, wysiwygKey, inputKey, selectKey } = this.state;
    const { categories, tags } = this.props;

    return localStorage.jwtToken ? (
      <PostForm
        title={title}
        body={body}
        previewText={previewText}
        categories={categories}
        categoryId={categoryId}
        tags={tags}
        selectedTags={selectedTags}
        handleTitleChange={this.handleTitleChange}
        handleBodyChange={this.handleBodyChange}
        handleImageChange={this.handleImageChange}
        handlePreviewTextChange={this.handlePreviewTextChange}
        handleCategoryIdChange={this.handleCategoryIdChange}
        handleTagsChange={this.handleTagsChange}
        handleSubmit={this.handleSubmit}
        wysiwygKey={wysiwygKey}
        selectKey={selectKey}
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
  categories: state.categoryReducer.categories,
  tags: state.tagReducer.tags
});

export default compose(
  connect(mapStateToProps)
)(CreatePost);
