import React, { useState,useEffect } from 'react'
import './SideNav.css'
import logo from '../assets/HotStarLogo.png'
import { LuPopcorn } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { NavLink } from 'react-router-dom';

function SideNav() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false)
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    // const loggedIn = localStorage.getItem("isLoggedIn");
    const phone = localStorage.getItem("userPhone");

    if ( phone) {
      // setIsLoggedIn(true);
      setUserPhone(phone);
    }
  }, []);

  const handleMouseEnter = ()=>{
    setIsHovering(true)
  }
  const handleMouseLeave = ()=>{
    setIsHovering(false)
  }

  return (
    <>
      <div className="sideBar" style={{width: isHovering ? '450px' : '100px'}} >
        <div className="logo">
          <img src={logo} alt="logo" className='hotLogo' loading='lazy'/>
        </div>

        <div className="navItems" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
          <li><NavLink to={'/'}><i className="fa-solid fa-house"></i><span className='navItem-txt'>Home</span></NavLink></li>
          <li><NavLink to={'/search'}><i className="fa-solid fa-magnifying-glass"></i><span className='navItem-txt'>Search</span></NavLink></li>
          <li><NavLink to={'/tv'}><i className="fa-solid fa-tv"></i><span className='navItem-txt'>TV</span></NavLink></li>
          <li><NavLink to={'/movie'}><LuPopcorn className='diff-icon' /><span className='navItem-txt'>Movie</span></NavLink></li>
          <li><NavLink to={'/sports'}><i className="fa-solid fa-person-running"></i><span className='navItem-txt'>sports</span></NavLink></li>
          {/* <li><NavLink to={'/sparks'}><i className="fa-solid fa-video"></i><span className='navItem-txt'>Sparks</span></NavLink></li> */}
          <li><NavLink to={'/category'}><BiCategory className='diff-icon' /><span className='navItem-txt'>Category</span></NavLink></li>
          <li><NavLink to={'/myspace'}>{userPhone ? (
          <div className="sidebar-avatar diff-icon">
            <span className="avatar-initial">
              {/* {userPhone.slice(-2)} */}
            </span>
          </div>
        ) : (
          <i className="fa-regular fa-circle-user"></i>
        )}<span className='navItem-txt'>My Space</span></NavLink></li>
        </div>

      </div>
    </>
  )
}

export default SideNav