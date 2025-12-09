import React, { useEffect, useState } from "react";
import "./MovieDetailModal.css";
import MovieCard from "./MovieCard";
import axios from "axios";
import unknownperson from "../assets/unknownprson.png";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const BANNER_SIZE = import.meta.env.VITE_TMDB_BANNER_SIZE;
const CAST_SIZE = import.meta.env.VITE_TMDB_CAST_SIZE;

export default function MovieDetailModal({
  movie,
  onClose
}) {
  const [activeTab, setActiveTab] = useState("details");
  const [cast, setCast] = useState([]);
  const [loadingCast, setLoadingCast] = useState(true);

  if (!movie) return null;

  const mediaType =
    movie.media_type || (movie.first_air_date ? "tv" : "movie");

  const banner = movie.backdrop_path
    ? `${IMAGE_BASE_URL}/${BANNER_SIZE}${movie.backdrop_path}`
    : null;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoadingCast(true);

        const creditsUrl =
          mediaType === "tv"
            ? `${BASE_URL}/tv/${movie.id}/credits`
            : `${BASE_URL}/movie/${movie.id}/credits`;

        const res = await axios.get(creditsUrl, {
          params: { api_key: API_KEY },
        });

        setCast(res.data.cast || []);
      } catch (err) {
        console.error("Failed to fetch cast", err);
      } finally {
        setLoadingCast(false);
      }
    };

    fetchCast();
  }, [movie.id, mediaType]);

  return (
    <div className="movie-modal-backdrop" onClick={onClose}>
      
      <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
        {/* <button className="close-btn" onClick={onClose}>✕</button> */}

        <div
          className="modal-hero"
          style={{ backgroundImage: banner ? `url(${banner})` : "none" }}
        >
          <div className="modal-gradient" />

          <div className="modal-content">
            <h1 title={movie.title || movie.name} className="modal-title">
              {movie.title || movie.name}
            </h1>

            <p className="modal-meta">
              {movie.release_date?.slice(0, 4) || "N/A"} • U/A 13+ • <i class="fa-solid fa-star"></i>{" "}
              {movie.vote_average?.toFixed(1)}
            </p>

            <p title={movie.overview} className="modal-desc">
              {movie.overview}
            </p>

            <div className="modal-buttons">
              <button className="watch-btn">
                <i className="fa-solid fa-play"></i> Watch Now
              </button>
              <button className="icon-btn">
                <i className="fa-solid fa-plus"></i>
              </button>
              <button className="icon-btn">
                <i className="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h3 className="cast-title">Cast</h3>

          {loadingCast ? (
            <p className="cast-loading">Loading cast…</p>
          ) : (
            <div className="cast-row">
              {cast.length>1 ? cast.map((actor) => (
                <div className="cast-card" key={actor.id}>
                  <img
                  className="cast-profile-pic"
                    src={
                      actor.profile_path
                        ? `${IMAGE_BASE_URL}/${CAST_SIZE}${actor.profile_path}`
                        : unknownperson
                    }
                    alt={actor.name}
                    loading="lazy"
                  />
                  <p className="cast-name">{actor.name}</p>
                  <span className="cast-character">
                    {actor.character}
                  </span>
                </div>
              ))
              : 'No Cast Details found!'
            }
            </div>
          )}
        </div>

        <div className="modal-tabs">
          <button
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={activeTab === "similar" ? "active" : ""}
            onClick={() => setActiveTab("similar")}
          >
            More Like This
          </button>
        </div>

        <div className="modal-tab-content">

          {activeTab === "details" && (
            <div className="details-section">
              <p><b>Original Language:</b> {movie.original_language}</p>
              <p><b>Popularity:</b> {movie.popularity}</p>
              <p><b>Rating:</b> {movie.vote_average}</p>
            </div>
          )}
        </div>
      </div>
        <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  );
}
