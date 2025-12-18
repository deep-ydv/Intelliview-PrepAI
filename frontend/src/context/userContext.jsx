import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
export const UserContext=createContext();
const UserProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [loading, setLoading] = useState(true);

  // const navigate=useNavigate();
    // ✅ Run this ONCE globally

    // Every time the user logs in, logs out, or refreshes the page, it updates your user state.
      useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      // navigate("/dashboard");
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  return (
  <UserContext.Provider value={{user,setUser}}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider;