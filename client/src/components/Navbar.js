import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Navbar.module.scss';
import avatar from '../images/me.jpg';
import xIcon from '../images/x.png';

import { Link } from 'react-router-dom';

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

        <Link to='' className={styles.menuLinkContainer}>
          <div className={styles.menuLink + " noSelect"}>
            <div className={styles.menuIcon + " " + styles.barsIcon}>
              <div className={styles.barsIconBar}></div>
              <div className={styles.barsIconBar}></div>
              <div className={styles.barsIconBar}></div>
            </div>
            <div className={styles.menuIcon + " " + styles.menuLinkHidden}>
              <img src={xIcon}  alt="X-icon should go here." className={styles.xIcon} />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
