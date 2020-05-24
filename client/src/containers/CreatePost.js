import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Wysiwyg from "../components/Wysiwyg";
import { createPost } from '../actions/postsActions';

export class CreatePost extends Component {
  state = {
    title: '',
    body: ''
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleBodyChange = (body) => {
    this.setState({body : body});
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
    const { title } = this.state;

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

        <Wysiwyg onChange={this.handleBodyChange} />

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
