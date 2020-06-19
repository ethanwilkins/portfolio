import {
  GET_TAG,
  GET_TAGS,
  CREATE_TAG,
  EDIT_TAG,
  DELETE_TAG,
  GET_TAGS_BY_POST_ID
} from '../actions/actionTypes';

const initialState = {
  filteredTags: [],
  tags: [],
  tag: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TAGS_BY_POST_ID: {
      return {
        ...state,
        filteredTags: action.payload.filter(({ postId }) => postId === action.postId)
      };
    }
    case GET_TAG:
      return {
        ...state,
        tag: action.payload
      };
    case GET_TAGS:
      return {
        ...initialState,
        tags: action.payload
      };
    case CREATE_TAG: {
      return {
        ...state,
        tags: [
          ...state.tags,
          {
            _id: action.payload._id,
            name: action.payload.name,
            prettyId: action.payload.prettyId,
            timestamp: action.payload.timestamp
          }
        ]
      };
    }
    case EDIT_TAG: {
      return {
        ...state,
        tags: state.tags.map((tag) => {
          if (tag._id === action.id) {
            return {
              ...tag,
              name: action.name
            };
          }
          return tag;
        })
      };
    }
    case DELETE_TAG: {
      return {
        ...state,
        tags: state.tags.filter(({ _id }) => _id !== action.id)
      };
    }
    default:
      return state;
  }
};
