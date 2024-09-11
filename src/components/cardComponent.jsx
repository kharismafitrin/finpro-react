import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default class cardComponent extends React.Component {
  render() {
    return (
      <>
        <div className="row row-cols-5 m-4">
          {console.log(this.props.film, "ini PROPPSSS")}

          {this.props.film.map((el) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={el.id}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} // Construct full poster URL
                  className="card-img-top image-fluid"
                  alt={el.title}
                />
                <h5 className="card-body card-title text-truncate">
                  {el.original_title}
                </h5>
                <div className="card-body card-text">
                  <h5 className="card-title text-truncate text-white">
                    {el.original_title}
                  </h5>
                  <p className="text-white">{el.overview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
