import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function NavbarBotones() {
  
  return (
 <div>

<ul>


 <li>
      <Link href="/">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente">Realizar Pedido</Link>
      </li>
      <li>
        <Link href="/controlPedidos">Crear Usuario</Link>
      </li>
      <li>
        <Link href="/admonWebSite">Administracion</Link>
      </li>
  
    </ul>
 </div>
   
    )
}
