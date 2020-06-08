import { connect } from 'react-redux';
import ShowPost from '../components/ShowPost';
import {
  deletePost,
  getPost,
  editPost
} from '../actions/postsActions';
import { getUser } from '../actions/userActions';

const mapStateToProps = state => ({
  post: state.postsReducer.post
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  getPost: id => dispatch(getPost(id)),
  getUser: id => dispatch(getUser(id)),
  editPost: (id, text, author) => dispatch(editPost(id, text, author))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
