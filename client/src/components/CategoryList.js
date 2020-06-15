import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../styles/CategoryList.module.scss';

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
      <div className={styles.container}>
        <div className={styles.label + " linkSoft"}>
          Category
        </div>
        {categories.map(
          category =>
          <Link
            to='/'
            key={category._id}
            className={styles.link}
          >
            {category.name}
          </Link>
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  )
};

export default CategoryList;
