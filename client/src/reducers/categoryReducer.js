import {
  GET_CATEGORY,
  GET_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  category: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...initialState,
        categories: action.payload
      };
    case CREATE_CATEGORY: {
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            _id: action.payload._id,
            name: action.payload.name,
            prettyId: action.payload.prettyId,
            timestamp: action.payload.timestamp
          }
        ]
      };
    }
    case EDIT_CATEGORY: {
      return {
        ...state,
        categories: state.categories.map((category) => {
          if (category._id === action.id) {
            return {
              ...category,
              name: action.name
            };
          }
          return category;
        })
      };
    }
    case DELETE_CATEGORY: {
      return {
        ...state,
        categories: state.categories.filter(({ _id }) => _id !== action.id)
      };
    }
    default:
      return state;
  }
};
