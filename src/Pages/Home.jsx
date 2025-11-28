import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import LatestUpComing from "../Components/LatestUpComing";
import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";

const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

const TRENDING_ALL =
  `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`;

const POPULAR_MOVIES =
  `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

const TOP_RATED_MOVIES =
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`;

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          axios.get(TRENDING_ALL),
          axios.get(POPULAR_MOVIES),
          axios.get(TOP_RATED_MOVIES),
        ]);

        setTrending(trendingRes.data.results || []);
        setPopular(popularRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);

      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <LatestUpComing />

      <HeroCarousal />

      <div className="latest-release-section">
        <MoviesRow title="Trending Now" movies={trending} />
        <MoviesRow title="Popular Movies" movies={popular} />
        <MoviesRow title="Top Rated Movies" movies={topRated} />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
