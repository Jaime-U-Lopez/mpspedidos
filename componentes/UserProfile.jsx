"use client"
import { useUser } from "./UserContext";


export default function UserProfile() {
    const { dispatch } = useUser();
  
    const handleSaveUsername = (newUsername) => {
      // Guardar el nombre de usuario en el estado global
      dispatch({ type: 'SET_USERNAME', payload: newUsername });
    }
  
  }

