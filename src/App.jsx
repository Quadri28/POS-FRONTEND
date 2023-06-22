import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/NavBar';
import Register from './Pages/Register';
import Products from './Pages/Products';
import RequiredAuth from './Components/RequiredAuth';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<RequiredAuth> <Products/> </RequiredAuth> }/>
      </Routes>
    </div>
  )
}

export default App
