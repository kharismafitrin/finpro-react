import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Tambahkan logger di sini
);

export default store;
