import { connect } from 'react-redux';
import PostList from '../components/PostList';
import {
  deletePost,
  getPosts,
  editPost
} from '../actions/postsActions';
import { getUser } from '../actions/userActions';

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  getPosts: () => dispatch(getPosts()),
  getUser: id => dispatch(getUser(id)),
  editPost: (id, text, author) => dispatch(editPost(id, text, author))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
