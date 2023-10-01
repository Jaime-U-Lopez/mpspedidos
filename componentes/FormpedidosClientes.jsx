'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';


import Swal from 'sweetalert2';
export default function FormPedidos() {

  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    nit: '0',
    nombre: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // Estado para rastrear errores
  const [selectedRow, setSelectedRow] = useState(null);

  
  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia el valor de un campo del formulario
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)
  console.log(selectedRow)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error
    try {

      const response = await axios.get(`http://192.168.1.38:8082/apiPedidosMps/v1/clientes/${formData.nit}`);

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
      
      setData([response.data]); // Almacena los datos en un arreglo para que puedan ser mapeados
    } catch (error) {
      console.error(error);
      setError(true); // Establece el estado de error en true
      Swal.fire('Error', 'Cliente no registrado, intenta nuevamente!.', 'error');
    } finally {
      setIsLoading(false); // Establece isLoading en false después de la carga
      
    
    }
  };


  var imagen=  <Image 
  src="/img/icon-addClient.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>


  function handleRowClick(item) {
    // Your SweetAlert2 logic here
    Swal.fire({
      title: 'Cliente seleccionado',
      text: 'Cliente ingresado al pedido!',
      icon: 'success',
    });
  }
  
  

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
            value={formData.nit}
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
            value={formData.nombre}
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
            <Link href="https://www.mps.com.co/registro/distribuidor"  target="_blank">Registrarse</Link>
          </li>
 
          <li >
          <Link href="/pedidos/buscarProductos">Continuar Pedido</Link>
          </li>
        </ul>
      </form>
      <p>Clientes Encontrados : </p>

<table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>
          <tr  className='table-primary' >
            <th scope="col">N°</th>
            <th scope="col">Nit o CC </th>
            <th scope="col">Nombre comercial </th>   
            <th scope="col" >Correo electronico</th>
            <th scope="col" >seleccion Cliente</th>
          </tr>
        </thead>
       {
       isLoading ? (
        <p>Cargando...</p>
      ) : (
  <tbody>
    {data.map((item, index) => (
      <tr key={item.id} 
      onClick={() => setSelectedRow(item)}
      className={ selectedRow === item ? "selectedrow" : ''}
      >
        <th scope="row">{index + 1}</th>
        <td>{item.nit}</td>
        <td>{item.nombre}</td>
        <td>{item.correoElectronico}</td>
        <td onClick={()=>  handleRowClick(item)  } className='d-flex justify-content-center align-items-center'> {imagen} </td>
      </tr>
    ))}
  </tbody>
)}
  
  </table>
    </div>
  );
};