import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import CategoryForm from '../components/CategoryForm';

import { createTag } from '../actions/tagActions';

export class CreateTag extends Component {
  state = {
    name: ''
  };

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { dispatch, user } = this.props;
    if (!name.trim()) return;
    dispatch(createTag(name, user));
    this.setState({
      name: ''
    });
  };

  render() {
    const { name } = this.state;

    return localStorage.jwtToken ? (
      <CategoryForm
        createTag={true}
        name={name}
        handleNameChange={this.handleNameChange}
        handleSubmit={this.handleSubmit}
      />
    ) : null;
  }
}

CreateTag.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default compose(
  connect(mapStateToProps)
)(CreateTag);