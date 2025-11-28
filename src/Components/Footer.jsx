import React from 'react'
import './Footer.css'
import appStore from '../assets/ios-appstore.webp'
import gpstore from '../assets/google-playstore.webp'

function Footer() {
  return (
    <>
        <div className="footer">
            <div className="col">
                <li><h4>Company</h4></li>
                <li>About</li>
                <li>Careers</li>
            </div>
            <div className="col">
                <li><h4>View Website in</h4></li>
                <li><i className="fa-solid fa-check me-2"></i>English</li>
                <li> Spanish</li>
            </div>
            <div className="col">
                <li><h4>Need Help?</h4></li>
                <li>Visit Help Center</li>
                <li>Share Feedback</li>
            </div>
            <div className="col">
                <li><h4>Connect with Us</h4></li>
                <li>Visit Help Center</li>
            </div>
            
        </div>
        <div className="row">
                <div className="flex-col-div">
                    <p>© 2025 STAR. All Rights Reserved.</p>
                    <div className='row-copyright'>
                        <span>Terms Of Use</span>
                        <span>Privacy Policy</span>
                        <span>FAQ</span>
                    </div>
                </div>
                <div className="downloadStore">
                    <img src={gpstore} alt="" />
                    <img src={appStore} alt="" />
                </div>
            </div>
    </>
  )
}

export default Footer