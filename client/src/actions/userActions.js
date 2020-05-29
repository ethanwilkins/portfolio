import axios from 'axios';
import {
  GET_USER
} from './actionTypes';

export const getUser = userId => async (dispatch) => {
  const result = await axios.get(`/users/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data
  });
};