import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from './axios';
import { UserContext } from './Context';

const loginUrl= '/auth/login-pos'
const Login = () => {
  const {setUser } = useContext(UserContext)
  const [userNumber, setUserNumber] = useState('')
  const [pin, setPin] = useState('')
  const [errMsg, setErrMsg] = useState('')
  
  const userRef = useRef('')
  const errRef = useRef('')

  const submitHandler = async (e)=>{
    e.preventDefault();
    setUserNumber('')
    setPin('')
    const data = {
      userNumber,
      pin
    }
   try {
      const resp = await axios.post(loginUrl, JSON.stringify(data), 
      {
        headers:{'Content-Type': 'application/json; charset=UTF-8', 'Connection': 'Keep-alive'},
        withCredentials:true,
      }
      );
      console.log(JSON.stringify(resp?.data));
      const accessToken = resp?.data?.token;
      setUser({userNumber, pin, accessToken})
      setUserNumber('')
      setPin('')
   } catch (error) {
    console.log(error)
    if (!error?.resp) {
      setErrMsg('No Server Response');
    }else if(error.resp?.status ===400){
      setErrMsg('Missing User Number or Password');
    }else if(error.resp?.status === 401 ){
      setErrMsg('Unauthorized')
    }else{
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
      <p ref={errRef} className={errMsg ? '' : ''} aria-live="assertive"></p>
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
            <p className='text-center text-white' style={{fontSize:'15px'}}> Don't have account yet? 
            <Link to="/register" type='submit' className="btn btn-lg text-white" 
            style={{fontSize:'15px', padding:'0'}}>
               Register
            </Link>
            </p>
            </div>
        </div>
       </form>
    </div>
  )
}

export default Login