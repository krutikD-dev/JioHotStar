import React, { useRef, lazy,Suspense, useState } from "react";
import MovieCard from "./MovieCard";
import "./MoviesRow.css";

const MovieDetailModal = lazy(() =>
  import("../Components/MovieDetailModal")
);

export default function MoviesRow({ title, movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const rowRef = useRef(null);
  const [hover, setHover] = useState(false);

  const scrollNext = () => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({
      left: rowRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };
// console.log(selectedMovie)
  return (
    <>
      <div
        className="movies-section"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 className="movies-title">{title}</h2>

        <div className="movies-row-outer">
          <div className="movies-row" ref={rowRef}>
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} onClick={() => setSelectedMovie(m)}
              />
            ))}
          </div>

          {hover && movies.length > 0 && (
            <button className="next-scroll-btn" onClick={scrollNext}>
              ›
            </button>
          )}
        </div>
      </div>
      {selectedMovie && (
        <Suspense fallback={<div className="modal-loader">Loading...</div>}>
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
        </Suspense>
      )}
    </>
  );
}
