import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import FullPost from './FullPost';
import NavbarContainer from '../containers/NavbarContainer';
import Footer from './Footer';

import styles from '../styles/ShowPost.module.scss';

class ShowPost extends Component {
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

ShowPost.defaultProps = {
  post: {},
};

ShowPost.propTypes = {
  getPost: PropTypes.func.isRequired
};

export default ShowPost;