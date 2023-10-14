import Image from 'next/image'
import styles from 'app/page.module.css'
import FormpedidosProductosUpdate from '@/componentes/FormpedidosProductosUpdate'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import ActiveLink from '@/componentes/ActiveLink'


export default function Home() {
  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotones />
    
      </div>
        
      <ActiveLink></ActiveLink>
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
