'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';




export default function FormAdmonPlanos({formulario}) {



  const [selectedFileProd, setSelectedFileProd] = useState(null);
  const [selectedFileClientes, setSelectedFileClientes] = useState(null);
  const [selectedFileUser, setSelectedFileUser] = useState(null);

  const handleFileChangeProd = (event) => {
    setSelectedFileProd(event.target.files[0]);
  };

  const handleFileChangeClientes = (event) => {
    setSelectedFileClientes(event.target.files[0]);
  };

  const handleFileChangeUser = (event) => {
    setSelectedFileUser(event.target.files[0]);
  };

  const handleFileUploadProd = async () => {
    handleFileUpload(selectedFileProd, 'productos');
  };

  const handleFileUploadClientes = async () => {
    handleFileUpload(selectedFileClientes, 'clientes');
  };

  const handleFileUploadUser = async () => {
    handleFileUpload(selectedFileUser, 'usuarios');
  };

  const handleFileUpload = async (file, endpoint) => {
   
    if (file) {
      const formData = new FormData();
      formData.append('archivo', file);
  
      try {

        Swal.fire({
          title: 'Cargando...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });



        const response = await axios.post(`http://localhost:8083/apiPedidosMps/v1/${endpoint}/cargar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        
          withCredentials: 'include',
        });
  

        Swal.close();

        console.log(response.data.mensaje)
     
        if (response.status >= 200 && response.status < 300) {
       
          Swal.fire(       'success', `Cargue exitoso: ${response.data.mensaje}`);


          Swal.fire({
            icon: 'success',
            title: `Cargue exitoso: ${response.data.mensaje}`,

          });


        } else {

          console.error('Error al cargar el archivo.');
          Swal.fire('Error', 'Error al cargar el archivo', 'error');
        }
      } catch (error) {
        // Manejar errores de red o del servidor
        console.error('Error al cargar el archivo:', error);
        Swal.fire('Error', `No se pudo cargar el archivo, error: ${error.mensaje}`, 'error');

      
        Swal.fire('Error', `No se pudo cargar el archivo, error: ${error.mensaje}`, 'error');
      }
    } else {
      console.error('Ningún archivo seleccionado.');
    }


  };

  return (
    <div className={` ${styles.FormPedidos} ,  ${styles.PlanoTexto}`}>
      <h2 className='mb-3 '> Administración Cargue de Archivos Planos </h2>

      <div   className={` ${styles.PlanoTexto}`}  >
        <h4 className= {` mb-3 `}   >Cargue Productos: </h4>
        <input  className='btn btn-success ml-3' type='file' onChange={handleFileChangeProd} />
        <button className='btn btn-primary ml-3' onClick={handleFileUploadProd}>Cargar Archivo</button>
      </div>

      <div>
        <h4 className='mb-3 mt-3'>Cargue Clientes: </h4>
        <input  className='btn btn-success ml-3' type='file' onChange={handleFileChangeClientes} />
        <button className='btn btn-primary ml-3' onClick={handleFileUploadClientes}>Cargar Archivo</button>
      </div>

      <div>
        <h4 className='mb-3 mt-3'>Cargue Usuarios: </h4>
        <input  className='btn btn-success ml-3' type='file' onChange={handleFileChangeUser} />
        <button className='btn btn-primary ml-3' onClick={handleFileUploadUser}>Cargar Archivo</button>
      </div>


    </div>



  );
}