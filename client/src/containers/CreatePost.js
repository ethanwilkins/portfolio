import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { TextField } from '@material-ui/core';
import Wysiwyg from "../components/Wysiwyg";
import { createPost } from '../actions/postsActions';

import styles from '../styles/CreatePost.module.scss';

export class CreatePost extends Component {
  state = {
    title: '',
    image: '',
    body: '',
    wysiwygKey: ''
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleImageChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    this.setState(() => ({ image }));
  };

  handleBodyChange = (body) => {
    this.setState(() => ({ body }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = this.state;
    const { dispatch, user } = this.props;
    if (!title.trim()) return;
    dispatch(createPost(title, body, user));
    // updates wysiwygKey to remount Wysiwyg
    this.setState({
      title: '',
      body: '',
      wysiwygKey: Math.random()
    });
  };

  render() {
    const { title, wysiwygKey } = this.state;

    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
        className={styles.form}
      >
        <TextField
          id="textarea"
          placeholder="Title"
          multiline
          margin="normal"
          rowsMax="5"
          onChange={this.handleTitleChange}
          value={title}
          className={styles.textField}
        />

        <input type="file" onChange={this.handleImageChange} />

        <Wysiwyg onChange={this.handleBodyChange} key={wysiwygKey}/>

        <button type="submit" name="commit" className={styles.button}>
        <b>Post <i className="fa fa-pencil"></i></b>
      </button>
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
