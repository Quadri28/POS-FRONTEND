import React from 'react'
import { Navigate } from 'react-router-dom'

const RequiredAuth = ({children}) => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
        return <Navigate to='/' />
    }else{
  return(<div>{children}</div>)
  }
}

export default RequiredAuth