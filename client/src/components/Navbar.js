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
        <div class="page_hider"></div>

        <div class="vertical_spacer"></div>

        <div class="card header_container">
          <div class="avatar_container">
            <Link to='/'>
              <img className={styles.avatar} alt="Forrest Wilkins" src={avatarImg}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
