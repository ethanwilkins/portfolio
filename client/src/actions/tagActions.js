import axios from 'axios';
import {
  GET_TAG,
  GET_TAG_BY_PRETTY_ID,
  GET_TAGS,
  CREATE_TAG,
  EDIT_TAG,
  DELETE_TAG
} from './actionTypes';

export const getTagByPrettyId = prettyId => async (dispatch) => {
  const result = await axios.get(`/tags/pretty/${prettyId}`);
  return dispatch({
    type: GET_TAG_BY_PRETTY_ID,
    payload: result.data
  });
};

export const getTag = tagId => async (dispatch) => {
  const result = await axios.get(`/tags/${categoryId}`);
  return dispatch({
    type: GET_TAG,
    payload: result.data
  });
};

export const getTags = () => dispatch =>
  axios.get('/tags').then(res =>
    dispatch({
      type: GET_TAGS,
      payload: res.data
    }));

export const createTag = (name, user) => dispatch => {

  axios.post('/tags', {
    authorId: user.userId,
    name
  })
  .then(res =>
    dispatch({
      type: CREATE_TAG,
      payload: res.data
    }));
};


export const editTag = (id, name) => dispatch =>
  axios.patch(`/tags/${id}`, { id, name }).then(res =>
    dispatch({
      type: EDIT_TAG,
      id,
      name
    }));

export const deleteTag = id => dispatch =>
  axios.delete(`/tags/${id}`).then(res =>
    dispatch({
      type: DELETE_TAG,
      id
    }));