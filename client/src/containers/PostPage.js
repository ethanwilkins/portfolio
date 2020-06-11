import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPostByPrettyId } from '../actions/postActions';

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
    prettyId: '',
    title: '',
    body: '',
    imageData: '',
    timestamp: 0
  };

  componentDidMount = () => {
    const {
      getPostByPrettyId,
      match
    } = this.props;
    const prettyId = match.params.prettyId;
    getPostByPrettyId(prettyId).then((res) => {
      this.setState({
        loading: false,
        _id: res.payload.post._id,
        author: res.payload.post.author,
        authorId: res.payload.post.authorId,
        prettyId: res.payload.post.prettyId,
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
  getPostByPrettyId: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getPostByPrettyId: prettyId => dispatch(getPostByPrettyId(prettyId))
});

export default connect(
  null,
  mapDispatchToProps
)(PostPage);
