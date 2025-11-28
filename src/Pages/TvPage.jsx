import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";

const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

const TV_TRENDING =
  `https://api.themoviedb.org/3/trending/tv/day?api_key=${TMDB_API_KEY}`;

const TV_POPULAR =
  `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`;

const TV_TOP_RATED =
  `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}`;

function TvPage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);

        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          axios.get(TV_TRENDING),
          axios.get(TV_POPULAR),
          axios.get(TV_TOP_RATED),
        ]);

        setTrending(trendingRes.data.results || []);
        setPopular(popularRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);

      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-container">
    
      <HeroCarousal />

      <div className="latest-release-section">
        <MoviesRow title="Trending TV Shows" movies={trending} />
        <MoviesRow title="Popular TV Shows" movies={popular} />
        <MoviesRow title="Top Rated TV Shows" movies={topRated} />
      </div>

      <Footer />
    </div>
  );
}

export default TvPage;
