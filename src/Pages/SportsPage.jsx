import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousel from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";
import { HERO_CONFIG } from "../config/HeroConfig";



const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;


const SPORTS_ROWS = {
  cricket:
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=cricket`,
  football:
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=football`,
  sportsMovies:
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=sports`,
};

function SportsPage() {
  const [cricket, setCricket] = useState([]);
  const [football, setFootball] = useState([]);
  const [sportsMovies, setSportsMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsRows = async () => {
      try {
        setLoading(true);

        const [cricketRes, footballRes, sportsMovieRes] =
          await Promise.all([
            axios.get(SPORTS_ROWS.cricket),
            axios.get(SPORTS_ROWS.football),
            axios.get(SPORTS_ROWS.sportsMovies),
          ]);

        setCricket(cricketRes.data.results || []);
        setFootball(footballRes.data.results || []);
        setSportsMovies(sportsMovieRes.data.results || []);
      } catch (error) {
        console.error("Error fetching sports content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsRows();
  }, []);

  if (loading) return <div>Loading sports...</div>;
  console.log(cricket)
  return (
    <div className="main-container">
      <HeroCarousel
        {...HERO_CONFIG.sports}
      />

      <div className="latest-release-section">
        <MoviesRow title="Cricket Shows" movies={cricket} />
        <MoviesRow title="Football Shows" movies={football} />
        <MoviesRow title="Sports Movies" movies={sportsMovies} />
      </div>

      <Footer />
    </div>
  );
}

export default SportsPage;
