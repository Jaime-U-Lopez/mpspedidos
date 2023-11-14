
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import FormPedidosfinal from '@/componentes/Formpedidosfinal'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import axios from 'axios';
import React, { useState , useEffect} from 'react'
import withAuth from '@/componentes/withAuth' 


const Home= ()=> {
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
export default withAuth(Home);