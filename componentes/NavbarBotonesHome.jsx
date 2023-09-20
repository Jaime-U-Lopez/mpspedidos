import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function NavbarBotones() {
  
  return (
 <div>

<ul>

     
      <li>
        <Link href="/pedidos">Realizar Pedido</Link>
      </li>
      <li>
        <Link href="/controlPedidos">Control Pedidos</Link>
      </li>
      <li>
        <Link href="/admonWebSite">Administracion</Link>
      </li>
  
    </ul>
 </div>
   
    )
}
