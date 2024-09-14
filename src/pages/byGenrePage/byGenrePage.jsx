import { useParams } from "react-router-dom";
import CardComponent from "../../components/cardComponent";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS untuk styling skeleton

export default function ByGenrePage() {
  const { name } = useParams();
  // console.log(name);

  const {
    movies: dataFilm,
    loading: isLoading,
    search: id,
    error,
  } = useSelector((state) => state.movies);

  // console.log(id);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="text-dark fw-bold h5 text-center pt-5 px-3">
          <div className="alert bg-warning" role="alert">
            {name}
          </div>
        </div>
        <SkeletonTheme baseColor="#202020" highlightColor="#fcfcfc">
          <Skeleton count={5} height={300} />
        </SkeletonTheme>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <div className="text-dark fw-bold h5 text-center pt-5 px-3">
          <div className="alert bg-warning" role="alert">
            {name}
          </div>
        </div>
        <CardComponent film={dataFilm.results} />
      </div>
    </>
  );
}
