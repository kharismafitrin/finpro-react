export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API_URL;

const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});

const fetchMoviesSearch = () => ({
  type: FETCH_MOVIES_REQUEST,
});

const fetchMoviesGenre = () => ({
  type: FETCH_MOVIES_REQUEST,
});

const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchMovies = () => {
  console.log(apiUrl);
  console.log(apiKey);
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const urlAll = [
        {
          name: "popular",
          url: `${apiUrl}/movie/popular`,
        },
        {
          name: "nowPlaying",
          url: `${apiUrl}/movie/now_playing`,
        },
        {
          name: "trending",
          url: `${apiUrl}/movie/top_rated`,
        },
        {
          name: "upcoming",
          url: `${apiUrl}/movie/upcoming`,
        },
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };
      const movieData = await Promise.all(
        urlAll.map(async (el) => {
          const response = await fetch(el.url, options);
          const resultData = await response.json();

          return {
            [el.name]: resultData,
          };
        })
      );

      // Combine the array of objects into a single object
      const combinedData = Object.assign({}, ...movieData);
      dispatch(fetchMoviesSuccess(combinedData));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const fetchMoviesBySearch = (search) => {
  return async (dispatch) => {
    dispatch(fetchMoviesSearch());
    try {
      const url = `${apiUrl}/search/movie?&query=${search}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      dispatch(fetchMoviesSuccess(resultData));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const fetchMoviesByGenre = (genre) => {
  return async (dispatch) => {
    dispatch(fetchMoviesGenre());
    try {
      const url = `${apiUrl}/discover/movie?with_genres=${genre}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: apiKey,
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      dispatch(fetchMoviesSuccess(resultData));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};
