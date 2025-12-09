import React, { useEffect, useRef, useState } from 'react';
import './Modal.css'
import QR from '../assets/QR.png'
import TextField from '@mui/material/TextField';
import OtpInput from './OtpInput';
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";


const Modal = ({ showModal, closeModal, onSuccess }) => {
  const [number, setNumber] = useState('')
  const [otpSection, setOtpSection] = useState(false)
  const [showContinuebtn, setShowContinuebtn] = useState(false)
  const [currOtp, setCurrOtp] = useState('')
  const inputRef = useRef(null);
  const { setUserPhone } = useContext(LoginContext);


  useEffect(() => {
    if (showModal) {
      // inputRef.current.focus();
    }
  }, [showModal]);

  if (!showModal) return null;

  const handleChange = (event) => {
    const value = event.target.value;
    if (Number.isNaN(Number(value))) {
      return
    } else {
      setNumber(value);
    }
  };

  function close() {
    closeModal()
    setOtpSection(false)
  }

  const onOtpSubmit = (otp) => {
    if (otp === "1111") {
      // localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem("userPhone", number);
      setUserPhone(number);

      onSuccess(number);
    }
  };
  const handleBack = () => {
    setOtpSection(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className='closeIcon' onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <div className="modal-header">
          <h2>Login or signUp to continue</h2>
          <span>Scan QR code or enter phone number to login</span>
        </div>
        <div className="modal-flex">
          <div className="qr-section">
            <img src={QR} width={180} height={180} alt="QR" />
            <p className='qr-txt'>Use Camera App to Scan QR</p>
            <p className='qr-instruction'>Click on the link generated to redirect to JioHotstar mobile app</p>
          </div>
          <div className='modal-separator'>
            <div className="w-1">
              <div className="ssjks">
                <span>OR</span>
              </div>
            </div>
          </div>

          <div className="number-login-section">
            {!otpSection && <div className="wrp-clldf">
              <div className="wrap-knkjn">
                <div className="dummy-numberField">
                  <span>+91</span>
                </div>
                <TextField id="outlined-basic"
                  autoComplete="off"
                  value={number}
                  ref={inputRef}
                  slotProps={{ htmlInput: { maxLength: 10 } }}
                  onChange={handleChange}
                  label="Enter mobile number" sx={{
                    "& input[type=number]::-webkit-outer-spin-button,\
                      & input[type=number]::-webkit-inner-spin-button": {
                      WebkitAppearance: "none",
                      margin: 0,
                    },

                    "& .MuiOutlinedInput-input": {
                      color: "#fff",
                    },
                    "& .MuiInputLabel-root": {
                      color: ' #8f98b2',
                      fontSize: '18px',
                    },
                    "& fieldset": {
                      borderColor: "#4b5166",
                      borderRadius: '8px'
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#8f98b2",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "#5b6176",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset": {
                      borderColor: "#5b6176",
                    },
                  }} variant="outlined" />
              </div>
              <p>By proceeding you confirm that you are above 18 years of age and agree to the <a href="https://www.hotstar.com/privacy-policy/in">Privacy Policy </a> & <a href="https://hotstar.com/tnc/in">Terms of Use.</a></p>
            </div>}

            {otpSection && <div className="otp-section">
              <button className='backBtn' onClick={handleBack} ><i className="fa-solid fa-arrow-left"></i> Back</button>
              <h2>OTP sent to +91{number}</h2>

              <OtpInput length={4} onOtpSubmit={onOtpSubmit} setShowContinuebtn={setShowContinuebtn} setCurrOtp={setCurrOtp} />
              <p>Resend OTP on:</p>
              <div className="otp-device">
                <span><i className="fa-solid fa-mobile"></i> SMS</span> <span><i className="fa-solid fa-phone"></i> Call</span>
              </div>
            </div>}
            <div>
              {number && number.length >= 10 && !otpSection ? <button className="subscribe-btn" onClick={() => setOtpSection(true)}>GET OTP  <i className="fa-solid fa-angle-right"></i></button> : ''}
              {otpSection && showContinuebtn ? <button className="subscribe-btn" onClick={() => onOtpSubmit(currOtp)}>Continue  <i className="fa-solid fa-angle-right"></i></button> : ''}

              <p>Having trouble logging in? <a href="https://help.jiohotstar.com/in/en/support/search?term=login" target="_blank">Get Help</a></p>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
};

export default Modal;
