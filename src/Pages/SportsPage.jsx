import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/MainContent.css";

import HeroCarousal from "../Components/HeroCarousal";
import MoviesRow from "../Components/MoviesRow";
import Footer from "../Components/Footer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SPORTS_QUERIES = {
  cricket: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=cricket`,
  football: `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=football`,
  sportsMovie: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=sports`,
};

function SportsPage() {
  const [cricket, setCricket] = useState([]);
  const [football, setFootball] = useState([]);
  const [sportsMovies, setSportsMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);

        const [cricketRes, footballRes, sportsMovieRes] =
          await Promise.all([
            axios.get(SPORTS_QUERIES.cricket),
            axios.get(SPORTS_QUERIES.football),
            axios.get(SPORTS_QUERIES.sportsMovie),
          ]);

        setCricket(cricketRes.data.results || []);
        setFootball(footballRes.data.results || []);
        setSportsMovies(sportsMovieRes.data.results || []);

      } catch (err) {
        console.error("Error fetching sports content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <HeroCarousal />

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
