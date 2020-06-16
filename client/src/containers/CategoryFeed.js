import { connect } from 'react-redux';
import CategoryList from '../components/CategoryList';
import {
  getCategories, deleteCategory
} from '../actions/categoryActions';

const mapStateToProps = state => ({
  categories: state.categoryReducer.categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories()),
  deleteCategory: id => dispatch(deleteCategory(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
