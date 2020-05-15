import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../styles/Footer.module.scss';

class Footer extends Component {
  render() {
    return (
      <div>
        <div className="verticalSpacer"></div>

        <div className={styles.footer}>
          <div className={styles.card} align="left">
            <div className={styles.cardContent}>
              <div className={styles.cardName + " linkSoft"}>
                Forrest Wilkins
              </div>
              <div>
                <Link to='mailto:forrestwilkins@protonmail.com' className={styles.cardEmail + " linkActive"}>
                  forrestwilkins@protonmail.com
                </Link>
              </div>
              <div className={styles.text}>
                I'm a web developer. I can help you expand your business and bring your online presence to the next level.
              </div>
            </div>

            <div className={styles.menu}>
              <div className={styles.menuLabel + " linkSoft"}>
                Menu
              </div>
              <Link to='/' className={styles.menuItem + " " + styles.text}>
                About
              </Link>
              <Link to='/' className={styles.menuItem + " " + styles.text}>
                Blog
              </Link>
              <Link to='/' className={styles.menuItem + " " + styles.text}>
                Projects
              </Link>
            </div>

            <div className={styles.menu}>
              <div className={styles.menuLabel + " linkSoft"}>
                Contact
              </div>
              <Link to='mailto:forrestwilkins@protonmail.com' className={styles.menuItem + " " + styles.text}>
                forrestwilkins@protonmail.com
              </Link>
              <Link to='/' className={styles.menuItem + " " + styles.text}>
                (919) 756-0830
              </Link>
              <Link to='skype:live:forrest_wilkins' className={styles.menuItem + " " + styles.text}>
                Skype
              </Link>
            </div>

            <div className={styles.menu}>
              <div className={styles.menuLabel + " linkSoft"}>
                Online
              </div>
              <Link to='https://github.com/ethanwilkins' className={styles.menuItem + " " + styles.text}>
                GitHub
              </Link>
              <Link to='https://stackoverflow.com/users/2034099/ethan-wilkins' className={styles.menuItem + " " + styles.text}>
                Stack Overflow
              </Link>
            </div>
          </div>
          <div className={styles.card} align="left">
            <div className={styles.text}>
              Copyright Forrest Wilkins 2020 © <Link to='/' className={styles.text + " linkUnderlined"}>
                More information
              </Link> — <Link to='https://github.com/ethanwilkins/simplr' className={styles.text + " " + styles.darkLink}>
                Changelog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Footer;
