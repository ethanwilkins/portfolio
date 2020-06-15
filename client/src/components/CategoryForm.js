import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button } from '@material-ui/core';
import styles from '../styles/CategoryForm.module.scss';

export class CategoryForm extends Component {
  render() {
    const {
      name,
      handleNameChange,
      handleSubmit
    } = this.props;
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <TextField
          id="textarea"
          placeholder="Name"
          multiline
          margin="normal"
          rowsMax="5"
          onChange={handleNameChange}
          value={name}
          className={styles.textField}
        />
        <Button
          type="submit"
          name="commit"
          className={styles.button}
          variant="contained"
          size="small"
          style={{background: 'rgb(105, 220, 150)', color: 'white', marginTop: '7.5px'}}
        >
          <b>Save <i className="fa fa-pencil"></i></b>
        </Button>
      </form>
    );
  }
}

CategoryForm.propTypes = {
  name: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default CategoryForm;
