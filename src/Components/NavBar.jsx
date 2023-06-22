import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {

const navigate = useNavigate();

const handleLogout = ()=>{
  localStorage.removeItem('user')
  navigate('/')
}

const savedUser = localStorage.getItem('user');
  return (
    <div>
        <header>
        <nav className='navbar navbar-light text-white p-4' style={{backgroundColor:'#c1ade4'}}>
        <div className='container-fluid'>
        <Link to='/' className='text-white ' style={{fontSize:'30px'}}>
            Asude
        </Link>
    { savedUser ? 
        <button to='/products' className='btn btn-danger btn-lg'  onClick={handleLogout}>
          Logout
        </button> :
        ''
}
        </div>
        </nav>
    </header>
    </div>
  )
}

export default Navbar