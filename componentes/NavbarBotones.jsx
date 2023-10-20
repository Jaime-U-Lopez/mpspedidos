import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'


export default function NavbarBotones() {
  

  const usernameMPS = 'usernameMPS';


  


  return (


<ul  >

      <li>
      <Link href="/">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente"  prefetch={false}>Realizar Pedido</Link>
      </li>
      <li>
        <Link href="/controlPedidos"  prefetch={false}>Control Pedidos</Link>
      </li>
      <li>
        <Link href="/admonWebSite"  prefetch={false}>Administracion</Link>
      </li>
  
    </ul>

   
    )
}
