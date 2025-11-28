import React, {useState,useEffect} from 'react'
import './SearchPage.css'
import axios from 'axios'
import MovieCard from '../Components/MovieCard';
import MovieDetailModal from '../Components/MovieDetailModal';
const TMDB_API_KEY = "4e44d9029b1270a757cddc766a1bcb63";
const AIRING_TODAY_URL = `https://api.themoviedb.org/3/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=1`

export default function SearchPage() {
  const [selectedMovie, setSelectedMovie] = useState(null)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiringToday = async () => {
      try {
        const res = await axios.get(AIRING_TODAY_URL);
        setData(res.data.results || []);
      } catch (err) {
        console.error("Error fetching airing today TV shows:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAiringToday();
  }, []);

  if (loading) {
    return <div className="search-page">Loading...</div>;
  }
  return (
    <div className="search-page">
      <div className="search-bar">
        <span className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
        <input
          type="text"
          placeholder="Movies, shows and more"
          className="search-input"
        />
      </div>
      <div className="content-section">
        <h2 className="section-title">Trending in India</h2>

        <div className="content-grid">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={()=>setSelectedMovie(movie)} />
          ))}
        </div>
      </div>
      {selectedMovie && <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>}
    </div>
  );
}
