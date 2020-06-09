import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPost } from '../actions/postActions';

import Loading from '../components/Loading';
import FullPost from '../components/FullPost';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import styles from '../styles/PostPage.module.scss';


class PostPage extends Component {
  state = {
    loading: true,
    _id: '',
    author: '',
    authorId: '',
    title: '',
    body: '',
    imageData: '',
    timestamp: 0
  };

  componentDidMount = () => {
    const {
      getPost,
      match
    } = this.props;
    const postId = match.params.id;
    getPost(postId).then((res) => {
      this.setState({
        loading: false,
        _id: res.payload.post._id,
        author: res.payload.post.author,
        authorId: res.payload.post.authorId,
        title: res.payload.post.title,
        body: res.payload.post.body,
        imageData: res.payload.post.imageData,
        timestamp: res.payload.post.timestamp
      });
    });
  };

  render() {
    const {
      loading,
      _id,
      author,
      authorId,
      title,
      body,
      imageData,
      timestamp
    } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <NavbarContainer />
        <div className={styles.container}>
          <FullPost
            key={_id}
            _id={_id}
            author={author}
            authorId={authorId}
            title={title}
            body={body}
            imageData={imageData}
            timestamp={timestamp}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

PostPage.propTypes = {
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.postsReducer.post
});

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(getPost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
