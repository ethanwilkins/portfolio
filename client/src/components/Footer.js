import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/Footer.module.scss';

class Footer extends Component {
  render() {
    return (
      <div>
        <div className={styles.verticalSpacer}></div>

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
              <a href='mailto:forrestwilkins@protonmail.com' target="_blank" rel="noopener noreferrer" className={styles.menuItem + " " + styles.text}>
                forrestwilkins@protonmail.com
              </a>
              <Link to='/' className={styles.menuItem + " " + styles.text}>
                (919) 756-0830
              </Link>
              <a href='skype:live:forrest_wilkins' target="_blank" rel="noopener noreferrer" className={styles.menuItem + " " + styles.text}>
                Skype
              </a>
            </div>

            <div className={styles.menu}>
              <div className={styles.menuLabel + " linkSoft"}>
                Online
              </div>
              <a href='https://github.com/ethanwilkins' target="_blank" rel="noopener noreferrer" className={styles.menuItem + " " + styles.text}>
                GitHub
              </a>
              <a href='https://stackoverflow.com/users/2034099/ethan-wilkins' target="_blank" rel="noopener noreferrer" className={styles.menuItem + " " + styles.text}>
                Stack Overflow
              </a>
            </div>
          </div>
          <div className={styles.card} align="left">
            <div className={styles.text}>
              Copyright Forrest Wilkins 2020 © <Link to='/' className={styles.text + " linkUnderlined"}>
                More information
              </Link> — <a href='https://github.com/ethanwilkins/simplr' target="_blank" rel="noopener noreferrer" className={styles.text + " " + styles.darkLink}>
                Changelog
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
