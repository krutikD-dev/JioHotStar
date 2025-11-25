import React from 'react'
import './MainContent.css'
import LatestUpComing from './LatestUpComing'
import HeroCarousal from './HeroCarousal'
import sample from '../assets/sample.avif'

function MainContent() {
  return (
    <>
        <div className="main-container">
            <LatestUpComing/>
            <HeroCarousal/>
            {/* <div><img src={sample} style={{width:'100%'}} alt="" srcset="" /></div> */}
        </div>
    </>
  )
}

export default MainContent