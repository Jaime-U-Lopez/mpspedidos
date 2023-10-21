import Image from 'next/image'
import styles from 'app/page.module.css'
import FormPedidosProductos from '@/componentes/FormpedidosProductos'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'



export default function Home() {
  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotones />
    
      </div>
        

      <div className={styles.ventaderecha}>
      <FormPedidosProductos />
 
      </div>
      
        </div>
        
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
