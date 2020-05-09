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
        <div class="pageHider"></div>

        <div className={styles.verticalSpacer}></div>

        <div className={"card " + styles.headerContainer}>
          <div className={styles.avatarContainer}>
            <Link to='/'>
              <img className={styles.avatar} alt="Forrest Wilkins" src={avatarImg}/>
            </Link>

            <Link to='/' className={styles.avatarName + " " + styles.headerLink}>
              Forrest Wilkins
            </Link>

            <div className={styles.avatarTitle + " linkSoft"}>
              Software Development
            </div>
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
