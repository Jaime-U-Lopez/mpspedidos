import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function NavbarBotones() {
  
  return (


<ul  >

      <li>
      <Link href="/">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente">Realizar Pedido</Link>
      </li>
      <li>
        <Link href="/controlPedidos">Control Pedidos</Link>
      </li>
      <li>
        <Link href="/admonWebSite">Administracion</Link>
      </li>
  
    </ul>

   
    )
}
