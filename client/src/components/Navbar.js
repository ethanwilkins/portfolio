import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navmenu from './Navmenu';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import styles from '../styles/Navbar.module.scss';
import avatar from '../images/me.jpg';

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="verticalSpacer"></div>

        <div className={styles.headerContainer}>
          <div className={styles.avatarContainer}>
            <Link to='/'>
              <LazyLoadImage
                alt='Forrest Wilkins'
                effect="opacity"
                src={avatar}
                className={styles.avatar} />
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
            <a href='mailto:forrestwilkins@protonmail.com' target="_blank" rel="noopener noreferrer"
              className={styles.navBarLink + " " + styles.headerLink + " linkSoft " + styles.emailNavBarLink}>
              forrestwilkins@protonmail.com
            </a>
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
