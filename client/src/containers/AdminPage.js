import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import styles from '../styles/HomePage.module.scss';

export class AdminPage extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <NavbarContainer />

        <div className={styles.headerCard}>
          <h2 className={styles.pageHeader}>
            Welcome, Admin {user.name}
          </h2>
        </div>

        <Footer />
      </div>
    );
  }
}

AdminPage.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps)(AdminPage);
