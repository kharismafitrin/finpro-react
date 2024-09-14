import React from "react";
import CardDetail from "../../components/cardDetailComponent";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import ModalComponent from "../../components/modalComponent";
import ModalContent from "../../components/modalContent";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DetailPage() {
  const { id } = useParams(); // Ambil id dari URL

  const [detailFilm, setDetailFilm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail(id);
  }, [id]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const fetchDetail = async (id) => {
    try {
      const urlAll = [
        {
          name: "detail",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}`,
        },
        {
          name: "credit",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/credits`,
        },
        {
          name: "images",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/images`,
        },
        {
          name: "keywords",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/keywords`,
        },
        {
          name: "rec",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/recommendations`,
        },
        {
          name: "review",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/reviews`,
        },
        {
          name: "similar",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/similar`,
        },
        {
          name: "videos",
          url: `${process.env.REACT_APP_API_URL}/movie/${id}/videos`,
        },
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
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
      // console.log(combinedData);
      setDetailFilm(combinedData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#fcfcfc">
          <div className="row p-3">
            <div className="col-md-8">
              <Skeleton height={400} />
              <Skeleton height={200} count={6} className="my-4" />
              <Skeleton height={200} count={6} />
            </div>
            <div className="col-md-4">
              <Skeleton height={75} count={5} />
              <Skeleton height={75} count={5} />
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        detailFilm.detail && (
          <>
            <h1 className="hidden">INI DETAIL PAGE</h1>
            <div className="row p-3">
              <div className="col-md-8">
                <div className="my-4 card bg-dark text-white">
                  <div className="card-body row">
                    <div className="col-md-4">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${detailFilm.detail.poster_path}`}
                        className="w-100"
                        alt={detailFilm.detail.title}
                      />
                      <div class="d-grid gap-2 mt-4">
                        <ModalComponent buttonTitle={"WATCH TRAILER"}>
                          <ModalContent
                            modalTitle="Watch Videos"
                            videos={detailFilm.videos}
                          />
                        </ModalComponent>
                        {/* <button className="btn btn-warning" type="button">
                        WATCH TRAILER
                      </button> */}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h3 className="card-title col-12">
                        {detailFilm.detail.title}
                      </h3>
                      <div className="d-flex my-3 flex-row gap-2">
                        <p className="bg-warning rounded py-2 text-center px-3 fw-bold my-auto">
                          {detailFilm.detail.vote_average.toFixed(2)}
                        </p>
                        <div
                          className="my-auto fw-light"
                          style={{ fontSize: "12px" }}
                        >
                          <p className="mb-0">
                            Ratings: {detailFilm.detail.vote_average.toFixed(2)}
                            /10
                          </p>
                          <p className="mb-0">
                            from {detailFilm.detail.vote_count} users
                          </p>
                        </div>
                      </div>
                      <div className="text-justify">
                        <p>{detailFilm.detail.overview}</p>
                        <div>
                          <p className="mb-0">
                            <strong>Original Title: </strong>
                            {detailFilm.detail.original_title}
                          </p>
                          <p className="mb-0">
                            <strong>genres: </strong>

                            {detailFilm.detail.genres.map((el) => (
                              <span>{el.name}, </span>
                            ))}
                          </p>
                          <p className="mb-0">
                            <strong>keywords: </strong>

                            {detailFilm.keywords.keywords.map((el) => (
                              <span>{el.name}, </span>
                            ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card with text content */}
                <CardDetail title="CASTS & CREDITS">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {detailFilm.credit.cast.slice(0, 6).map((el) => (
                      <div className="col">
                        <div className="row my-2">
                          <img
                            src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                            className="rounded-4 col-6"
                            alt={el.name}
                          />
                          <div className="col-6">
                            <p className="mb-0 fs-6 text-warning">{el.name}</p>
                            <p className="mb-0" style={{ fontSize: "12px" }}>
                              {el.character}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardDetail>

                {/* Card with image content */}
                <CardDetail title="PHOTOS">
                  <div className="row row-cols-3 row-cols-lg-6">
                    {detailFilm.images.backdrops.slice(6, 12).map((el) => (
                      <div className="col my-1">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${el.file_path}`}
                          className="w-100"
                          alt="gambar"
                          style={{
                            width: "100%" /* Lebar mengikuti container */,
                            height:
                              "auto" /* Tinggi otomatis untuk menjaga proporsi awal */,
                            aspectRatio:
                              "1/1" /* Membuat gambar jadi persegi */,
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardDetail>

                {/* Card with reviews content */}
                <CardDetail title="REVIEWS">
                  {detailFilm.review.results.slice(0, 5).map((review) => (
                    <div className="card bg-dark text-white mb-4">
                      <div className="card-header d-flex align-items-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                          alt={`${review.author}`}
                          className="rounded-circle me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h5 className="mb-0">
                            {review.author_details.name || review.author}
                          </h5>
                          <small className="">
                            {moment(review.created_at).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </div>
                        <div className="ms-auto">
                          <span className="badge bg-warning text-dark">
                            {review.author_details.rating
                              ? `${review.author_details.rating}/10`
                              : "No Rating"}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p>{truncateText(review.content, 50)}</p>
                      </div>
                      <div className="card-footer">
                        <a
                          href={review.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Read Full Review
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* <p className="card-text">"Great drama!" - User A</p> */}
                </CardDetail>
              </div>

              <div className="col-md-4">
                <CardDetail title="RECOMMENDATIONS">
                  <ul className="list-group list-group-flush">
                    {detailFilm.rec.results.slice(0, 5).map((film) => (
                      <li
                        key={film.id}
                        className="list-group-item text-white bg-dark"
                      >
                        <Link
                          to={`/detail/${film.id}`}
                          className="text-decoration-none"
                        >
                          <div className="row text-white">
                            <div className="col-2">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                                alt={film.title}
                                className="img-fluid"
                                // style={{ maxWidth: "100px", maxHeight: "150px" }}
                              />
                            </div>
                            <div className="col-10">
                              <h5 className="mb-1 text-warning text-break">
                                <strong>{film.title}</strong>
                                {moment(film.release_date).format("(YYYY)")}
                              </h5>
                              <p className="mb-0 text-white">
                                {film.vote_average}/10
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardDetail>

                {/* Similar content */}
                <CardDetail title="SIMILAR">
                  <ul className="list-group list-group-flush">
                    {detailFilm.similar.results.slice(0, 5).map((film) => (
                      <li
                        key={film.id}
                        className="list-group-item text-white bg-dark"
                      >
                        <Link
                          to={`/detail/${film.id}`}
                          className="text-decoration-none"
                        >
                          <div className="row text-white">
                            <div className="col-2">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                                alt={film.title}
                                className="img-fluid"
                                // style={{ maxWidth: "100px", maxHeight: "150px" }}
                              />
                            </div>
                            <div className="col-10">
                              <h5 className="mb-1 text-warning text-break">
                                <strong>{film.title}</strong>
                                {moment(film.release_date).format("(YYYY)")}
                              </h5>
                              <p className="mb-0 text-white">
                                {film.vote_average}/10
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardDetail>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}
