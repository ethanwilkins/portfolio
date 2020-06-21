import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPostByPrettyId, deletePost } from '../actions/postActions';

import Loading from '../components/Loading';
import FullPost from '../components/FullPost';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import styles from '../styles/PostPage.module.scss';

import { DiscussionEmbed } from 'disqus-react';

class PostPage extends Component {
  state = {
    loading: true,
    _id: '',
    author: '',
    authorId: '',
    prettyId: '',
    categoryId: '',
    tags: [],
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
        categoryId: res.payload.post.categoryId,
        tags: res.payload.post.tags,
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
      prettyId,
      categoryId,
      tags,
      title,
      body,
      imageData,
      deletePost,
      editPost,
      timestamp
    } = this.state;
    const { user } = this.props;
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
            signedInUserId={user.userId}
            prettyId={prettyId}
            categoryId={categoryId}
            tags={tags}
            title={title}
            body={body}
            imageData={imageData}
            deletePost={id => deletePost(id)}
            editPost={(id, title, body, previewText, categoryId, image) => editPost(id, title, body, previewText, categoryId, image)}
            timestamp={timestamp}
          />
          <DiscussionEmbed
            shortname='https-forrestwebco-com'
            config={
              {
                url: 'https://forrestwebco.com',
                identifier: _id,
                title: title,
              }
            }
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

const mapStateToProps = state => ({
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  getPostByPrettyId: prettyId => dispatch(getPostByPrettyId(prettyId)),
  deletePost: id => dispatch(deletePost(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
