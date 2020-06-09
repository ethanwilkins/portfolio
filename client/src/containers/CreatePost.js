import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { TextField, Input, Button, TextareaAutosize } from '@material-ui/core';
import Wysiwyg from "../components/Wysiwyg";
import { createPost } from '../actions/postsActions';

import styles from '../styles/CreatePost.module.scss';

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
    const { title, previewText, wysiwygKey, inputKey } = this.state;

    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={styles.form}
      >
        <div className={styles.fields}>
          <div className={styles.row}>
            <TextField
              id="textarea"
              placeholder="Title"
              multiline
              margin="normal"
              rowsMax="5"
              onChange={this.handleTitleChange}
              value={title}
              className={styles.textField}
              style={{float: 'left'}}
            />
            <Input
              type="file"
              onChange={this.handleImageChange}
              key={inputKey}
              className={styles.imgInput}
              style={{fontSize: '10px'}}
            />
          </div>

          <TextareaAutosize
            id="textarea"
            placeholder="Preview text"
            rowsMin={3}
            margin="normal"
            rowsMax="5"
            onChange={this.handlePreviewTextChange}
            value={previewText}
            className={styles.textArea}
          />

          <Wysiwyg
            onChange={this.handleBodyChange}
            key={wysiwygKey}
          />
        </div>

        <Button
          type="submit"
          name="commit"
          className={styles.button}
          variant="contained"
          style={{background: 'rgb(105, 220, 150)', color: 'white'}}
        >
          <b>post <i className="fa fa-pencil"></i></b>
        </Button>
      </form>
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
