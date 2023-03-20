
import React, {useState } from 'react'

export const UserContext = React.createContext({});

const Context = ({children}) => {
    const [user, setUser] = useState({})

  return (
    <UserContext.Provider value={{
    
    setUser,
    user,
    }}>
    
        {children}
    </UserContext.Provider>
  )
}

export default Context