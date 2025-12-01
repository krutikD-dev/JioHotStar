import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";
import { HERO_CONFIG } from "../config/HeroConfig";



const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const TV_TRENDING =
  `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`;

const TV_POPULAR =
  `${BASE_URL}/tv/popular?api_key=${API_KEY}`;

const TV_TOP_RATED =
  `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`;

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

  if (loading) return <div style={{width:'100%',minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center' }}>Loading...</div>;

  return (
    <div className="main-container">
      <HeroCarousal {...HERO_CONFIG.tv}/>

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
