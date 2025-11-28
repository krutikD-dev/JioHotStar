import React from 'react'
import './LatestUpComing.css'
import IndvsSA from '../assets/Ind_vs_SA.jpg'
import hotStar from '../assets/hotStar-square.png'

function LatestUpComing() {
    return (
        <>
            <div className="advertiseBanner">
                <span>
                    <img src={IndvsSA} alt="" loading='lazy'/>
                    <div className="advertiseImg-overlay"></div>
                </span>
                <div className="advertisementDetailCard">
                    <div>
                        <div className="flex-item-center">
                            <img src={hotStar} alt="" className='sqr-HotStar' loading='lazy'/>
                            <div>
                                <p className="small-text">
                                    IND vs SA, 2nd Test
                                </p>
                                <span>8:30 AM Onwards</span>
                            </div>
                        </div>
                        <p className='ad-txt'>Team India face off World Test Champions</p>
                    </div>
                    <div>
                        <button className='advertisement-btn'>Explore</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LatestUpComing