import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default class cardComponentTemp extends React.Component {
  render() {
    return (
      <>
        <div className="row row-cols-5 m-4">
          {console.log(this.props.film, "ini PROPPSSS")}

          {this.props.film.map((el) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={el.id}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} // Construct full poster URL
                  className="card-img-top image-fluid"
                  alt={el.title}
                  //   style={{ height: "300px", width: "100%", objectFit: "cover" }} // Adjust image size
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">
                    {el.original_title}
                  </h5>
                  <Link to={`/home/${el.id}`} className="btn m-2 btn-success">
                    GO TO DETAIL
                  </Link>
                  <Link to={`/show/${el.id}`} className="btn m-2 btn-success">
                    SHOW
                  </Link>
                  {/* <Outlet /> */}
                  {/* <button
                    type="button"
                    onClick={() => getDetail(el.id)}
                    className="btn m-2 btn-success"
                  >
                    Success
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
