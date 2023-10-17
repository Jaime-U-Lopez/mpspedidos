import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function BotonesAdmon( { habilitarEvento, habilitarUsuarios, habilitarPlanos }) {
  
  return (




<div  className={styles.admonWeb}>

<h1>Administración WebSite</h1>


<div  className={styles.btnAdmon}>


<button onClick={habilitarEvento}>Evento</button>
 <button onClick={habilitarUsuarios}>Usuarios</button>
 <button onClick={habilitarPlanos}>Planos</button>



</div>


</div>
   
    )
}
