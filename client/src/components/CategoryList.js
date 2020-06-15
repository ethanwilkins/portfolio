import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CategoryList extends Component {
  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories().then(() => {
      console.log("Successfully loaded categories.");
    });
  };

  render() {
    const { categories } = this.props;

    return (
      <div>
        {categories.map(
          category =>
          <Link
            to='/'
            key={category._id}
          >
            {category.name}
          </Link>
        )}
      </div>
    );
  }
}

CategoryList.defaultProps = {
  categories: [],
};

CategoryList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  )
};

export default CategoryList;
