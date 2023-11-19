"use client"
import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ValidadorRol() {
  



  useEffect(() => {

    validacionRol()
  }, []);


  const [Autorizado, setAutorizado] = useState(false);


  const validacionRol = async () => {
    var nombre = sessionStorage.getItem('usernameMPS');
  
  
    try {
      const response = await axios.get(`http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
      
     // const response = await axios.get(`http://localhost:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
      const info = response.data;
  
  
      if(info.rol==="Administrador") {
        setAutorizado(true)
      }
      var nombreUsu= info.nombreUsuario
     
   
    } catch (error) {
      console.error(error);
    }
  };
  

  return (


      <li>
      {Autorizado ? <Link href="/admonWebSite" prefetch={false}>Administración</Link> : <p></p>}
      </li>
     
  


   
    )
}
