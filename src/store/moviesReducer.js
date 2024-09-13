import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_GENRE_REQUEST,
  FETCH_MOVIES_SEARCH_REQUEST,
} from "./moviesActions";

const initialState = {
  loading: true,
  movies: [],
  search: "",
  error: "",
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
    case FETCH_MOVIES_SEARCH_REQUEST:
    case FETCH_MOVIES_GENRE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
        error: "",
      };
    case FETCH_MOVIES_FAILURE:
      return {
        loading: false,
        movies: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;
