'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import FormpedidosProductosUpdate from '@/componentes/FormpedidosProductosUpdate'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
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
      <FormpedidosProductosUpdate />
 
      </div>
      
        </div>
        
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
export default withAuth(Home);