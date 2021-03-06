import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button } from '@material-ui/core';
import styles from '../styles/CategoryForm.module.scss';

export class CategoryForm extends Component {

  handleTextFieldKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.form.dispatchEvent(new Event('submit'));
    }
  };

  render() {
    const {
      name,
      handleNameChange,
      handleSubmit,
      createTag
    } = this.props;
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form + ' ' + (createTag ? styles.categoryForm : null)}
        ref={(ref) => { this.form = ref; }}
      >
        <TextField
          id="textarea"
          placeholder={"Add a " + (createTag ? 'tag' : 'category')}
          multiline
          margin="normal"
          rowsMax="1"
          onChange={handleNameChange}
          onKeyPress={this.handleTextFieldKeyPress}
          value={name}
        />
        <Button
          type="submit"
          name="commit"
          variant="contained"
          size="small"
          style={{
            background: 'rgb(105, 220, 150)',
            color: 'white',
            marginLeft: '5px',
            marginTop: '18px'
          }}
        >
          <b>add <i className="fa fa-plus"></i></b>
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
