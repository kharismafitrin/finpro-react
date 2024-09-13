import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../../store/moviesActions";
import CarouselComponent from "../../components/carouselComponent";
import SliderComponent from "../../components/sliderComponent";
export default function HomePage() {
  const dispatch = useDispatch();
  const { movies: dataFilm, loading: isLoading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* {console.log(dataFilm, "INI YG DI HOMEPAGE")} */}
      <CarouselComponent film={dataFilm.trending} />
      <h1 className="text-white mt-3 mx-3">Now Playing</h1>
      <SliderComponent film={dataFilm.nowPlaying} no={1} />
      <h1 className="text-white mx-3">Popular</h1>
      <SliderComponent film={dataFilm.popular} no={2} />
      <h1 className="text-white mx-3">Upcoming</h1>
      <SliderComponent film={dataFilm.upcoming} no={3} />
      {/* <CardComponent film={dataFilm} /> */}
    </>
  );
}
