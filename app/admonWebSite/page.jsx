import Image from 'next/image'
import styles from 'app/page.module.css'
import FormAdmon from '@/componentes/FormAdmon'
import NavbarBotonesAdmon from '@/componentes/NavbarBotonesAdmon'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'


export default function Home() {
  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotonesAdmon />    
      </div>
    
      <div className={styles.ventaderecha}>
      <FormAdmon/>
  
      </div>
      
        
        </div>
        
    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
