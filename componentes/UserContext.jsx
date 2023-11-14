
"use client"
import React, { createContext, useContext, useReducer } from 'react';
import { useState, useEffect } from 'react';


const UserContext = createContext();

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState();
  const [state, dispatch] = useReducer(userReducer, { username: ""});
  
  const login = async (username, password) => {
  
        if (username) {

          sessionStorage.setItem('qwqetd', "erdfy"); 


          dispatch({ type: 'SET_USERNAME', payload: { username } });

    } else {
      throw new Error('Credenciales inválidas');
    }

  };
  const logout = () => {

    setUser(null);
  };
  
 



  return (
    <UserContext.Provider value={{state, dispatch , user, setUser, login}}>
   {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un UserProvider');
  }
  return context;
}

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
}