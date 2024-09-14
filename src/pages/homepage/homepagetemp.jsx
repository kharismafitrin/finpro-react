import CardComponentTemp from "../../components/cardComponenttemp";
import CarouselComponent from "../../components/carouselComponent";
// import { useSelector, useDispatch } from "react-redux";
// import { CardComponent } from "../../components";
// import { lazy } from "react";
import { useState, useEffect } from "react";

export default function HomePageTemp() {
  // const username = useSelector((state) => state.username);

  // console.log(username, "-----------USERNAME INIIIIIIIIIII");

  const [dataFilm, setDataFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url =
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZiNjJjZmQ0MTUxNWRiYjEzMzhhMzNiMDZhZjJjMSIsIm5iZiI6MTcyNTk3MTM5NS4yNTAyNjYsInN1YiI6IjY2ZTAzYTdkNjAwNjA4NmYyMDZjY2FlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T92oZSZ8slGLO-uxrNwvVqhQG7V204K3E4WC5mqSPp0",
        },
      };
      const response = await fetch(url, options);
      const resultData = await response.json();
      const moviesWithImages = await Promise.all(
        resultData.results.map(async (movie) => {
          // Fetch movie images for each movie using its movie ID
          const imagesResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/images`,
            options
          );
          const imagesData = await imagesResponse.json();

          // Combine the movie data with its images
          return {
            ...movie,
            images: imagesData.backdrops, // You can access 'backdrops' or 'posters'
          };
        })
      );

      // Set the final data including images to the state
      setDataFilm(moviesWithImages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <>
          <CarouselComponent film={dataFilm} />
          {/* <CardComponent /> */}
          <CardComponentTemp film={dataFilm} />
        </>
      )}
    </>
  );
}
