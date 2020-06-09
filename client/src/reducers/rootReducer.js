import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';

export default combineReducers({
  authReducer,
  errorReducer,
  postReducer,
  categoryReducer,
  userReducer
});
