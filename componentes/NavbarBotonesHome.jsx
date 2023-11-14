import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ValidadorRol from './ValidadorRol';

const NavbarBotones = () => {





  return (
    <div>
      <ul>
        <li>
          <Link href="/pedidos/buscarCliente">Realizar Pedido</Link>
        </li>
        <li>
          <Link href="/controlPedidos">Control Pedidos</Link>
        </li>
        <li>
        <ValidadorRol/>
        </li>
      </ul>
    </div>
  );
};

export default NavbarBotones;