import React, { useEffect, useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import axios from './axios';

const loginUrl= '/auth/login-pos'
const Login = () => {
  const [userNumber, setUserNumber] = useState('')
  const [pin, setPin] = useState('')
  const [errMsg, setErrMsg] = useState('')
  
  const userRef = useRef('')
  const errRef = useRef('')

  const navigate = useNavigate()
  const submitHandler = async (e)=>{
    e.preventDefault();
    setUserNumber('')
    setPin('')
    const data = {
     user_number: userNumber,
      pin : pin
    }
   try {

       const resp = await axios.post(loginUrl, data, 
      {
        headers:{'Content-Type': 'application/json; charset=UTF-8', 'Accept': 'Application/json'},
        withCredentials:false,
      },

      );

      localStorage.setItem('user', JSON.stringify(resp.data.data) );
      setUserNumber('')
      setPin('');
      navigate('products')      
  
} catch (error) {
    console.log(error)
    if (!error?.resp) {
      setErrMsg('No Server Response');
    }else if(error.response?.status ===422){
      setErrMsg(error.response.data.message);
    }else if(error.response?.status === 401 ){
      setErrMsg('Unauthorized')
    } else if(error.response?.status === 404){
      setErrMsg(error.response.data.message)
    }
    else{
      setErrMsg('Login Failed')
    }
    errRef.current.focus();
   }

  
  }
  useEffect(()=>{
    userRef.current.focus();
  })
  useEffect(()=>{
    setErrMsg('');
    
  }, [userNumber, pin])
   

  return (
    
    <div className='login-vector px-5 py-3'>
      <p ref={errRef} className='text-danger text-center px-2' aria-live="assertive">
        {errMsg}
        </p>
       <h3 style={{fontWeight:'bold'}} className="text-white text-center">Membership Login</h3>

       <form onSubmit={submitHandler}>
        <div className='row g-4 mt-3'>
            <div> 
            <label className='text-white'>User Name:</label> <br/>
            <input type='text' required value={userNumber} ref={userRef} onChange={(e) =>setUserNumber(e.target.value)}
             style={{borderRadius:'3rem'}} className="p-2 w-100 mt-1"/>
            </div>
            <div>
             <label className='text-white'>User Mail: </label> <br/>
            <input type='password' required value={pin} onChange={(e) =>setPin(e.target.value)} 
            style={{borderRadius:'3rem'}} className="p-2 w-100 mt-1"/>
            </div>
            <div className='row g-2 py-2'>
            <button type='submit' style={{backgroundColor:'#c1ade4', borderRadius:'3rem'}} 
            className="btn btn-lg text-white ">
                Login
            </button> 
            </div>
        </div>
       </form>
    </div>
  )

}

export default Login