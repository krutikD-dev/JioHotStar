import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import MovieDetailModal from "../Components/MovieDetailModal";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const AIRING_TODAY_URL = `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;
const SEARCH_URL = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US`;

export default function SearchPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchtxt, setSearchtxt] = useState("");

  useEffect(() => {
    const fetchAiringToday = async () => {
      try {
        const res = await axios.get(AIRING_TODAY_URL);
        setData(res.data.results || []);
        setOriginalData(res.data.results || []);
      } catch (err) {
          console.error("Error fetching airing today TV shows:", err);
        }
      finally {
        setLoading(false);
      }
    };

    fetchAiringToday();
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!searchtxt.trim()) {
        setData(originalData);
        return;
      }

      try {
        const res = await axios.get(`${SEARCH_URL}&query=${searchtxt}`);
        setData(res.data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchtxt, originalData]);

  if (loading) {
    return <div style={{width:'100%',minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center' }}>Loading...</div>;
  }

  return (
    <div className="search-page">
      <div className="search-bar">
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>

        <input
          type="text"
          placeholder="Movies, shows and more"
          className="search-input"
          value={searchtxt}
          onChange={(e) => setSearchtxt(e.target.value)}
        />
      </div>

      <div className="content-section">
        <h2 className="section-title">
          {searchtxt ? "Search Results" : "Trending Content"}
        </h2>

        <div className="content-grid">
          {data.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}

          {!data.length && (
            <p style={{ color: "#aaa" }}>No results found</p>
          )}
        </div>
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
