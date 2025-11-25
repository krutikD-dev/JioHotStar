import { useState } from 'react'
import './App.css'
import SideNav from './Components/SideNav'
import MainContent from './Components/MainContent'
function App() {

  return (
    <>
      <div className="flex-container">
      <SideNav/>
      <MainContent/>
      </div>
    </>
  )
}

export default App
