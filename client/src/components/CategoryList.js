import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Category from './Category';

import styles from '../styles/CategoryList.module.scss';

class CategoryList extends Component {
  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories().then(() => {
      console.log("Successfully loaded categories.");
    });
  };

  render() {
    const { categories, deleteCategory } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.label + " linkSoft"}>
          Category
        </div>
        {categories.map(
          category =>
          <Category
            key={category._id}
            _id={category._id}
            name={category.name}
            prettyId={category.prettyId}
            deleteCategory={id => deleteCategory(id)}
          />
        )}
        <Link
          to='/'
          className={styles.seeAllLink + " linkSoft"}
        >
          see all
        </Link>
      </div>
    );
  }
}

CategoryList.defaultProps = {
  categories: [],
};

CategoryList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  )
};

export default CategoryList;
