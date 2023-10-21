import Image from 'next/image'
import styles from 'app/page.module.css'
import FormControlPedidos from '@/componentes/FormControlPedidos'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import FormAdmonUser from '@/componentes/FormAdmonUser'


export default function Home() {





  return (
    
    <main className={styles.main}>
    
      <Navbar/>   

      <div className={styles.container}>
        
    
    
      <div className={styles.ventaderecha}>

      </div>
      
      <FormAdmonUser/>

        </div>
        
    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
