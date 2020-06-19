import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Category from './Category';

import styles from '../styles/CategoryList.module.scss';

class CategoryList extends Component {
  state = {
    expanded: false
  }

  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories().then(() => {
      console.log("Successfully loaded categories.");
    });
    // collapses dropdown for categories in mobile on screen resize
    window.addEventListener("resize", this.collapse);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.collapse);
  };

  collapse = () => {
    this.setState({ expanded: false })
  };

  handleSeeAllClick = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  render() {
    const { categories, deleteCategory } = this.props;
    const { expanded } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.label + " linkSoft"}>
          Category
        </div>
        {categories.slice(0, (expanded ? categories.length : 3)).map(
          category =>
          <Category
            key={category._id}
            _id={category._id}
            name={category.name}
            prettyId={category.prettyId}
            deleteCategory={id => deleteCategory(id)}
          />
        )}
        <div
          className={styles.seeAllLink + " linkSoft"}
          onClick={this.handleSeeAllClick}
        >
          {expanded ? 'close' : 'see all'}
        </div>
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
