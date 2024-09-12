// components/Card.js
import React from "react";

export default function CardDetail({ title, children }) {
  return (
    <div className="my-4 card bg-dark text-white">
      <div className="card-header bg-warning text-dark fw-bold h5">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
