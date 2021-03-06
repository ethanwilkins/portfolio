import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Post from './Post';
import Loading from './Loading';

class PostList extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    const { getPosts, history } = this.props;

    getPosts().then(() => {
      this.setState({
        loading: false
      });
    });
    history.listen((location) => {
      // when user clicks See X Posts after filtering by category
      if (location.pathname === '/blog') {
        getPosts().then(() => {
          console.log('Reloaded posts successfully.');
        });
      }
    });
  };

  render() {
    const {
      deletePost,
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
              categoryId={post.categoryId}
              signedInUserId={user.userId}
              title={post.title}
              body={post.body}
              previewText={post.previewText}
              imageData={post.imageData}
              tags={post.tags}
              timestamp={post.timestamp}
              deletePost={id => deletePost(id)}
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
      categoryId: PropTypes.string.isRequired,
      tags: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      previewText: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ),
  user: PropTypes.shape({
    userId: PropTypes.string
  })
};

export default withRouter(PostList);
