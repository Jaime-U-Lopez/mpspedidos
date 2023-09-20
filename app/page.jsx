import Image from 'next/image'
import styles from './page.module.css'
import FormPedidosClientes from '@/componentes/FormpedidosClientes'
import NavbarBotonesHome from '@/componentes/NavbarBotonesHome'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'


export default function Home() {
  return (
    
    <main class={styles.main}>
    
      <Navbar/>   

      <div class={styles.container}>
        
      <div class={styles.navmenu}>
        <NavbarBotonesHome />
    
      </div>
    
      <div class={styles.ventaderecha}>
      <FormPedidosClientes />
  
      </div>
      
        
        </div>
        
    
      
<div class={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
