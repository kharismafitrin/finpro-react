import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
  search: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MOVIES":
      return { ...state, movies: action.payload };
    case "CHANGE_SEARCH":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
