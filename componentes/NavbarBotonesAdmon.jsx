import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function NavbarBotones() {
  
  return (
 <div>

<ul>


 <li>
      <Link href="/home">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente">Realizar Pedido</Link>
      </li>
      <li>
      <Link href="/controlPedidos">Control Pedidos</Link>
      </li>
  
  
    </ul>
 </div>
   
    )
}
