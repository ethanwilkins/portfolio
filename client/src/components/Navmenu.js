import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { logoutUser } from '../actions/authActions';

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
    const { logout } = this.props;

    return (
      <div>
        <div className={cx('pageHider', {
          hidePage: this.state.open
        })}></div>

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
            <Link to='/' className={cx(styles.navMenuLink, {
              linkActive: true,
              noSelect: true,
              aboutLink: true
            })}>
              <i className="fa fa-info"></i> About
            </Link>
            <Link to='/' className={cx(styles.navMenuLink, {
              linkActive: false,
              noSelect: true,
              aboutLink: true
            })}>
              <i className="fa fa-rss"></i> Blog
            </Link>
            <a href='skype:live:forrest_wilkins' target="_blank" rel="noopener noreferrer" className={cx(styles.navMenuLink, {
              linkActive: false,
              noSelect: true,
              aboutLink: true
            })}>
              <i className="fa fa-skype"></i> Skype
            </a>
            <a href='https://github.com/ethanwilkins/simplr' target="_blank" rel="noopener noreferrer" className={cx(styles.navMenuLink, {
              linkActive: false,
              noSelect: true,
              aboutLink: true
            })}>
              <i className="fa fa-github"></i> GitHub
            </a>
            <a href='https://stackoverflow.com/users/2034099/ethan-wilkins' target="_blank" rel="noopener noreferrer" className={cx(styles.navMenuLink, {
              linkActive: false,
              noSelect: true,
              aboutLink: true
            })}>
              <i className="fa fa-stack-overflow"></i> Stack Overflow
            </a>
            <div>
              {localStorage.jwtToken &&
                <div>
                  <Link to='/' className={cx(styles.navMenuLink, {
                    linkActive: false,
                    noSelect: true,
                    adminLink: true
                  })}>
                    <i className="fa fa-cog"></i> Admin
                  </Link>

                  <Link to='/' onClick={logout} className={styles.navMenuLink + " noSelect"}>
                    <i className="fa fa-sign-out"></i> Log out
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Navmenu.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  )
)(Navmenu);
