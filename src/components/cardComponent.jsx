import React from "react";
import ItemCard from "./itemCardComponent";

export default function cardComponent({ film }) {
  return (
    <>
      <div className="row align-items-start px-2 py-3">
        {/* {console.log(film, "--------- texxtttttt")} */}
        {film.map((el) => (
          <div className="col-6 col-sm-4 col-md-3 mx-auto mb-3" key={el.id}>
            <ItemCard film={el} />
          </div>
        ))}
      </div>
    </>
  );
}
