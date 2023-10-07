import Image from 'next/image'
import styles from './page.module.css'
import FormPedidosClientes from '@/componentes/FormpedidosClientes'
import NavbarBotonesHome from '@/componentes/NavbarBotonesHome'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import ActiveLink from '@/componentes/ActiveLink'
import ProductForm from '@/componentes/formulario'


export default function Home() {


    


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
