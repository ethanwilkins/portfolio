import axios from 'axios';
import {
  GET_CATEGORY,
  GET_CATEGORY_BY_PRETTY_ID,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from './actionTypes';

export const getCategoryByPrettyId = prettyId => async (dispatch) => {
  const result = await axios.get(`/categories/pretty/${prettyId}`);
  return dispatch({
    type: GET_CATEGORY_BY_PRETTY_ID,
    payload: result.data
  });
};

export const getCategory = categoryId => async (dispatch) => {
  const result = await axios.get(`/categories/${categoryId}`);
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

export const createCategory = (name, user) => dispatch => {

  axios.post('/categories', {
    authorId: user.userId,
    name
  })
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