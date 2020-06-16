import { connect } from 'react-redux';
import PostList from '../components/PostList';
import {
  deletePost,
  getPosts
} from '../actions/postActions';

const mapStateToProps = state => ({
  posts: state.postReducer.posts,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  getPosts: () => dispatch(getPosts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
