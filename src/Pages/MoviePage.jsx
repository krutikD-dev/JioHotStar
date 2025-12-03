import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";
import { HERO_CONFIG } from "../config/HeroConfig";



const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const MOVIE_TRENDING =
  `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;

const MOVIE_POPULAR =
  `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

const MOVIE_TOP_RATED =
  `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;

function MoviePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          axios.get(MOVIE_TRENDING),
          axios.get(MOVIE_POPULAR),
          axios.get(MOVIE_TOP_RATED),
        ]);

        setTrending(trendingRes.data.results || []);
        setPopular(popularRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div style={{width:'100%',minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center' }}><span className="loader"></span></div>;

  return (
    <div className="main-container">
      <HeroCarousal {...HERO_CONFIG.movies}/>

      <div className="latest-release-section">
        <MoviesRow title="Trending Movies" movies={trending} />
        <MoviesRow title="Popular Movies" movies={popular} />
        <MoviesRow title="Top Rated Movies" movies={topRated} />
      </div>

      <Footer />
    </div>
  );
}

export default MoviePage;
