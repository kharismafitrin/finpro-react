// import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import DetailPage from "./pages/detail/detailPage";
import { NavbarComponent } from "./components";
import SearchPage from "./pages/Searchpage/searchPage";
import ByGenrePage from "./pages/byGenrePage/byGenrePage";
function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:title" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/genre/:name" element={<ByGenrePage />} />
      </Routes>
    </div>
  );
}

export default App;
