import {
  GET_POST,
  GET_POSTS,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_POSTS_BY_CATEGORY_ID,
  GET_POSTS_BY_TAG_ID
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY_ID: {
      return {
        ...state,
        posts: action.payload.filter(({ categoryId }) => categoryId === action.categoryId)
      };
    }
    case GET_POSTS_BY_TAG_ID: {
      return {
        ...state,
        posts: action.payload.filter(({ tags }) => tags.includes(action.tagId))
      };
    }
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case GET_POSTS:
      return {
        ...initialState,
        posts: action.payload
      };
    case CREATE_POST: {
      return {
        ...state,
        posts: [
          {
            _id: action.payload._id,
            author: action.payload.author,
            authorId: action.payload.authorId,
            prettyId: action.payload.prettyId,
            categoryId: action.payload.categoryId,
            tags: action.payload.tags,
            title: action.payload.title,
            body: action.payload.body,
            previewText: action.payload.previewText,
            imageData: action.payload.imageData,
            timestamp: action.payload.timestamp
          },
          ...state.posts
        ]
      };
    }
    case EDIT_POST: {
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.id) {
            return {
              ...post,
              title: action.payload.title,
              body: action.payload.body,
              previewText: action.payload.previewText,
              imageData: action.payload.imageData
            };
          }
          return post;
        })
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(({ _id }) => _id !== action.id)
      };
    }
    default:
      return state;
  }
};
