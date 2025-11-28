import React, { useEffect } from 'react'
import './CardsCarousel.css'
import MoviesRow from "./MoviesRow";

function CardsCarousel({ movies }) {
  return (
    <>
          <MoviesRow title="Action Extravaganza" movies={movies} />
    </>
  )
}

export default CardsCarousel