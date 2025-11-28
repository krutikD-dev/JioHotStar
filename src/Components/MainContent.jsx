import React, { useState, useEffect } from 'react'
import Home from '../Pages/Home'
import SearchPage from '../Pages/SearchPage'
import TvPage from '../Pages/TvPage'
import MoviePage from '../Pages/MoviePage'
import SportsPage from '../Pages/SportsPage'
import MySpace from '../Pages/MySpace'
import CategoryListingPage from '../Pages/CategoryListingPage'



import { Route, Routes } from 'react-router-dom'
import CategoryPage from '../Pages/CategoryPage'





function MainContent() {



  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tv' element={<TvPage />} />
        <Route path='/movie' element={<MoviePage />} />
        <Route path='/sports' element={<SportsPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/myspace' element={<MySpace />} />
        <Route path="/category/:type/:value" element={<CategoryListingPage />}/>

      </Routes>
    </>
  )
}

export default MainContent