import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import styles from '../styles/Category.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Category extends Component {
  handleDeleteClick = () => {
    const { _id, deleteCategory } = this.props;
    deleteCategory(_id);
  };

  render() {
    const {
      name,
      prettyId,
      location
    } = this.props;
    const path = location.pathname;
    return (
      <div className={styles.category}>
        <Link
          to={`/blog/category/${prettyId}`} onClick={this.handleLinkClick} className={cx(styles.link, {
            linkActive: path.includes(prettyId)
          })}>
          {name}
        </Link>
        {localStorage.jwtToken &&
          <span
            className={styles.delete}
            onClick={this.handleDeleteClick}
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
  prettyId: PropTypes.string.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default withRouter(Category);
