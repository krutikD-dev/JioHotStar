import React from 'react'
import './SideNav.css'
import logo from '../assets/HotStarLogo.png'
import { LuPopcorn } from "react-icons/lu";

function SideNav() {
  return (
    <>
      <div className="sideBar">
        <div className="logo">
          <img src={logo} alt="logo" className='hotLogo' />
        </div>

        <div className="navItems">
          <li><a href=""><i class="fa-solid fa-house"></i><span className='navItem-txt'>Home</span></a></li>
          <li><a href=""><i class="fa-solid fa-magnifying-glass"></i><span className='navItem-txt'>Search</span></a></li>
                    <li><a href=""><i class="fa-solid fa-tv"></i><span className='navItem-txt'>Search</span></a></li>


          <li><a href=""><LuPopcorn /><span className='navItem-txt'>Movie</span>
          </a></li>

          <li><a href=""><i class="fa-solid fa-person-running"></i><span className='navItem-txt'>sports</span></a></li>

          <li><a href=""><i class="fa-solid fa-video"></i><span className='navItem-txt'>Sparks</span></a></li>
          <li><a href=""><i class="fa-solid fa-video"></i><span className='navItem-txt'>Category</span></a></li>


          <li><a href=""><i class="fa-solid fa-circle-user"></i><span className='navItem-txt'>My Space</span></a></li>

        </div>

      </div>
    </>
  )
}

export default SideNav