import React, { useState } from "react";
import "./MovieCard.css";

let hideTimeout = null; 

export default function MovieCard({ movie, onClick }) {
  const [show, setShow] = useState(false);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/400x600";

  const banner = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : poster;


  const handleEnter = () => {
    setTimeout(() => {
      setShow(true);
    }, 150);
  };

  const handleLeave = () => {
    setTimeout(() => {
      setShow(false);
    }, 150);
  };

  const handlePopupEnter = () => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  };

  const handlePopupLeave = () => {
    setTimeout(() => {
      setShow(false);
    }, 100);
  };

  const handleClick=()=>{
    setShow(false)
    onClick()
  }

  return (
    <div
      className="movie-card-wrapper"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div className="movie-card">
        <img className="movie-img" src={poster} alt="" />
      </div>

      {show && (
        <div
          className="movie-popup"
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        >
          <div className="popup-banner">
            <img
              src={banner}
              alt=""
              className="popup-banner-img"
              style={{ width: "100%", objectFit: "cover" }}
              loading="lazy"
            />
            <div className="popup-language-tag">
              {movie.original_language?.toUpperCase()}
            </div>
          </div>

          <h3 className="popup-title">
            {movie.title || movie.name || "Untitled"}
          </h3>

          <div className="movie-popup-top">
            <button className="watch-btn1">▶ Watch Now</button>
            <button className="plus-btn">+</button>
          </div>

          <p className="movie-meta">
            {movie.release_date || "N/A"} • U/A 13+ • 2h 20m • 4 Languages
          </p>

          <p className="movie-overview">
            {movie.overview?.substring(0, 200) || "No description available"}…
          </p>
        </div>
      )}
    </div>
  );
}
