
'use client';

import Image from 'next/image'
import styles from 'app/page.module.css'
import FormControlPedidos from '@/componentes/FormControlPedidos'

import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'

import Layout from '@/componentes/Layout';
import { useState, useEffect } from 'react';
import NavbarBotonesControlPed from '@/componentes/NavbarBotonesControlPed';
import withAuth from '@/componentes/withAuth' 

const Home=()=> {


  return (
    <Layout> 
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotonesControlPed />
    
      </div>
    
      <div className={styles.ventaderecha}>
      <FormControlPedidos  />
  
      </div>
      
      </div>
        
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>


    </Layout> 
  )
}
export default  withAuth(Home);