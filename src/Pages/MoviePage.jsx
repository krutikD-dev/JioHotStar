import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";

const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

const MOVIE_TRENDING =
  `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`;

const MOVIE_POPULAR =
  `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

const MOVIE_TOP_RATED =
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`;

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
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <HeroCarousal />

      {/* <div className="latest-release-section"> */}
        <MoviesRow title="Trending Movies" movies={trending} />
        <MoviesRow title="Popular Movies" movies={popular} />
        <MoviesRow title="Top Rated Movies" movies={topRated} />
      {/* </div> */}

      <Footer />
    </div>
  );
}

export default MoviePage;
