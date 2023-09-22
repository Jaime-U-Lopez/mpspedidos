'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormPedidosProductos() {

  
var totalProductos=0;
var totalProductosEnCarrito=0;


  var imagen=  <Image 
  src="/img/icon-addProdc.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>

var imageIzquierda=<Image 
src="/img/icons8-flecha-izquierda-64 (1).png"
alt="Picture of the author"
width={80/2}
height={50}></Image>
var imagenDerecha=<Image 
src="/img/icons8-flecha-derecha-64.png"
alt="Picture of the author"
width={80/2}
height={50}></Image>

var imagenCarrito=<Image 
src="/img/icons8-carrito-de-compras.gif"
alt="Picture of the author"
width={80/2}
height={50}></Image>


  return (


    <div className={` ${styles.FormPedidos} `}    >

      <div className={styles.ajusteCarrito} >

      <h1 className='mb-3 '> Solicitud de Pedido  </h1>
      <p> {imagenCarrito} = {totalProductosEnCarrito}</p>  
        
      </div>
      
      <h2 className='mb-3' > Seleccionar Articulos :    </h2>

      <form>

        <div className="input-group">
          <span className="input-group-text">Marca </span>

          <select value="Seleccione la marca"   className="form-select form-select-lg " aria-label=".form-select-lg example">
   
        <option value="1">Seleccione la marca</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
       </select>
        </div>


        <div className="input-group">
          <span className="input-group-text">Categoria </span>

          <select value="Seleccione la Categoria (opcional)"  className="form-select form-select-lg " aria-label=".form-select-lg example">
       
        <option value="1">Seleccione la Categoria (opcional)</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
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
            <Link href="#" >Continuar pedido</Link>
          </li>
  
        </ul>

      </form>
      <p>Productos Encontrados : 10 de   {totalProductos}   </p>   
     {imageIzquierda}
     {imagenDerecha}
      <table className="table   table-hover  table-bordered border-primary" >

        <thead>
    
          <tr  className='table-dark' >
            <th scope="col">N°</th>
            <th scope="col">Codigo </th> 
             <th scope="col">Numero  de parte </th>
            <th scope="col">Nombre Articulo </th>
            <th scope="col" >Categoria </th>
            <th scope="col" >Descripción </th>
            <th scope="col" >Color </th>
            <th scope="col" >Tipo de Negocio </th>
            <th scope="col" >Valor  </th>
            <th scope="col" >Clasificación tributaria </th>
            <th scope="col" >Ingresar al Carrito </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
       
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td>@mdo</td> 
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};