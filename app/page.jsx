
'use client';
import Image from 'next/image'
import styles from './page.module.css'
import FormPedidosClientes from '@/componentes/FormpedidosClientes'
import NavbarBotonesHome from '@/componentes/NavbarBotonesHome'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import ActiveLink from '@/componentes/ActiveLink'
import ProductForm from '@/componentes/formulario'
import Formulario from '@/componentes/formulariopruebas'
import {useState, useEffect} from 'react';

import axios from 'axios';





export default function Home({cliente}) {




  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenu}>
      <NavbarBotonesHome />
      </div>
    
      <div className={styles.ventaderecha}>
     


      </div>
        
        </div>
      
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
