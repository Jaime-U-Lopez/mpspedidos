
"use client"
import Image from 'next/image'
import styles from 'app/page.module.css'
import FormAdmon from '@/componentes/FormAdmonUser'
import NavbarBotonesAdmon from '@/componentes/NavbarBotonesAdmon'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import BotonesAdmon from '@/componentes/BotonesAdmon'
import { useState } from 'react'
import FormAdmonEvento from '@/componentes/FormAdmonEvento'
import FormAdmonPlanos from '@/componentes/FormAdmonPlanos'


export default function Home() {



const [opcionEvento,setOpcionEvento]= useState(false)
const [opcionUsuarios,setOpcionUsuarios]= useState(false)
const [opcionPlanos,setOpcionPlanos]= useState(false)

const habilitarEvento=()=>
{

  
  setOpcionPlanos(false)
  setOpcionUsuarios(false)
  setOpcionEvento(true)

}


const habilitarUsuarios=()=>{

  setOpcionPlanos(false)
  setOpcionEvento(false)
  setOpcionUsuarios(true)
}

const habilitarPlanos=()=>{

  setOpcionEvento(false)
  setOpcionUsuarios(false)
  setOpcionPlanos(true)
}




  return (
   

    <main className={styles.main}>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotonesAdmon />
      </div>
      <div >
        <BotonesAdmon habilitarEvento={habilitarEvento} habilitarUsuarios={habilitarUsuarios}   habilitarPlanos={habilitarPlanos}  />
      </div>

      {opcionUsuarios? <div className={styles.ventaderecha}>
        <FormAdmon />
      </div>:<p></p>   }
      
      {opcionEvento? <div className={styles.ventaderecha}>
      <FormAdmonEvento/>
      </div>:<p></p>   }

      {opcionPlanos? <div className={styles.ventaderecha}>
      <FormAdmonPlanos/>
      </div>:<p></p>   }

    

    </div>
    <div className={styles.flooter}>
      <Flooter />
    </div>
  </main>
)

}
