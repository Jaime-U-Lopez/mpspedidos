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


    <div className={` ${styles.FormPedidos} `}    >


      <h1 className='mb-3 '> Solicitud de Pedido  </h1>
      <h2 className='mb-3' > Buscar Cliente :    </h2>

      <form>

        <div className="input-group">
          <span className="input-group-text">Documento identificacion</span>

          <input
            className="form-control "
            type="number"
            placeholder="Ingresar el Nit o CC"
            name="todoNombre"
          
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Razon Social</span>

          <input
            className="form-control "
            type="text"
            placeholder="Nombre"
            name="nombreComercial"

          />
        </div>

        <div >
        <button
          className="btn w-100 mt-4 mb-3 btn-primary"
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
          <Link href="/pedidos/buscarProductos">Continuar Pedido</Link>
          </li>
  
        </ul>

      </form>
      <p>Clientes Encontrados : </p>
      <table className="table   table-hover  table-bordered border-primary" >

        <thead>
    
          <tr  className='table-dark' >
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
   
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td>@twitter</td>
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};