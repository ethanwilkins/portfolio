import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import CategoryForm from '../components/CategoryForm';

import { createCategory } from '../actions/categoryActions';

export class CreateCategory extends Component {
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
    dispatch(createCategory(name, user));
    this.setState({
      name: ''
    });
  };

  render() {
    const { name } = this.state;

    return (
      <CategoryForm
        name={name}
        handleNameChange={this.handleNameChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

CreateCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default compose(
  connect(mapStateToProps)
)(CreateCategory);