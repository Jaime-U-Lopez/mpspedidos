'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormPedidos() {


  var imagen=  <Image 
  src="/img/icon-addClient.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>

  return (


    <div class={` ${styles.FormPedidos} `}    >


      <h1 class='mb-3 '> Solicitud de Pedido  </h1>
      <h2 class='mb-3' > Buscar Cliente :    </h2>

      <form>

        <div class="input-group">
          <span class="input-group-text">Documento identificacion</span>

          <input
            class="form-control "
            type="number"
            placeholder="Ingresa el DNI"
            name="todoNombre"
            defaultValue="Tarea #01"
          />
        </div>

        <div class="input-group">
          <span class="input-group-text">Razon Social</span>

          <input
            class="form-control "
            type="number"
            placeholder="Nombre"
            name="todoNombre"
            defaultValue="Tarea #01"
          />
        </div>

        <div >
        <button
          class="btn w-100 mt-4 mb-3 btn-primary"
          type="submit"
        >
          Buscar
        </button>
        </div>
        
        
        <ul>
        <li >
            <Link href="https://www.mps.com.co/registro/distribuidor"  target="_blank">Registrarse</Link>
          </li>
 
          <li >
            <Link href="https://www.mps.com.co/registro/distribuidor"  target="_blank">Continuar pedido</Link>
          </li>
  
        </ul>

      </form>
      <p>Clientes Encontrados : </p>
      <table class="table   table-hover  table-bordered border-primary" >

        <thead>
    
          <tr  class='table-dark' >
            <th scope="col">N°</th>
            <th scope="col">Nit o CC </th>
            <th scope="col">Nombre comercial </th>
            <th scope="col" >Tipo</th>
            <th scope="col" >Representante legal</th>
            <th scope="col" >seleccion Cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
   
            <td> {imagen} </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td> {imagen} </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td> {imagen} </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};