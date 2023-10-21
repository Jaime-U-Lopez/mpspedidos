
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import FormPedidosfinal from '@/componentes/Formpedidosfinal'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import axios from 'axios';
import React, { useState , useEffect} from 'react'

export default function ConfirmarPedidos() {





  useEffect(() => {

 
    axios
      .get(`http://localhost:8082/apiPedidosMps/v1/pedidos/orden/1020755461PrSD`)
      .then((response2) => {
        

        const dataFromApi = response2.data;
   
      
        



    })

      .catch((error) => {
        console.error(error);

      });
  }, []); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas


    







  return (
    
    <main className={styles.main}>
  
      <Navbar/>   
      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotones />  
      </div>
    
      <div className={styles.ventaderecha}>
      <FormPedidosfinal />
 
      </div>
      
        </div>
        
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
