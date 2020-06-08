import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { getPost } from '../actions/postsActions';


export class PostPage extends Component {

  componentDidMount = () => {

    const {
      retrievePost,
      match
    } = this.props;
    const postId = match.params.id;

    return retrievePost(postId).then((res) => {
      this.setState({
      });
    });
  };

  render() {
    //const { post } = this.props;
    return (
      <div>
      </div>
    );
  }
}

PostPage.propTypes = {
  retrievePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.postsReducer.post
});

const mapDispatchToProps = dispatch => ({
  retrievePost: postId => dispatch(getPost(postId))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PostPage);