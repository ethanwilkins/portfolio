import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField, Input, Button, TextareaAutosize } from '@material-ui/core';
import Wysiwyg from "../components/Wysiwyg";
import styles from '../styles/PostForm.module.scss';

export class PostForm extends Component {
  render() {
    const {
      title,
      body,
      previewText,
      handleTitleChange,
      handleBodyChange,
      handleImageChange,
      handlePreviewTextChange,
      handleSubmit,
      wysiwygKey,
      inputKey
    } = this.props;
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
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
              onChange={handleTitleChange}
              value={title}
              className={styles.textField}
              style={{float: 'left'}}
            />
            <Input
              type="file"
              onChange={handleImageChange}
              className={styles.imgInput}
              style={{fontSize: '10px'}}
              key={inputKey}
            />
          </div>
          <TextareaAutosize
            id="textarea"
            placeholder="Preview text"
            rowsMin={3}
            margin="normal"
            rowsMax="5"
            onChange={handlePreviewTextChange}
            value={previewText}
            className={styles.textArea}
          />
          <Wysiwyg
            value={body}
            onChange={handleBodyChange}
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
          <b>{inputKey ? 'post' : 'save'} <i className="fa fa-pencil"></i></b>
        </Button>
      </form>
    );
  }
}

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  previewText: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleBodyChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handlePreviewTextChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PostForm;
