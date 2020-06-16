import axios from 'axios';
import {
  GET_POST,
  GET_POST_BY_PRETTY_ID,
  GET_POSTS_BY_CATEGORY_ID,
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from './actionTypes';

export const getPostByPrettyId = prettyId => async (dispatch) => {
  const result = await axios.get(`/posts/pretty/${prettyId}`);
  return dispatch({
    type: GET_POST_BY_PRETTY_ID,
    payload: result.data
  });
};

export const getPostsByCategoryId = categoryId => dispatch =>
  axios.get('/posts').then(res =>
    dispatch({
      type: GET_POSTS_BY_CATEGORY_ID,
      payload: res.data, categoryId
    }));

export const getPost = postId => async (dispatch) => {
  const result = await axios.get(`/posts/${postId}`);
  return dispatch({
    type: GET_POST,
    payload: result.data
  });
};

export const getPosts = () => dispatch =>
  axios.get('/posts').then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }));

export const createPost = (title, body, previewText, categoryId, image, user) => dispatch => {
  const formPayload = new FormData();
  formPayload.append('title', title);
  formPayload.append('body', body);
  formPayload.append('previewText', previewText);
  formPayload.append('categoryId', categoryId);
  formPayload.append('imageName', "multer-image-" + Date.now());
  formPayload.append('imageData', image);
  formPayload.append('author', user.name);
  formPayload.append('authorId', user.userId);

  axios.post('/posts', formPayload)
  .then(res =>
    dispatch({
      type: CREATE_POST,
      payload: res.data
    }));
};

export const editPost = (id, title, body, previewText, image) =>  dispatch => {
  const formPayload = new FormData();
  formPayload.append('title', title);
  formPayload.append('body', body);
  formPayload.append('previewText', previewText);
  formPayload.append('imageName', "multer-image-" + Date.now());
  formPayload.append('imageData', image);

  axios.patch(`/posts/${id}`, formPayload)
  .then(res =>
    dispatch({
      type: EDIT_POST,
      payload: res.data
    }));
  // redirect back to blog
  window.location.href = '/blog';
};

export const deletePost = id => dispatch =>
  axios.delete(`/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      id
    }));