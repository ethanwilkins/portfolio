import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField, Input, Button, TextareaAutosize } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Wysiwyg from "../components/Wysiwyg";
import styles from '../styles/PostForm.module.scss';

export class PostForm extends Component {

  render() {
    const {
      title,
      body,
      previewText,
      categories,
      categoryId,
      handleTitleChange,
      handleBodyChange,
      handleImageChange,
      handlePreviewTextChange,
      handleCategoryIdChange,
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

          <FormControl style={{minWidth: 120}}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={categoryId}
              onChange={handleCategoryIdChange}
            >
              {categories.map(
                category =>
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
              )}
            </Select>
          </FormControl>

          <ChipInput
            value=''
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

PostForm.defaultProps = {
  categories: [],
};

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  previewText: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleBodyChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handlePreviewTextChange: PropTypes.func.isRequired,
  handleCategoryIdChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
};

export default PostForm;
