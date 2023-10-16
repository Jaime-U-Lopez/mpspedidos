
"use client"
import React, { createContext, useContext, useReducer } from 'react';
import { useState, useEffect } from 'react';


const UserContext = createContext();

export function UserProvider({ children }) {



  const [state, dispatch] = useReducer(userReducer, { username: '' });

 

  return (
    <UserContext.Provider value={{ state, dispatch }}>
   {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    default:
      return state;
  }
}