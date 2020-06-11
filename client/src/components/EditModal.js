import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import EditPost from '../containers/EditPost';

class EditModal extends Component {
  state = {
    name: ''
  };

  render() {
    const {
      _id,
      isEditingComment,
      commentPostId,
      editPost,
      handleModalClose,
      modalOpen,
      title,
      body
    } = this.props;
    const { name } = this.state;

    return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        onClose={handleModalClose}
      >
        <div>
          <Typography
            variant="h6"
            id="modal-title"
          >
            {isEditingComment ? 'Edit this comment' : 'Edit this post'}
          </Typography>
          <Typography variant="h6" id="modal-description">
            <EditPost
              author={name}
              commentPostId={commentPostId}
              editPost={editPost}
              handleModalClose={handleModalClose}
              id={_id}
              isEditingComment={isEditingComment}
              title={title}
              body={body}
            />
          </Typography>
        </div>
      </Modal>
    );
  }
}

EditModal.defaultProps = {
  commentPostId: '',
  isEditingComment: false
};

EditModal.propTypes = {
  _id: PropTypes.string.isRequired,
  isEditingComment: PropTypes.bool,
  commentPostId: PropTypes.string,
  editPost: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default EditModal;
