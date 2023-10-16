'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormPedidos() {


  var imagen=  <Image 

  src="/img/icons8-basura-llena-100.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>
  return (


    <div className={` ${styles.FormPedidos} `}    >


      <h1 className='mb-3 '> Administración WebSite  </h1>
      <h2 className='mb-3' > Administración de usuarios :    </h2>

      <form>

        <div className="input-group">
          <span className="input-group-text">Nombre usuario</span>

          <input
            className="form-control "
            type="text"
            placeholder="Ingresa el nombre de usuario"
            name="nombre"
          
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Password</span>

          <input
            className="form-control "
            type="password"
            placeholder="Ingresa el Password"
            name="password"

          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Rol</span>

          <select defaultValue="Seleccione el Estado"   className="form-select form-select-lg " aria-label=".form-select-lg example">
   
   <option value="1">Seleccione el Rol</option>
   <option value="2">Administrador </option>
   <option value="3">Cartera</option>
   <option value="4">Comercial</option>
   <option value="4">Ventas</option>

  </select>
        </div>
        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="submit"
        >
          Crear
        </button>
        </div>
      
        <div >
        <button
          className="btn w-50 mt-2 mb-3 btn-danger"
          type="button"
        >
          Resetear Password
        </button>
        </div>
      
      </form>
      <p>Usuarios Creados  : </p>
      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>
    
          <tr  className='table-primary' >
            <th scope="col">N°</th>
            <th scope="col">Nombre usuario</th>
            <th scope="col">Rol </th>
            <th scope="col" >Eliminar</th>  
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
              <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>@twitter</td>
            <td>@twitter</td>
              <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};