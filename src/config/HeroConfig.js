const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const HERO_CONFIG = {
  home: {
    fetchUrl: `${BASE_URL}/trending/all/day?api_key=${API_KEY}`
  },
  movies: {
    fetchUrl: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  },
  tv: {
    fetchUrl: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
  },
  sports:{
  // cricket: `${BASE_URL}/search/tv?api_key=${API_KEY}&query=cricket`,
  // football: `${BASE_URL}/search/tv?api_key=${API_KEY}&query=football`,
  // sportsMovies: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=sports`,
  fetchUrl: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_keywords=180547&sort_by=popularity.desc`
  }
};
