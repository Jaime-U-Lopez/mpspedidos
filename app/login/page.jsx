import Image from 'next/image'
import styles from 'app/page.module.css'

import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import { UserProvider } from '@/componentes/UserContext'
import FormLogin from '@/componentes/FormLogin'

const Login =({ Component, pageProps })=> {

  
  return (
    <UserProvider>
    <main className={styles.main}>
    
 
     
      <div className={styles.ventaderecha}>
    
      <FormLogin  {...pageProps} />

  
      </div>
      
        

    
      
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
    </UserProvider>
  )
}
export default Login;