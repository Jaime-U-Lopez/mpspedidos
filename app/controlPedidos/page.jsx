import Image from 'next/image'
import styles from 'app/page.module.css'
import FormControlPedidos from '@/componentes/FormControlPedidos'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'


export default function Home() {
  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
      <div className={styles.navmenu}>
        <NavbarBotones />
    
      </div>
    
      <div className={styles.ventaderecha}>
      <FormControlPedidos />
  
      </div>
      
        
        </div>
        
    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
