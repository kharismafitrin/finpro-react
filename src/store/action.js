const changeMovies = (payload) => {
  return {
    type: "CHANGE_MOVIES",
    payload,
  };
};

const changeSearch = (payload) => {
  return {
    type: "CHANGE_SEARCH",
    payload,
  };
};

const allActions = {
  changeMovies,
  changeSearch,
};

export default allActions;
