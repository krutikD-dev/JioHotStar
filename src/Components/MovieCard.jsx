import React, { useState } from "react";
import "./MovieCard.css";
import unavailableImg from '../assets/unvailableImg.jpg'
import { useInView } from 'react-intersection-observer';



const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const POSTER_SIZE = import.meta.env.VITE_TMDB_POSTER_SIZE;
const BANNER_SIZE = import.meta.env.VITE_TMDB_BANNER_SIZE;

export default function MovieCard({ movie, onClick }) {
  const [show, setShow] = useState(false);
  const { ref, inView} = useInView({
    threshold: 0.3,
  });

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : null;

  const banner = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/${BANNER_SIZE}${movie.backdrop_path}`
    : poster;


  const handlePopupEnter = () => {
    // setTimeout(() => setShow(true), 100);
    setShow(true)
  };

  const handlePopupLeave = () => {
    // setTimeout(() => setShow(false), 100);
    setShow(false)   
  };
  

  const handleClick = () => {
    setShow(false);
    onClick();
  };


  return (
    

      <div ref={ref} className="movie-card-wrapper">
    {inView ? (
      <div
      className="movie-card-wrapper"
      onMouseEnter={handlePopupEnter}
      onMouseLeave={handlePopupLeave}
      onClick={handleClick}
    >
      <div className="movie-card">
        <img
          className={!poster ? 'movie-img h-315' : 'movie-img' }
          src={poster || unavailableImg}
          alt={movie.title || movie.name || ""}
          loading="lazy"
        />
      </div>

      {show && (
        <div
          className="movie-popup"
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        >
            <div className="popup-overlay"></div>
          <div className="popup-banner">
            <img
              src={banner}
              alt=""
              className="popup-banner-img"
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
            <button className="watch-btn1"><i className="fa-solid fa-play"></i> Watch Now</button>
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
    ) : (
      <div className="movie-card-skeleton" />
    )}
  </div>

  );
}
