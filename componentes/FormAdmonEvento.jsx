'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function FormAdmonEvento({ onEventCreate }) {


  const [eventName, setEventName] = useState('');
  const [eventoActual, setEventoActual] = useState({nombreEvento:""});


  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };


 
  useEffect(() => {
    handleSubmitGet()
   
   }, []); 
 
 
  const handleSubmitGet = async (e) => {

   
    let apiUrl = 'http://localhost:8083/apiPedidosMps/v1/eventos/1';
   
    try {
      const response = await axios.get(apiUrl);
      const dataInicial = response.data;
      setEventoActual(dataInicial);

    } catch (error) {
      console.error(error);
      setError(true); 
      Swal.fire('Error', 'La marca ingresada no registra en la base de datos, intenta nuevamente!.', 'error');

      if (error.response) {
        
        const responseData = error.response.data.message;
        console.log("Mensaje de error:", responseData); 
        console.log("Código de estado:", error.response.status); 
       
        setError(true); 
        Swal.fire('Error', 'No se pudo realizar la busqueda, error: ' + responseData, 'error');
      } else {
        console.log("Error sin respuesta del servidor:", error.message);
        setError(true); 
        Swal.fire('Error', 'No se pudo realizar la busqueda, Error sin respuesta del servidor: ' + error.message, 'error');
      }   
   
    } 


  };



  const handleSubmitPost = async () => {
    // let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/eventos/`;
    let apiUrl = `http://localhost:8083/apiPedidosMps/v1/eventos/`;

    const evento = { id: 1, nombreEvento: eventName };

    try {
      const response = await axios.post(apiUrl, evento);
      const dataInicial = response.data.message;
      console.log(dataInicial);
      // Corregir la respuesta de Swal.fire en el bloque try
      Swal.fire('Cambio Existoso', '', 'success');

      handleSubmitGet();
    } catch (error) {
      console.error(error);

      if (error.response) {
        const responseData = error.response.data.message;
        console.log("Mensaje de error:", responseData);
        console.log("Código de estado:", error.response.status);

        Swal.fire('Error', 'No se pudo guardar el Evento', 'error');
      } else {
        Swal.fire('Error sin respuesta del servidor:', error.message);
      }
    }
  };


  return (

    <div className={` ${styles.FormPedidos} `}    >

      <h2 className='mb-3 '> Administración Evento  </h2>
     

      <form>

      <div className="input-group">
      <span className="input-group-text">Nombre Evento Actual </span>    

        <input
            className="form-control "
            type="text"
            placeholder="Ingresa el nombre de Evento"
            name="evento"
          value={eventoActual.nombreEvento}

          />
   </div>
        <div className="input-group">
          <span className="input-group-text">Nuevo Nombre </span>

          <input
            className="form-control "
            type="text"
            placeholder="Ingresa el nombre de Evento"
            name="evento"
          value={eventName}
          onChange={handleEventNameChange}
          />
        </div>

      
        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="button"
         onClick={handleSubmitPost}>

        
          Cambiar el nombre
        </button>
        </div>
            
      </form>
      
    </div>
  );
};