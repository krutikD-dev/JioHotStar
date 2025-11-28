import React, { useEffect, useState } from "react";
import "./MovieDetailModal.css";
import MovieCard from "./MovieCard";
import axios from "axios";
import unknownprson from '../assets/unknownprson.png'

const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

export default function MovieDetailModal({movie,similarMovies = [],onClose}) {
  const [activeTab, setActiveTab] = useState("similar");
  const [cast, setCast] = useState([]);
  const [loadingCast, setLoadingCast] = useState(true);


  const mediaType =
  movie.media_type ||
  (movie.first_air_date ? "tv" : "movie");

  if (!movie) return null;

  const banner = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoadingCast(true);

        const url =
          mediaType === "tv"
            ? `https://api.themoviedb.org/3/tv/${movie.id}/credits`
            : `https://api.themoviedb.org/3/movie/${movie.id}/credits`;

        const res = await axios.get(url, {
          params: { api_key: TMDB_API_KEY },
        });

        setCast(res.data.cast?.slice(0, 10) || []);
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
        <button className="close-btn" onClick={onClose}>✕</button>

        <div
          className="modal-hero"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="modal-gradient" />

          <div className="modal-content">
            <h1 className="modal-title">
              {movie.title || movie.name}
            </h1>

            <p className="modal-meta">
              {movie.release_date?.slice(0, 4) || "N/A"} • U/A 13+ • ⭐{" "}
              {movie.vote_average?.toFixed(1)}
            </p>

            <p className="modal-desc">
              {movie.overview}
            </p>

            <div className="modal-buttons">
              <button className="watch-btn"><i class="fa-solid fa-play"></i> Watch Now</button>
              <button className="icon-btn"><i class="fa-solid fa-plus"></i></button>
              <button className="icon-btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
          </div>
        </div>

        <div className="modal-section">
          <h3 className="cast-title">Cast</h3>

          {loadingCast ? (
            <p className="cast-loading">Loading cast…</p>
          ) : (
            <div className="cast-row">
              {cast.map((actor) => (
                <div className="cast-card" key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : unknownprson
                    }
                    alt={actor.name}
                  />
                  <p className="cast-name">{actor.name}</p>
                  <span className="cast-character">
                    {actor.character}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-tabs">
          <button
            className={activeTab === "similar" ? "active" : ""}
            onClick={() => setActiveTab("similar")}
          >
            More Like This
          </button>
          <button
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </div>

        <div className="modal-tab-content">
          {activeTab === "similar" && (
            <div className="similar-row">
              {similarMovies.map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          )}

          {activeTab === "details" && (
            <div className="details-section">
              <p><b>Original Language:</b> {movie.original_language}</p>
              <p><b>Popularity:</b> {movie.popularity}</p>
              <p><b>Rating:</b> {movie.vote_average}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
