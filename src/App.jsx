import { useState } from 'react'
import './App.css'
import SideNav from './Components/SideNav'
import MainContent from './Components/MainContent'
import { BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <>
      <BrowserRouter>
        <div className="flex-container">
      <SideNav/>
      <MainContent/>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
