import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import LatestUpComing from "../Components/LatestUpComing";
import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const TRENDING_ALL =
  `${BASE_URL}/trending/all/day?api_key=${API_KEY}`;

const POPULAR_MOVIES =
  `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

const TOP_RATED_MOVIES =
  `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`;

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
