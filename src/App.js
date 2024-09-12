import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import DetailPage from "./pages/detail/detailPage";
import { NavbarComponent } from "./components";
import SearchPage from "./pages/Searchpage/searchPage";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:title" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
