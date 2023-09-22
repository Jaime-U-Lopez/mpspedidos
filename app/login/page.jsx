import Image from 'next/image'
import styles from 'app/page.module.css'
import FormLogin from '@/componentes/FormLogin'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'


export default function Home() {
  return (
    
    <main className={styles.main}>
    
 

     
      <div className={styles.ventaderecha}>
      <FormLogin />
  
      </div>
      
        

    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
