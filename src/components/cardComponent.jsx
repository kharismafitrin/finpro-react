import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ItemCard from "./itemCardComponent";

export default class cardComponent extends React.Component {
  render() {
    return (
      <>
        <div className="row px-2 py-3">
          {this.props.film.map((el) => (
            <div className="col-6 col-sm-4 col-md-3 mx-auto mb-3" key={el.id}>
              <ItemCard film={el} />
            </div>
          ))}
        </div>
      </>
    );
  }
}
