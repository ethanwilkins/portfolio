import axios from 'axios';
import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from './actionTypes';

export const getPost = postId => async (dispatch) => {
  const result = await axios.get(`/categories/${postId}`);
  return dispatch({
    type: GET_CATEGORY,
    payload: result.data
  });
};

export const getCategories = () => dispatch =>
  axios.get('/categories').then(res =>
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    }));

export const createCategory = (name) => dispatch => {

  axios.post('/categories', name)
  .then(res =>
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data
    }));
};


export const editPost = (id, name) => dispatch =>
  axios.patch(`/categories/${id}`, { id, name }).then(res =>
    dispatch({
      type: EDIT_CATEGORY,
      id,
      name
    }));

export const deleteCategory = id => dispatch =>
  axios.delete(`/categories/${id}`).then(res =>
    dispatch({
      type: DELETE_CATEGORY,
      id
    }));