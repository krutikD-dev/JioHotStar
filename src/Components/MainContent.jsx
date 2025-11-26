import React from 'react'
import './MainContent.css'
import LatestUpComing from './LatestUpComing'
import HeroCarousal from './HeroCarousal'
import sample from '../assets/sample.avif'
import CardsCarousel from './CardsCarousel'

function MainContent() {
  return (
    <>
        <div className="main-container">
            <LatestUpComing/>
            <HeroCarousal/>
            <CardsCarousel/>
            {/* <div><img src={sample} style={{width:'100%'}} alt="" srcset="" /></div> */}
        </div>
    </>
  )
}

export default MainContent