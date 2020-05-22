import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import { TrixEditor } from "react-trix";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createPost } from '../actions/postsActions';

import 'trix/dist/trix';
import 'trix/dist/trix.css';
import styles from '../styles/BlogPage.module.scss';

export class CreatePost extends Component {
  state = {
    postText: ''
  };

  handleChange = (e) => {
    const postText = e.target.value;
    this.setState(() => ({ postText }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postText } = this.state;
    const { dispatch, user } = this.props;
    if (!postText.trim()) return;
    dispatch(createPost(postText, user));
    this.setState({ postText: '' });
  };

  render() {
    const { postText } = this.state;

    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="textarea"
          placeholder="Title"
          multiline
          margin="normal"
          rowsMax="5"
          onChange={this.handleChange}
          value={postText}
        />

        <TrixEditor
          autoFocus={true}
          placeholder="Post something awesome..."
          uploadURL="https://domain.com/imgupload/receiving/post"
          uploadData={{"key1": "value", "key2": "value"}}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Post
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
