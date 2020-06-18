import { connect } from 'react-redux';
import TagList from '../components/TagList';
import {
  getTags, deleteTag
} from '../actions/tagActions';

const mapStateToProps = state => ({
  tags: state.tagReducer.tags
});

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(getTags()),
  deleteTag: id => dispatch(deleteTag(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
