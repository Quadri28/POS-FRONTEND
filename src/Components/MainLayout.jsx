import React from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = ({children}) => {
  return (
    <main>
        <>
            {children}
         </>
         <ToastContainer/>
    </main>
  )
}

export default MainLayout