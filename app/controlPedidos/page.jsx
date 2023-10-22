
'use client';

import Image from 'next/image'
import styles from 'app/page.module.css'
import FormControlPedidos from '@/componentes/FormControlPedidos'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import ConsultaPedidosPorValor from '@/componentes/ConsultaPedidosPorValor'
import Layout from '@/componentes/Layout';
import { useState, useEffect } from 'react';

export default function Home() {






  return (
    <Layout> 
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotones />
    
      </div>
    
      <div className={styles.ventaderecha}>
      <FormControlPedidos   miProp="hola"  />
  
      </div>
      


        </div>
        
    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>


    </Layout> 
  )
}
