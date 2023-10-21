'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';
import PaginationControls from './PaginationControls';

import Swal from 'sweetalert2';


export default function FormPedidos() {

  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    nit: '0',
    nombre: '',
    idCliente: '0',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // Estado para rastrear errores
  const [selectedRow, setSelectedRow] = useState(null);
  const itemsPerPage = 5; // Cantidad de elementos por página
  const [pageSize] = useState(10);
const [page, setPage] = useState(1);
const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const dataToShow = data.slice(startIndex, endIndex);




  const [cliente, setCliente] = useState(0);
  

  const clientesEncontrados= data.length;
  const clientesActuales= dataToShow.length;

  const goToPage = (page) => {
    setCurrentPage(page);
  };


  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia el valor de un campo del formulario
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error


    let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/clientes/`;

    if (formData.nit >= 0 && formData.nombre == '') {
      apiUrl += `nit/?nit=${formData.nit}`;
    }
    if (formData.nombre != '' && formData.nit == 0) {
      apiUrl += `nombre/?nombre=${formData.nombre}`;
    } else if (formData.nombre != '' && formData.nit != 0)
      apiUrl += `nombre/?nombre=${formData.nombre}&nit=${formData.nit}`;

    try {
      const response = await axios.get(apiUrl);
     

      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic afuera
        onBeforeOpen: () => {
          Swal.showLoading(); // Muestra un spinner de carga
        },
      });
      setTimeout(() => {
        setIsLoading(false); // Cambia isLoading a falso cuando la página ha terminado de cargar
        Swal.close(); // Cierra la alerta de carga

      }, 500);


      const dataInicial = response.data;
      setData(dataInicial);
    } catch (error) {
      console.error(error);
      setError(true); // Establece el estado de error en true
      Swal.fire('Error', 'Cliente no registrado, intenta nuevamente!.', 'error');
    } finally {
      setIsLoading(false); // Establece isLoading en false después de la carga

    }
  };


  var imagen = <Image
    src="/img/icon-addClient.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>


  function seleccionarCliente(item) {

    setCliente(item.nit);
    Swal.fire({
      title: 'Cliente seleccionado',
      text: `Cliente ${item.nombre} ingresado al pedido!`,
      icon: 'success',
    });
  }


  var imageIzquierda = <Image
    src="/img/icons8-flecha-izquierda.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>
  var imagenDerecha = <Image
    src="/img/icons8-flecha-derecha-64.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>



  return (


    <div className={` ${styles.FormPedidos} `}    >

      <h1 className='mb-3 '> Solicitud de Pedido  </h1>
      <h2 className='mb-3' > Buscar Cliente :    </h2>

      <form onSubmit={handleSubmit}>

        <div className="input-group">

          <span className="input-group-text">Documento DNI</span>

          <input
            className="form-control "
            type="number"
            placeholder="Ingresar el Nit o CC"
            name="nit"
            //value={formData.nit}
            onChange={handleChange}


          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Razon Social</span>

          <input
            className="form-control "
            type="text"
            placeholder="Nombre"
            name="nombre"
            // value="felipe"
            onChange={handleChange}

          />
        </div>
        <div >
          <button
            className="btn w-100 mt-4 mb-3 btn-primary"
            type="submit"
            disabled={isLoading} // Deshabilita el botón durante la carga
          >
            Buscar
          </button>
        </div>
        <ul>
          <li >
            <Link href="https://www.mps.com.co/registro/distribuidor" target="_blank">Registrarse</Link>
          </li>

        {cliente!=0? (
       
           <li>
              <Link href={`/pedidos/buscarProductos/${encodeURIComponent(cliente)}`} scroll={false} prefetch={false}>Continuar Pedido</Link>
          </li> 
          ):( 
            <li>
            <Link href={`/pedidos/buscarCliente`} scroll={false} prefetch={false}>Continuar Pedido</Link>
          </li> 
          )}
        </ul>
      </form>


      <p>Clientes Encontrados : {clientesActuales} de   {clientesEncontrados}   </p>
      <div className={styles.btnAtrasAdelante}>

      <button       
          onClick={() => setPage(page - 1)} disabled={page === 1}
          >
          {imageIzquierda}
        </button>
        <button
        
        onClick={() => setPage(page + 1)} disabled={endIndex >= data.length}
        
        >
          {imagenDerecha}
        </button>

      </div>

      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>
          <tr className={'table-primary text-center'} >
            <th scope="col">N°</th>
            <th scope="col">Nit o CC </th>
            <th scope="col">Nombre comercial </th>
            <th scope="col" >Correo electronico</th>
            <th scope="col" >Seleccion Cliente</th>
          </tr>
        </thead>
        {
          isLoading ? (
            <p>Cargando...</p>
          ) : (
            <tbody>
              {dataToShow.map((item, index) => (
                <tr  key={item.codigo}
                  onClick={() => setSelectedRow(item)}
                  className={selectedRow === item ? ("selectedrow",'text-center') : 'text-center'}
                >
                <th scope="row">{startIndex + index + 1}</th>
                  <td name="idCliente">{item.nit}</td>
                  <td>{item.nombre}</td>
                  <td>{item.correoElectronico}</td>
                  <td onClick={() => seleccionarCliente(item)} className='d-flex justify-content-center align-items-center'> {imagen} </td>
                </tr>
              ))}
            </tbody>
          )}


      </table>


    </div>
  );
};