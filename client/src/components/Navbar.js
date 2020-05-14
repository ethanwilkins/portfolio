import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navmenu from './Navmenu';

import styles from '../styles/Navbar.module.scss';
import avatar from '../images/me.jpg';

class Navbar extends Component {
  render() {
    // const { logoutUser, user } = this.props;

    return (
      <div>
        <div className={styles.verticalSpacer}></div>

        <div className={"card " + styles.headerContainer}>
          <div className={styles.avatarContainer}>
            <Link to='/'>
              <img src={avatar} alt="Forrest Wilkins" className={styles.avatar}/>
            </Link>

            <Link to='/' className={styles.avatarName + " " + styles.headerLink}>
              Forrest Wilkins
            </Link>

            <div className={styles.avatarTitle + " linkSoft"}>
              Software Development
            </div>
          </div>

          <div className={styles.navBar}>
            <Link to='/' className={styles.navBarLink + " " + styles.headerLink + " linkActive aboutLink"}>
              About
            </Link>
            <Link to='/' className={styles.navBarLink + " " + styles.headerLink}>
              Blog
            </Link>
            <Link to='mailto:forrestwilkins@protonmail.com' className={styles.navBarLink + " " + styles.headerLink + " linkSoft " + styles.emailNavBarLink}>
              forrestwilkins@protonmail.com
            </Link>
          </div>
        </div>

        <Navmenu />
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
