import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import "./CategoryListingPage.css";
import MovieDetailModal from "../Components/MovieDetailModal";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export default function CategoryListingPage() {
  const { type, value } = useParams();
  const { state } = useLocation();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const pageTitle = state?.title;
  //   console.log(type,value, state)

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "";

    if (type === "language") {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${value}`;
    }

    if (type === "browse") {
      url = `${BASE_URL}/trending/${value}/day?api_key=${API_KEY}`;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setMovies(res.data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, value]);

  if (loading) return <div className="category-loading">Loading...</div>;

  return (
    <div className="category-page">
      <h2 className="category-title">
        {pageTitle}
      </h2>

      <div className="category-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetailModal
          selectedMovie={selectedMovie}
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
