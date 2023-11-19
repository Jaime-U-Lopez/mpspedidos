
"use client"
import { useUser } from "./UserContext";

import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import {useContext, useState} from 'react'
import { images } from '@/next.config'
import { useEffect } from "react";

import axios from 'axios';
export default function NavbarBotones() {



  const [datoUser, setDatoUser] = useState();
  const [Autorizado, setAutorizado] = useState();

  const usernameMPS = 'usernameMPS';

  useEffect(() => {


    if (!datoUser) {
      sessionStorage.setItem('usernameMPS2', 'defaultValue');

      var datoUserDefaul = 'defaultValue';
    
    }
    var dato= sessionStorage.getItem('usernameMPS');

validacionRol()

  }, []);


const cerrarSeccion = ()=>{

  const usernameMPS = 'usernameMPS';
  sessionStorage.removeItem(usernameMPS);
  sessionStorage.removeItem('qwqetd');

}


const validacionRol = async () => {
  var nombre = sessionStorage.getItem('usernameMPS');


  try {
    const response = await axios.get(`http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
    
    //const response = await axios.get(`http://localhost:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
    const info = response.data;

    setDatoUser(info.nombreUsuario)
    if(info.rol==="Cartera") {
      setAutorizado(false)

    }
    var nombreUsu= info.nombreUsuario
   
   
  } catch (error) {
    console.error(error);
  }
};




  return (  

  <nav  className={`${styles.navBar} navbar navbar-expand-lg navbar-light `}>
  

  <div className="container-fluid w-100">
  <Image 
   src="/img/logo-mps.png"
   alt="Picture of the author"
   width={220/2}
   height={50}
   loading="lazy"
/>

<h3 className="fw-bold mb-3 mt-3 " >      MPS Control de pedidos</h3>  

    <div className={` ${styles.navBar} w-50 collapse navbar-collapse`} id="navbarSupportedContent">
     
 
    <div className="col-auto">
    <label  className="visually-hidden">usuario</label>
    <input type="text" className="form-control "
    value={datoUser}
    id="user" placeholder="Usuario"  disabled/>
    </div>

   <form className="d-flex">
  
      <Link href="/login" onClick={cerrarSeccion}  prefetch={false}
      
      className={styles.btn}
      >  Cerrar sesión</Link>
      </form>
    

    </div>
  </div>
</nav>

    )
}
