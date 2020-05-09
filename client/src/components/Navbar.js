import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Navbar.module.scss';
import avatarImg from "../images/me.jpg";

import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    // const { logoutUser, user } = this.props;

    return (
      <div>
        <Link to='/'>
          <img className={styles.avatar} alt="Forrest Wilkins" src={avatarImg}/>
        </Link>
        Test
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
