import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import("../Pages/Home"));
const SearchPage = lazy(() => import("../Pages/SearchPage"));
const TvPage = lazy(() => import("../Pages/TvPage"));
const MoviePage = lazy(() => import("../Pages/MoviePage"));
const SportsPage = lazy(() => import("../Pages/SportsPage"));
const MySpace = lazy(() => import("../Pages/MySpace"));
const CategoryPage = lazy(() => import("../Pages/CategoryPage"));
const CategoryListingPage = lazy(() =>
  import("../Pages/CategoryListingPage")
);


function MainContent() {
  return (
    <>
      <Suspense fallback={<div style={{width:'100%',minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/myspace" element={<MySpace />} />
          <Route path="*" element={<Home/>} />
          <Route
            path="/category/:type/:value"
            element={<CategoryListingPage />}
          />
        </Routes>
      </Suspense>
    </>
  )
}

export default MainContent