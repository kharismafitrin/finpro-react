import { useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Import Bootstrap JS
import $ from "jquery"; // Import jQuery
import { useDispatch } from "react-redux";
import {
  fetchMoviesBySearch,
  fetchMoviesByGenre,
  fetchMovies,
} from "../store/moviesActions";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [dataGenre, setDataGenre] = useState(null);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    let tamp = searchQuery.replace(/\s/g, "+");
    dispatch(fetchMoviesBySearch(searchQuery));
    navigate(`/search/${tamp}`);
    setSearchQuery(""); // Kosongkan input form setelah submit
  };

  const handleGenreClick = (id, name) => {
    dispatch(fetchMoviesByGenre(id));
    navigate(`/genre/${name}`);
  };

  const handleHomeClick = () => {
    dispatch(fetchMovies());
    navigate(`/`);
  };

  const handleInputChange = (e) => {
    let tamp = e.target.value;
    setSearchQuery(tamp);
  };

  useEffect(() => {
    fetchData();

    // Enable hover effect for the dropdown using jQuery
    $("li.nav-item.dropdown").hover(
      function () {
        $(this)
          .find(".dropdown-menu")
          .stop(true, true)
          .delay(200)
          .slideDown(200);
      },
      function () {
        $(this).find(".dropdown-menu").stop(true, true).delay(200).slideUp(200);
      }
    );
  }, []);

  const fetchData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/genre/movie/list?language=en`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      setDataGenre(resultData.genres);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10 }}
    >
      <div className="container-fluid">
        <p className="navbar-brand text-warning fw-bold my-auto">KARIS</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                onClick={handleHomeClick}
                className="text-decoration-none"
              >
                <p
                  className="nav-link my-auto text-warning active"
                  aria-current="page"
                >
                  Home
                </p>
              </Link>
            </li>
            <li className="nav-item dropdown" data-bs-theme="dark">
              <p
                className="nav-link my-auto text-warning dropdown-toggle"
                id="navbarDropdown"
                role="button"
                aria-expanded="false"
              >
                Movie
              </p>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {dataGenre?.map((el) => (
                  <li key={el.id}>
                    <p
                      className="dropdown-item"
                      onClick={() => handleGenreClick(el.id, el.name)}
                    >
                      {el.name}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="btn btn-warning" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
