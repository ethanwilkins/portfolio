import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        Welcome, Admin {user.name}!
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
