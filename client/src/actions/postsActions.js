import axios from 'axios';
import {
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST
} from './actionTypes';

export const getPosts = () => dispatch =>
  axios.get('/posts').then(res =>
    dispatch({
      type: GET_POSTS,
      payload: res.data
    }));

export const createPost = (title, body, image, user) => dispatch => {
  const formPayload = new FormData();
  formPayload.append('title', title);
  formPayload.append('body', body);
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


export const editPost = (id, title, body, author) => dispatch =>
  axios.patch(`/posts/${id}`, { id, title, body, author }).then(res =>
    dispatch({
      type: EDIT_POST,
      id,
      title,
      body,
      author
    }));

export const deletePost = id => dispatch =>
  axios.delete(`/posts/${id}`).then(res =>
    dispatch({
      type: DELETE_POST,
      id
    }));