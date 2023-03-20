import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <header>
        <nav className='navbar navbar-light text-white p-4' style={{backgroundColor:'#c1ade4'}}>
        <div className='container-fluid'>
        <Link to='/' className='text-white ' style={{fontSize:'30px'}}>
            Asude
        </Link>
        </div>
        </nav>
    </header>
    </div>
  )
}

export default Navbar