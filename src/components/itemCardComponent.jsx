import React from "react";
import { Link } from "react-router-dom";
export default function ItemCard({ film }) {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <Link to={`/detail/${film.id}`}>
      <div className="card mx-2 text-warning bg-dark">
        {film.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} // Construct full poster URL
            className="card-img-top image-fluid"
            alt={film.title}
          />
        ) : (
          <img
            src={`https://placehold.co/400x600?text=Image not Available`} // Construct full poster URL
            className="card-img-top h-100 image-fluid"
            alt={film.title}
          />
        )}

        <div className="card-body card-text w-100 h-100">
          <h5 className="card-title text-truncate">{film.original_title}</h5>
          <p className="text-white">{truncateText(film.overview, 10)}</p>
          <p className="text-warning text-decoration-underline">
            click to see more
          </p>
        </div>
      </div>
    </Link>
  );
}
