import React, { useContext } from 'react'
import Context, { UserContext } from './Components/Context'
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/NavBar';
import Register from './Pages/Register';
import Products from './Pages/Products';

function App() {
  const {user} = useContext(UserContext)
  return (
    <Context>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/products' element={<Products/>}/>
      </Routes>
    </div>
    </Context>
  )
}

export default App
