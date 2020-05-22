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
//import styles from '../styles/CreatePost.module.scss';

export class CreatePost extends Component {
  state = {
    title: '',
    body: ''
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleBodyChange = (e) => {
    const body = e.target.value;
    this.setState(() => ({ body }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = this.state;
    const { dispatch, user } = this.props;
    if (!title.trim()) return;
    dispatch(createPost(title, body, user));
    this.setState({
      title: '',
      body: ''
    });
  };

  render() {
    const { title, body } = this.state;

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
          onChange={this.handleTitleChange}
          value={title}
        />

        <TextField
          id="textarea"
          placeholder="Body"
          multiline
          margin="normal"
          rowsMax="5"
          onChange={this.handleBodyChange}
          value={body}
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
