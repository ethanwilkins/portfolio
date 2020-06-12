import { connect } from 'react-redux';
import PostList from '../components/PostList';
import {
  deletePost,
  getPosts,
  editPost
} from '../actions/postActions';
import { getUser } from '../actions/userActions';

const mapStateToProps = state => ({
  posts: state.postReducer.posts,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  getPosts: () => dispatch(getPosts()),
  getUser: id => dispatch(getUser(id)),
  editPost: (id, title, body, previewText, image) => dispatch(editPost(id, title, body, previewText, image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
