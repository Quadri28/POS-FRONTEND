import React, { useContext, useRef, } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../Components/axios';
import { UserContext } from '../Components/Context';

const Register = () => {
    
  const nameRef = useRef()
  const mailRef =useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {setUser, setToken} = useContext(UserContext)

    const submitHandler = (e)=>{
        e.preventDefault();
        const payload ={
          name: nameRef.current.value,
          mail: mailRef.current.value,
          password: passwordRef.current.value,
          confirm_password: confirmPasswordRef.current.value
        }
        console.log(payload)
        axiosClient.post( '/users', payload)
        .then(({data})=>{
          setUser(data.user)
          setToken(data.token)
        })
        .catch( err =>{
          const response = err.response;
          if (response && response.status ===422) {
            console.log(response.data.errors)
          }
        })
    }

  

  return (
   
    <div className='register-vector px-5 py-3'>
       <h3 style={{fontWeight:'bold'}} className="text-white text-center mt-2">Register Here</h3>
       <form onSubmit={submitHandler}>
        <div className='d-flex flex-column gap-4 mt-3' >
        <div> 
            <label className='text-white'>User Name:</label> <br/>
            <input type='text' required ref={nameRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div> 
            <label className='text-white'>User Email:</label> <br/>
            <input type='text' required ref={mailRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div>
             <label className='text-white'>Password: </label> <br/>
            <input type='password' required ref={passwordRef} 
            style={{borderRadius:'3rem'}} className="p-2  mt-1 w-100"/>
            </div>
            <div>
             <label className='text-white'>Confirm Password: </label> <br/>
            <input type='password' required ref={confirmPasswordRef}  
            style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='row g-2 py-2'>
            <button type='submit' style={{backgroundColor:'#c1ade4', borderRadius:'3rem'}} 
            className="btn btn-lg text-white ">
                Register
            </button> 
                 <p className='text-center text-white'>Have an account? 
                 <Link to="/" className="btn btn-lg text-white "> login </Link>
                </p>
            
            </div>
        </div>
       </form>
       </div>
  )
}

export default Register