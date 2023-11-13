import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function NavbarBotonesControlPed() {
  

  const usernameMPS = 'usernameMPS';


  


  return (


<ul  >

      <li>
      <Link href="/home">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente"  prefetch={false}>Realizar Pedido</Link>
      </li>
  
      <li>
        <Link href="/admonWebSite"  prefetch={false}>Administracion</Link>
      </li>
      <li>
        <Link href="/consultas"  prefetch={false}>Acumulado</Link>
      </li>
  
    </ul>

   
    )
}
