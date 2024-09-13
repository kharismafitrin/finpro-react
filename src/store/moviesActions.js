export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";

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
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const urlAll = [
        {
          name: "popular",
          url: "https://api.themoviedb.org/3/movie/popular",
        },
        {
          name: "nowPlaying",
          url: "https://api.themoviedb.org/3/movie/now_playing",
        },
        {
          name: "trending",
          url: "https://api.themoviedb.org/3/movie/top_rated",
        },
        {
          name: "upcoming",
          url: "https://api.themoviedb.org/3/movie/upcoming",
        },
      ];
      // const urlPopular = "https://api.themoviedb.org/3/movie/popular";
      // const urlNowPlaying = "https://api.themoviedb.org/3/movie/now_playing";
      // const urlTrending = "https://api.themoviedb.org/3/movie/top_rated";
      // const urlupcoming = "https://api.themoviedb.org/3/movie/upcoming";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZiNjJjZmQ0MTUxNWRiYjEzMzhhMzNiMDZhZjJjMSIsIm5iZiI6MTcyNTk3MTM5NS4yNTAyNjYsInN1YiI6IjY2ZTAzYTdkNjAwNjA4NmYyMDZjY2FlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T92oZSZ8slGLO-uxrNwvVqhQG7V204K3E4WC5mqSPp0",
        },
      };

      // urlAll.map((el) => {});
      // const response = await fetch(urlPopular, options);
      // const resultData = await response.json();
      // const moviesWithImages = await Promise.all(
      //   resultData.results.map(async (movie) => {
      //     const imagesResponse = await fetch(
      //       `https://api.themoviedb.org/3/movie/${movie.id}/images`,
      //       options
      //     );
      //     const imagesData = await imagesResponse.json();
      //     return {
      //       ...movie,
      //       images: imagesData.backdrops,
      //     };
      //   })
      // );
      // dispatch(fetchMoviesSuccess(moviesWithImages));

      const movieData = await Promise.all(
        urlAll.map(async (el) => {
          const response = await fetch(el.url, options);
          const resultData = await response.json();

          // Fetch movie images for each movie
          const moviesWithImages = await Promise.all(
            resultData.results.map(async (movie) => {
              const imagesResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/images`,
                options
              );
              const imagesData = await imagesResponse.json();
              return {
                ...movie,
                images: imagesData.backdrops || [],
              };
            })
          );

          // Return an object with the name as the key and the movies as the value
          return {
            [el.name]: moviesWithImages,
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
      const url = `https://api.themoviedb.org/3/search/movie?&query=${search}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZiNjJjZmQ0MTUxNWRiYjEzMzhhMzNiMDZhZjJjMSIsIm5iZiI6MTcyNTk3MTM5NS4yNTAyNjYsInN1YiI6IjY2ZTAzYTdkNjAwNjA4NmYyMDZjY2FlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T92oZSZ8slGLO-uxrNwvVqhQG7V204K3E4WC5mqSPp0",
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      const moviesWithImages = await Promise.all(
        resultData.results.map(async (movie) => {
          const imagesResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images`,
            options
          );
          const imagesData = await imagesResponse.json();
          return {
            ...movie,
            images: imagesData.backdrops,
          };
        })
      );
      dispatch(fetchMoviesSuccess(moviesWithImages));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

export const fetchMoviesByGenre = (genre) => {
  return async (dispatch) => {
    dispatch(fetchMoviesGenre());
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZiNjJjZmQ0MTUxNWRiYjEzMzhhMzNiMDZhZjJjMSIsIm5iZiI6MTcyNTk3MTM5NS4yNTAyNjYsInN1YiI6IjY2ZTAzYTdkNjAwNjA4NmYyMDZjY2FlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T92oZSZ8slGLO-uxrNwvVqhQG7V204K3E4WC5mqSPp0",
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      const moviesWithImages = await Promise.all(
        resultData.results.map(async (movie) => {
          const imagesResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images`,
            options
          );
          const imagesData = await imagesResponse.json();
          return {
            ...movie,
            images: imagesData.backdrops,
          };
        })
      );
      dispatch(fetchMoviesSuccess(moviesWithImages));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};
