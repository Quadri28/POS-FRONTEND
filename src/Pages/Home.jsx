import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Login from '../Components/Login'
import MainLayout from '../Components/MainLayout'
import pos from '../assets/Images/pos.jpg'


const Home = () => {
    const user =  localStorage.getItem('user')
    if (user){
            return <Navigate to="products"/> 
    } 
  return (
    <MainLayout>
        
        <div className='bg-light p-5 rounded-3'>
            <div className='text-center'>
            <h1 style={{fontWeight:'700'}}>Welcome to Asude </h1>
            <p>If you run into any issue, contact 081-xxx-xxx-xx</p>
            </div>
        <div className='row justify-content-between g-4 mt-4 align-items-center'>
            <div className='col-md-4'>
                <h3 style={{fontSize:'35px'}} className="text-center">Terminal <br/> POS</h3>
                <div>
                    <Login/>
                </div>
            </div>
            <div className='col-md-7'>
            <img src={pos} alt='' className='img-fluid rounded-3'/>
            </div>
        </div>
        </div>
        
    </MainLayout>
  )
    
}

export default Home