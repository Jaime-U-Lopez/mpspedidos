import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'

import { images } from '@/next.config'


export default function NavbarBotones() {
  return (  


<nav  className={`${styles.navBar} navbar navbar-expand-lg navbar-light  `}>
  


  <div className="container-fluid w-100">
  <Image 
   src="/img/logo-mps.png"
   alt="Picture of the author"
   width={220/2}
   height={50}
 />

<h3 className="fw-bold mb-3 mt-3 " >      MPS Control de pedidos</h3>  

    <div className={` ${styles.navBar} w-50 collapse navbar-collapse`} id="navbarSupportedContent">
     
 
    <div className="col-auto">
    <label  className="visually-hidden">usuario</label>
    <input type="text" className="form-control " id="user" placeholder="Usuario"  disabled/>
    </div>

   <form className="d-flex">

    <button type="submit" className="btn btn-danger"> CERRAR SESION </button>
  
        
      </form>
    
    
    </div>
  </div>
</nav>

    )
}
