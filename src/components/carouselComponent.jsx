import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

export default class CarouselComponent extends React.Component {
  truncateText(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  render() {
    const { film, isLoading } = this.props;

    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {!isLoading &&
            film?.map((el, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
        </div>

        <div className="carousel-inner">
          {isLoading ? (
            <div className="carousel-item active">
              <Skeleton
                height="400px"
                width="100%"
                style={{ marginBottom: "10px" }}
              />
              <div className="carousel-caption d-flex h-100 justify-content-center align-items-center px-5">
                <Skeleton count={3} width="60%" />
              </div>
            </div>
          ) : (
            film?.map((el, index) => (
              <Link to={`/detail/${el.id}`} key={index}>
                <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${el.backdrop_path}`}
                    className="img-fluid w-100"
                    style={{
                      height: "auto",
                      maxHeight: "70vh",
                      right: 0,
                    }}
                    alt={el.title}
                  />
                  <div
                    className="carousel-caption d-flex h-100 justify-content-center align-items-center px-5 d-none d-md-flex"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      background:
                        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
                      maxWidth: "60%",
                      textAlign: "left",
                    }}
                  >
                    <div className="me-4">
                      <h2>
                        <span className="badge text-bg-warning me-1">
                          #{index + 1}
                        </span>
                      </h2>
                      <h2 className="fw-bold mb-3 text-warning">{el.title}</h2>
                      <div className="d-flex justify-content-start mb-2">
                        <span className="me-3">{el.release_date}</span>
                        <span className="badge bg-success p-2 me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            className="bi bi-star-fill"
                            viewBox="0 0 18 18"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                          {el.vote_average.toFixed(2)}
                        </span>
                      </div>
                      <p className="lead mb-3 me-4 pe-4 ">
                        {this.truncateText(el.overview, 15)}
                      </p>
                      <button className="btn btn-outline-warning">
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}
