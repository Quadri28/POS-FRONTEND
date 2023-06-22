import React, { useEffect, useRef, useState, } from 'react'
import { Link } from 'react-router-dom';
import axios from '../Components/axios';
import Select from 'react-select'

const Register = () => {
  const options = [
    { value: 0, label: 'SoftwareAdmin'},
    { value: 1, label: 'Admin' },
    { value: 2, label: 'PosUser' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const phoneRef = useRef()
  const mailRef =useRef()
  const pinRef =useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

    const submitHandler = (e)=>{
        e.preventDefault();
        const savedUser = localStorage.getItem('user');
        const payload ={
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          phone_number: phoneRef.current.value,
          email: mailRef.current.value,
          pin: pinRef.current.value,
          password: passwordRef.current.value,
          confirm_password: confirmPasswordRef.current.value,
          store_id : JSON.parse(savedUser).store_id,
          user_id : JSON.parse(savedUser).user_id,
          role: selectedOption.value
        }
        
        axios.post( '/users', payload, { 
          headers:{'Accept': 'application/json',
           'Content-Type': 'application/json', 
           'Authorization': `Bearer ${JSON.parse(savedUser).token}`},
        } )
        .then((resp)=>{
          console.log(resp)
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
        <div className='row justify-content-between mt-3 align-items-center g-3' >
        <div className='col-md-6'> 
            <label className='text-white'>First Name:</label> <br/>
            <input type='text' required ref={firstNameRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'> 
            <label className='text-white'>Last Name:</label> <br/>
            <input type='text' required ref={lastNameRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'> 
            <label className='text-white'>Phone Number:</label> <br/>
            <input type='text' required ref={phoneRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'> 
            <label className='text-white'>User Email:</label> <br/>
            <input type='text' required ref={mailRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'> 
            <label className='text-white'>User Pin:</label> <br/>
            <input type='text' required ref={pinRef}
             style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'>
             <label className='text-white'>Password: </label> <br/>
            <input type='password' required ref={passwordRef} 
            style={{borderRadius:'3rem'}} className="p-2  mt-1 w-100"/>
            </div>
            <div className='col-md-6'>
             <label className='text-white'>Confirm Password: </label> <br/>
            <input type='password' required ref={confirmPasswordRef}  
            style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100"/>
            </div>
            <div className='col-md-6'>
             <label className='text-white'>Role: </label> <br/>
            <Select type='text' defaultValue={selectedOption} required onChange={setSelectedOption} 
            options={ options} 
            style={{borderRadius:'3rem'}} className="p-2 mt-1 w-100 text-dark"/>
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