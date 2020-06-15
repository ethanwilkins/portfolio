import { connect } from 'react-redux';
import CategoryList from '../components/CategoryList';
import {
  getCategories
} from '../actions/categoryActions';

const mapStateToProps = state => ({
  categories: state.categoryReducer.categories
});

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);
