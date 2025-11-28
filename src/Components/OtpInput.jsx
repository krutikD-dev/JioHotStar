import React, { useEffect, useRef, useState } from 'react'
import './OtpInput.css'

function OtpInput({length, onOtpSubmit}) {
    const [otp, setOtp]=useState(new Array(length).fill(''))
    const inputRef = useRef([])
    // console.log(inputRef.current)

    useEffect(()=>{
        if(inputRef.current[0]){
            inputRef.current[0].focus()
        }
    },[])
    function handleChange(e,index){
        const value=e.target.value
        if(isNaN(value))return

        const newotp = [...otp]
        newotp[index]= value.substring(value.length-1)
        setOtp(newotp)

        const combinedotp = newotp.join('') 
        if(combinedotp.length===length) onOtpSubmit(combinedotp)

            if(value && index<length-1 || index===0){
                inputRef.current[index+1].focus();
            }
    }
        
    const handleKeyDown=(index,e)=>{
        if(e.key==='Backspace' && !otp[index]&&index>0 && inputRef.current[index-1]){
            inputRef.current[index-1].focus();
        }
    }
    const handleClick=(index)=>{
        inputRef.current[index].setSelectionRange(1,1)
    }

  return (
    <>
        <div>
            {otp.map((value,index)=>{
            return(
                <input type="text"
                className='otpInput'
                    key={index} 
                    ref={(input)=>(inputRef.current[index]=input)}
                    value={value}
                    onChange={(e)=>handleChange(e,index)}
                    onClick={()=>handleClick(index)}
                    onKeyDown={(e)=> handleKeyDown(index,e)}
                />
            )
        })}
        </div>
    </>
  )
}

export default OtpInput