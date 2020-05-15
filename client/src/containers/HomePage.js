import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarContainer from './NavbarContainer';

import mainImg from '../images/html.jpg';
import styles from '../styles/HomePage.module.scss';

export class HomePage extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />

        <div className={styles.headerCard}>
          <h2 className={styles.pageHeader}>
            Freelance Web Designer & Developer from Smithfield, NC.
          </h2>
        </div>

        <div className={styles.mainImgContainer}>
          <img src={mainImg} alt='HTML code should show here.' className={styles.mainImg} />
        </div>
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
