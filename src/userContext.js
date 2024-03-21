import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready,setready] = useState(false)
  useEffect(() => {
    if (!user) {
      axios.get('/profile')
        .then(userData => {
          setUser(userData.data); 
          setready(true)
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user,setUser }}>
      {children}
    </UserContext.Provider>
  );
};
