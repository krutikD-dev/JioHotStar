import "./MySpace.css";
import Modal from "../Components/Modal";
import { useEffect, useState, useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";


export default function MySpace() {
  const [showModal, setShowModal] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userPhone, setUserPhone] = useState("");
  const navigate=useNavigate()
  const { userPhone, setUserPhone } = useContext(LoginContext);


  useEffect(() => {
    // const loggedIn = localStorage.getItem("isLoggedIn");
    const phone = localStorage.getItem("userPhone");

    if (phone) {
      // setIsLoggedIn(true);
      setUserPhone(phone);
    }
  }, []);

  const handleLoginSuccess = (phone) => {
    // setIsLoggedIn(true);
    setUserPhone(phone);
    setShowModal(false);
  };

  const handleLogOut=()=>{
    localStorage.clear();
    setUserPhone("");
    navigate(`/`)
  }


  if (userPhone) {
    return (
      <div className="myspace-logged-in">

        <div className="myspace-top">
          <div>
            <p className="sub-text">Subscribe to enjoy JioHotstar</p>
            <span className="phone-text">
              +91 ******{userPhone.slice(-2)}
            </span>
          </div>

          <div className="myspace-actions">
            <button className="subscribe-btn">Subscribe</button>
            <button className="help-btn-small">⚙ Help & Settings</button>
          </div>
        </div>

        <div className="profiles-section">
          <div className="profiles-header">
            <h3>Profiles</h3>
            <button className="logoutBtn" onClick={handleLogOut}>Logout</button>
          </div>

          <div className="profiles-row">
            <div className="profile active">
              <div className="avatar user-avatar">
                <span className="avatar-initial">
                  {userPhone?.slice(-2)}
                </span>
                <span className="tick">✔</span>
              </div>

              <p>User{userPhone?.slice(-2)}</p>
            </div>

            <div className="profile kids">
              <div className="avatar kids-avatar">KIDS</div>
              <p>Kids</p>
            </div>

            <div className="profile add">
              <div className="avatar add-avatar">+</div>
              <p>Add</p>
            </div>
          </div>
        </div>

      </div>
    );
  }


  return (
    <div className="myspace-container">
      <button className="help-btn">
        <i className="fa-regular fa-circle-question"></i> Help & Support
      </button>

      <div className="myspace-content">
        <img
          src="https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/feature/myspace/my_space_login_in_jv.png"
          alt=""
          width={322}
        />

        <h1 className="myspace-title">Login to JioHotstar</h1>
        <p className="myspace-subtitle">
          Start watching from where you left off, personalise for kids and more
        </p>

        <button className="login-btn" onClick={() => setShowModal(true)}>
          Log In
        </button>
      </div>

      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
