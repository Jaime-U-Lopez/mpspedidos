'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormPedidos() {


  var imagen=  <Image 
  src="/img/icons8-aprobar-48.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>

  var denegar=  <Image 
  src="/img/icons8-denegar-100.png"
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
  return (


    <div className={` ${styles.FormPedidos} `}    >


      <h1 className='mb-3 '> Control Pedidos y autorizaciones  </h1>
      <h2 className='mb-3' > Buscar Pedido  :    </h2>

      <form>



      <div className="input-group">
          <span className="input-group-text">Orden pedido </span>

          <input
            className="form-control "
            type="number"
            placeholder="Numero de orden "
            name="todoNombre"
          
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Documento DNI </span>

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
            placeholder="Nombre comercial "
            name="nombreComercial"

          />
        </div>

        
        


        <div className="input-group">
          <span className="input-group-text">Fecha orden  </span>

          <input
            className="form-control "
            type="date"
            placeholder="Ingresar el Nit o CC"
            name="todoNombre"
          
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Estado Pedido   </span>

          <select defaultValue="Seleccione el Estado"   className="form-select form-select-lg " aria-label=".form-select-lg example">
   
   <option value="1">Seleccione el Estado</option>
   <option value="2">Pendiente Aprobación </option>
   <option value="3">Aprobado</option>
   <option value="3">Cancelado</option>
  </select>
     
        </div>
        

        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="submit"
        >
          Buscar
        </button>

        
        </div>
     

     

      </form>
      <p>Pedidos Encontrados : 10 de 10  </p>
      {imageIzquierda}
     {imagenDerecha}
      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>
    
          <tr  className='table-primary' >
            <th scope="col">N°</th>
            <th scope="col">Orden </th>
            <th scope="col">Nit o CC </th>
            <th scope="col">Nombre comercial </th>
            <th scope="col" >Representante legal</th>
            <th scope="col" >valor </th>
            <th scope="col" >Iva  </th>
            <th scope="col" >Neto a Pagar </th>
            <th scope="col" >Forma de pago   </th>
            <th scope="col" >Saldo Credito   </th>
            <th scope="col" >Estado   </th>
            <th scope="col" >Denegar   </th>
            <th scope="col" >Aprobar </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>cancelado</td>

            <td className=' justify-content-center align-items-center'> {denegar} </td>
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>

            
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>cancelado </td>
            <td>cancelado </td>
            <td className=' justify-content-center align-items-center'> {denegar} </td>
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>   
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>2</td>   
             <td>2</td>
            <td className=' justify-content-center align-items-center'> {denegar} </td>
            <td className='d-flex justify-content-center align-items-center'> {imagen} </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
};