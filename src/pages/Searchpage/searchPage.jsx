import CardComponent from "../../components/cardComponent";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchPage() {
  const { movies: dataFilm, loading: isLoading, error } = useSelector(
    (state) => state.movies
  );

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#fcfcfc">
        <Skeleton count={5} height={300} />
      </SkeletonTheme>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="p-4">
        <h5 className="text-white pt-5 px-3">Search Result:</h5>
        <CardComponent film={dataFilm.results} />
      </div>
    </>
  );
}
