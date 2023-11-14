"use client"
import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ValidadorRol from './ValidadorRol';

export default function NavbarBotones() {
  

  return (


<ul  >

      <li>
      <Link href="/home">Home</Link>
      </li> 
      
      <li>
        <Link href="/pedidos/buscarCliente"  prefetch={false}>Realizar Pedido</Link>
      </li>
      <li>
        <Link href="/controlPedidos"  prefetch={false}>Control Pedidos</Link>
      </li>
      <li>
      <ValidadorRol/>
      </li>
      <li>
        <Link href="/consultas"  prefetch={false}>Acumulado</Link>
      </li>
  
    </ul>

   
    )
}
