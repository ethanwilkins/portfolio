import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';
import { TrixEditor } from "react-trix";
import PostFeed from './PostFeed';

import 'trix/dist/trix';
import 'trix/dist/trix.css';
import styles from '../styles/BlogPage.module.scss';

import { createPost } from '../actions/postsActions';

export class BlogPage extends Component {
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
      <div>
        <NavbarContainer />

        <div className={styles.blog}>
          <div className={styles.leftPane}>
            <div className="linkActive">
              All X Posts
            </div>
          </div>
          <div className={styles.feed}>
            {localStorage.jwtToken &&
              <div>
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

                <PostFeed />
              </div>
            }
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

BlogPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default compose(
  connect(mapStateToProps)
)(BlogPage);
