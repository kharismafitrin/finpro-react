import React from "react";

export default class CarouselComponent extends React.Component {
  render() {
    return (
      <>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {this.props.film.map((el, index) => (
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
            {this.props.film.map((el, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${el.images[3].file_path}`}
                  className="w-100"
                  alt={el.title}
                  style={{
                    height: "auto", // Auto height for responsive behavior
                    maxHeight: "70vh", // Prevent the image from becoming too tall
                    objectFit: "cover", // Ensure image covers the container without distortion
                  }}
                />
                <div
                  className="carousel-caption d-none d-md-block position-absolute h-50 w-100 p-4"
                  style={{
                    // backgroundColor: "rgba(0, 0, 0, 0.5)",
                    background: "rgb(0,0,0)",
                    background:
                      "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.01) 100%)",
                    left: 0, // Align to the left edge
                    bottom: 0, // Position it at the bottom of the image
                  }}
                >
                  <div className="row m-4">
                    <h2 className="col-4">{el.title}</h2>
                    <p className="col-7 pe-4">{el.overview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="z-1">
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
        </div>
      </>
    );
  }
}
