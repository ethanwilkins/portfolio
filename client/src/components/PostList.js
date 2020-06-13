import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import Loading from './Loading';

class PostList extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    const { getPosts } = this.props;
    getPosts().then(() => {
      this.setState({
        loading: false
      });
    });
  };

  render() {
    const {
      deletePost,
      editPost,
      getUser,
      posts,
      user
    } = this.props;
    const { loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div>
        {posts.map(
          post =>
            <Post
              key={post._id}
              _id={post._id}
              author={post.author}
              authorId={post.authorId}
              prettyId={post.prettyId}
              signedInUserId={user.userId}
              title={post.title}
              body={post.body}
              previewText={post.previewText}
              imageData={post.imageData}
              timestamp={post.timestamp}
              deletePost={id => deletePost(id)}
              editPost={(id, title, body, previewText, image) => editPost(id, title, body, previewText, image)}
              getUser={id => getUser(id)}
            />
        )}
      </div>
    );
  }
}

PostList.defaultProps = {
  posts: [],
};

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      prettyId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      previewText: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ),
  getUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string
  })
};

export default PostList;
