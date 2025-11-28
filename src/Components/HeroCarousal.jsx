import "./HeroCarousal.css";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import MovieDetailModal from "./MovieDetailModal";

const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US`;
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`;

const HeroCarousal = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreMap, setGenreMap] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreRes = await axios.get(GENRE_URL);
        const genreList = genreRes.data.genres || [];
        const map = genreList.reduce((acc, g) => {
          acc[g.id] = g.name;
          return acc;
        }, {});
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

  const getGenreNames = (ids) => ids?.map((id) => genreMap[id]).filter(Boolean) || [];

  return (
    <div className="hero-carousel-container">
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
        onChange={(index) => setCurrentSlide(index)}
        // animationHandler="fade"
        stopOnHover={false}
      >
        {popularMovies.map((movie) => (
          <div className="carousel-slide" key={movie.id} >
            <div
              className="hero-image"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              }}
            >
              <div className="overlay"></div>

              <div className="content">
                <h1 className="title">
                  {movie.original_name || movie.original_title}
                </h1>

                <p className="meta">
                  {movie.release_date || "Release date unavailable"} •{" "}
                  {movie.runtime || "N/A"} mins •{" "}
                  {movie.original_language || "Language unavailable"}
                </p>

                <p className="description">
                  {movie.overview
                    ? movie.overview 
                    : "No description available."}
                </p>

                <div className="tags">
                  {movie.genre_ids?.length ? (
                    <span>{getGenreNames(movie.genre_ids).join(" | ")}</span>
                  ) : (
                    "Genres unavailable"
                  )}
                </div>

                <div className="buttons">
                  <button className="subscribe-btn" onClick={()=>setSelectedMovie(movie)}>▶ Watch Now</button>
                  <button className="plus-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {selectedMovie && <MovieDetailModal  movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}/> }
    </div>
  );
};

export default HeroCarousal;
