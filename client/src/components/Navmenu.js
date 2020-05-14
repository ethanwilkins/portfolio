import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import xIcon from '../images/x.png';
import styles from '../styles/Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Navmenu extends Component {
  state = {
    open: false
  };

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {

    return (
      <div>
        <Link to='' onClick={this.toggleMenu} className={cx(styles.menuLinkContainer, {
          menuLinkContainerOpen: this.state.open
        })}>
          <div className={cx(styles.menuLink, {
            noSelect: true,
            menuLinkOpen: this.state.open
          })}>
            <div className={cx(styles.menuIcon, {
              barsIcon: true,
              menuLinkHidden: this.state.open
            })}>
              <div className={styles.barsIconBar}></div>
              <div className={styles.barsIconBar}></div>
              <div className={styles.barsIconBar}></div>
            </div>
            <div className={cx(styles.menuIcon, {
              menuLinkHidden: !this.state.open
            })}>
              <img src={xIcon}  alt="X-icon should go here." className={styles.xIcon} />
            </div>
          </div>
        </Link>

        <div className={cx(styles.navLinksContainer, {
          navLinksContainerOpen: this.state.open
        })}>
          <div className={styles.navLinks}>
          </div>
        </div>
      </div>
    );
  }
}

Navmenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navmenu;
