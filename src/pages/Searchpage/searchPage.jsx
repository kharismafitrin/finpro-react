import CardComponent from "../../components/cardComponent";
import { useSelector } from "react-redux";

export default function SearchPage() {
  const { movies: dataFilm, loading: isLoading, error } = useSelector(
    (state) => state.movies
  );

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
      <div className="p-4">
        <h5 className="text-white pt-5 px-3">Search Result:</h5>
        <CardComponent film={dataFilm} />
      </div>
    </>
  );
}
