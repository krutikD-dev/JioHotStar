import "./HeroCarousal.css";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import MovieDetailModal from "./MovieDetailModal";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const GENRE_URL = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;

function HeroCarousel({ fetchUrl }) {
  const [items, setItems] = useState([]);
  const [genreMap, setGenreMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [genreRes, moviesRes] = await Promise.all([
          axios.get(GENRE_URL),
          axios.get(fetchUrl),
        ]);

        if (!active) return;

        const map = {};
        genreRes.data.genres.forEach(g => {
          map[g.id] = g.name;
        });

        setGenreMap(map);
        setItems(moviesRes.data.results || []);
      } catch (e) {
        console.error("HeroCarousel error:", e);
      } finally {
        active && setLoading(false);
      }
    };

    fetchData();
    return () => { active = false };
  }, [fetchUrl]);

  const getGenres = ids =>
    ids?.map(id => genreMap[id]).filter(Boolean).join(" | ");

  return (
    <div className="hero-carousel-container">

      <Carousel
        key={items.length}
        autoPlay
        // interval={3000}
        infiniteLoop
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        animationHandler="fade"
        swipeable
        onChange={setCurrentSlide}
      >
        {items.map((item, index) => (
          <div className="carousel-slide" key={item.id}>
            <div
              className="hero-image"
              style={{
                backgroundImage:
                  index === currentSlide
                    ? `url(${IMAGE_BASE_URL}/w1280${item.backdrop_path})`
                    : "none",
              }}
            >
              <div className="overlay" />

              <div className="content">

                <h1 className="title">
                  {item.original_name || item.original_title}
                </h1>

                <p className="meta">
                  {item.release_date || "Release date unavailable"} •{" "}
                  {item.original_language}
                </p>

                <p className="description">
                  {item.overview || "No description available."}
                </p>

                <div className="tags">
                  {getGenres(item.genre_ids)}
                </div>

                <div className="buttons">
                  <button
                    className="subscribe-btn"
                    onClick={() => setSelected(item)}
                  >
                    <i className="fa-solid fa-play"></i> Watch Now
                  </button>
                  <button className="plus-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {selected && (
        <MovieDetailModal
          movie={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

export default HeroCarousel;
