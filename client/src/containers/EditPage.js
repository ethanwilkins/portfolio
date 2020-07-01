import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

import { getPostByPrettyId, editPost } from '../actions/postActions';
import { getCategories } from '../actions/categoryActions';
import { getTags, getTag } from '../actions/tagActions';

import Loading from '../components/Loading';
import PostForm from '../components/PostForm';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import styles from '../styles/EditPage.module.scss';

class EditPage extends Component {
  state = {
    loading: true,
    _id: '',
    author: '',
    authorId: '',
    prettyId: '',
    title: '',
    body: '',
    previewText: '',
    image: '',
    categoryId: '',
    selectedTags: [],
    tagsChanged: false,
    timestamp: 0
  };

  componentDidMount = () => {
    const { dispatch, match, history } = this.props;
    const prettyId = match.params.prettyId;
    // secures editing of posts, must be logged in to edit
    if (!localStorage.jwtToken) {
      history.push('/login');
    }
    dispatch(getPostByPrettyId(prettyId)).then((res) => {
      let savedTags = [];
      if (res.payload.post.tags) {
        res.payload.post.tags.forEach(function(tag) {
          dispatch(getTag(tag)).then((res) => {
            savedTags.push({value: tag, label: res.payload.tag.name});
          });
        });
      }

      this.setState({
        loading: false,
        id: res.payload.post._id,
        prettyId: res.payload.post.prettyId,
        title: res.payload.post.title,
        body: res.payload.post.body,
        previewText: res.payload.post.previewText,
        categoryId: res.payload.post.categoryId,
        selectedTags: savedTags,
        timestamp: res.payload.post.timestamp
      });

    });
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
    this.setState({
      selectedTags: selectedTags,
      tagsChanged: true
    });
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    const { id, title, body, image, previewText, categoryId, selectedTags, tagsChanged, prettyId } = this.state;
    if (!title.trim()) return;
    dispatch(editPost(id, prettyId, title, body, previewText, categoryId, (tagsChanged ? selectedTags : []), image));
  };

  render() {
    const {
      loading,
      title,
      body,
      previewText,
      categoryId,
      selectedTags
    } = this.state;
    const { categories, tags } = this.props;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <NavbarContainer />
        <div className={styles.container}>
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
          />
        </div>
        <Footer />
      </div>
    );
  }
}

EditPage.propTypes = {
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
)(EditPage);