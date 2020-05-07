import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarContainer from './NavbarContainer';

import styles from '../styles/HomePage.module.css';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />
        <div className={styles.test}>Test</div>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(HomePage);
