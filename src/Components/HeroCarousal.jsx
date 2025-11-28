import "./HeroCarousal.css";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import MovieDetailModal from "./MovieDetailModal";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const TRENDING_URL = `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`;
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;

const HeroCarousal = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreMap, setGenreMap] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreRes = await axios.get(GENRE_URL);
        const map = {};
        genreRes.data.genres.forEach((g) => {
          map[g.id] = g.name;
        });
        setGenreMap(map);

        const moviesRes = await axios.get(TRENDING_URL);
        setPopularMovies(moviesRes.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const getGenreNames = (ids) =>
    ids?.map((id) => genreMap[id]).filter(Boolean) || [];

  return (
    <div className="hero-carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        swipeable={false}
        renderArrowNext={() => null}
        renderArrowPrev={() => null}
        stopOnHover={false}
        animationHandler="fade"
        onChange={(index) => setCurrentSlide(index)}
      >
        {popularMovies.map((movie, index) => (
          <div className="carousel-slide" key={movie.id}>
            <div
              className="hero-image"
              style={{
                backgroundImage:
                  index === currentSlide
                    ? `url(${IMAGE_BASE_URL}/w1280${movie.backdrop_path})`
                    : "none",
              }}
            >
              <div className="overlay" />

              <div className="content">
                <h1 className="title">
                  {movie.original_name || movie.original_title}
                </h1>

                <p className="meta">
                  {movie.release_date || "Release date unavailable"} •{" "}
                  {movie.original_language}
                </p>

                <p className="description">
                  {movie.overview || "No description available."}
                </p>

                <div className="tags">
                  {getGenreNames(movie.genre_ids).join(" | ")}
                </div>

                <div className="buttons">
                  <button
                    className="subscribe-btn"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    ▶ Watch Now
                  </button>
                  <button className="plus-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default HeroCarousal;
