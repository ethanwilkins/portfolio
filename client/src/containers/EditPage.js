import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPostByPrettyId, editPost } from '../actions/postActions';

import Loading from '../components/Loading';
import PostForm from '../components/PostForm';
import NavbarContainer from './NavbarContainer';
import Footer from '../components/Footer';

import styles from '../styles/EditPage.module.scss';

class EditPage extends Component {
  state = {
    loading: true,
    _id: '',
    author: '',
    authorId: '',
    prettyId: '',
    title: '',
    body: '',
    previewText: '',
    image: '',
    timestamp: 0
  };

  componentDidMount = () => {
    const {
      getPostByPrettyId,
      match
    } = this.props;
    const prettyId = match.params.prettyId;
    getPostByPrettyId(prettyId).then((res) => {
      this.setState({
        loading: false,
        id: res.payload.post._id,
        prettyId: res.payload.post.prettyId,
        title: res.payload.post.title,
        body: res.payload.post.body,
        previewText: res.payload.post.previewText,
        timestamp: res.payload.post.timestamp
      });
    });
  };

  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  handleImageChange = (e) => {
    let image = e.target.files[0];
    this.setState(() => ({ image }));
  };

  handleBodyChange = (body) => {
    this.setState(() => ({ body }));
  };

  handlePreviewTextChange = (e) => {
    const previewText = e.target.value;
    this.setState(() => ({ previewText }));
  };

  handleSubmit = (e) => {
    const { editPost } = this.props;
    e.preventDefault();
    const { id, title, body, image, previewText } = this.state;
    if (!title.trim()) return;
    editPost(id, title, body, previewText, image).then(() => {
      console.log("Success.");
    });
  };

  render() {
    const {
      loading,
      title,
      body,
      previewText
    } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <div>
        <NavbarContainer />
        <div className={styles.container}>
          <PostForm
            title={title}
            body={body}
            previewText={previewText}
            handleTitleChange={this.handleTitleChange}
            handleBodyChange={this.handleBodyChange}
            handleImageChange={this.handleImageChange}
            handlePreviewTextChange={this.handlePreviewTextChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

EditPage.propTypes = {
  getPostByPrettyId: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getPostByPrettyId: prettyId => dispatch(getPostByPrettyId(prettyId)),
  editPost: (id, title, body, previewText, image) => dispatch(editPost(id, title, body, previewText, image))
});

export default connect(
  null,
  mapDispatchToProps
)(EditPage);






// import { connect } from 'react-redux';
// import EditPost from '../components/EditPost';
// import { editPost } from '../actions/postActions';

// const mapDispatchToProps = dispatch => ({
//   editPost: (id, title, body, previewText, image) => dispatch(editPost(id, title, body, previewText, image))
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(EditPost);
