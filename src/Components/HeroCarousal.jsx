import "./HeroCarousal.css";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroCarousal = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hero-carousel-container"  > 
      <Carousel
        autoPlay={true}
        transitionTime={1000}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        swipeable={false}
        renderArrowNext={() => null}
        renderArrowPrev={() => null}
        animationHandler={'fade'}
        stopOnHover={false}
      >
        {popularMovies.map((movie) => (
          <div className="carousel-slide" key={movie.id}>
            <div
              className="hero-image"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              }}
            >
              <div className="overlay"></div>

              <div className="content">
                <h1 className="title">{movie.original_title || "Title Unavailable"}</h1>
                <p className="meta">
                  {movie.release_date || "Release date unavailable"} •{" "}
                  {movie.runtime || "N/A"} mins • {movie.original_language || "Language unavailable"}
                </p>
                <p className="description">
                  {movie.overview ? movie.overview.substring(0, 200) + "..." : "No description available."}
                </p>

                <div className="tags">
                  {movie.genres && movie.genres.length > 0
                    ? movie.genres.map((genre) => (
                        <span key={genre.id} className="tag">
                          {genre.name}
                        </span>
                      ))
                    : "Genres unavailable"}
                </div>
                <div className="buttons">
                  <button className="subscribe-btn">▶  Watch Now</button>
                  <button className="plus-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousal;
