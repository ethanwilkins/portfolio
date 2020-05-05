import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import NavbarLeftMenu from './NavbarLeftMenu';
import NavbarRightMenu from './NavbarRightMenu';

const styles = {
  flex: {
    flexGrow: 1
  },
  name: {
    textDecoration: 'none',
    color: 'black'
  },
  menuButton: {
    marginRight: -10,
    color: 'black'
  },
  root: {
    flexGrow: 1
  },
  navBar: {
    background: '#fff',
    boxShadow: 'none'
  }
};

class Navbar extends Component {
  render() {
    const { classes, logoutUser, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar elevation={0} position="static">
          <Toolbar className={classes.navBar}>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
            >
              <Link className={classes.name} to="/">
                Forrest Wilkins
              </Link>
            </Typography>

            <div>
              <NavbarLeftMenu logoutUser={logoutUser} user={user} />
            </div>

            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <NavbarRightMenu user={user} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
