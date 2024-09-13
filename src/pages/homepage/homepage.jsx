import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../../store/moviesActions";
import CarouselComponent from "../../components/carouselComponent";
import SliderComponent from "../../components/sliderComponent";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS

export default function HomePage() {
  const dispatch = useDispatch();
  const { movies: dataFilm, loading: isLoading, error } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isLoading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#fcfcfc">
          <Skeleton height={350} />
          <h1 className="text-white mt-3 mx-3">Now Playing</h1>
          <Skeleton height={250} count={1} />
          <h1 className="text-white mx-3">Popular</h1>
          <Skeleton height={250} count={1} />
          <h1 className="text-white mx-3">Upcoming</h1>
          <Skeleton height={250} count={1} />
        </SkeletonTheme>
      ) : (
        <>
          <CarouselComponent film={dataFilm.trending.results} />
          <h1 className="text-white mt-3 mx-3">Now Playing</h1>
          <SliderComponent film={dataFilm.nowPlaying.results} no={1} />
          <h1 className="text-white mx-3">Popular</h1>
          <SliderComponent film={dataFilm.popular.results} no={2} />
          <h1 className="text-white mx-3">Upcoming</h1>
          <SliderComponent film={dataFilm.upcoming.results} no={3} />
        </>
      )}
    </>
  );
}
