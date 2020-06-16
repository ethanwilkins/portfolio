import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


import styles from '../styles/Category.module.scss';

class Category extends Component {
  handleClick = () => {
    const { _id, deleteCategory } = this.props;
    deleteCategory(_id);
  };

  render() {
    const {
      name
    } = this.props;
    return (
      <div className={styles.category}>
        <Link
          to='/'
          className={styles.link}
        >
          {name}
        </Link>
        {localStorage.jwtToken &&
          <span
            className={styles.delete}
            onClick={this.handleClick}
          >
            <i className="fa fa-trash"></i>
          </span>
        }
      </div>
    );
  }
}

Category.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default Category;
