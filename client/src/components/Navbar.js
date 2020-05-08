import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles/Navbar.module.scss';

import NavbarLeftMenu from './NavbarLeftMenu';
import NavbarRightMenu from './NavbarRightMenu';

import Avatar from '@material-ui/core/Avatar';
import avatarImg from "../images/me.jpg";

class Navbar extends Component {
  render() {
    const { logoutUser, user } = this.props;

    return (
      <div className={styles.root}>
        <AppBar elevation={0} position="static">
          <Toolbar className={styles.navBar}>
            <Avatar alt="Forrest Wilkins" src={avatarImg} className={styles.avatar}/>
            <Typography
              className={styles.flex}
              variant="title"
              color="inherit"
            >
              <Link className={styles.name} to="/">
                Forrest Wilkins
              </Link>
            </Typography>

            <div>
              <NavbarLeftMenu logoutUser={logoutUser} user={user} />
            </div>

            <IconButton aria-label="Menu">
              <NavbarRightMenu user={user} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
