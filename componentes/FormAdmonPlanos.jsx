'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import DownloadExcelButton from './DownloadExcelButton';
import axios from 'axios';
import Swal from 'sweetalert2';
import { errorToJSON } from 'next/dist/server/render';
export default function FormAdmonPlanos({ formulario }) {


  const [selectedFileProductos, setSelectedFileProductos] = useState(null);
  const [selectedFileClientes, setSelectedFileClientes] = useState(null);
  const [selectedFileUsuarios, setSelectedFileUsuarios] = useState(null);

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    console.log(file)
    switch (fileType) {
      case 'productos':
        setSelectedFileProductos(file);
        break;
      case 'clientes':
        setSelectedFileClientes(file);
        break;
      case 'usuarios':
        setSelectedFileUsuarios(file);
        break;
      default:
        break;
    }
  };

  const handleFileUpload = async (url, mensajeExito, selectedFile) => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('archivo', selectedFile);
        console.log(formData)
        
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response)
        if (response.status === 201|| response.status === 200) {
          Swal.fire('¡Éxito!', mensajeExito, 'success');
        } else {
          Swal.fire('Error', 'Error al cargar el archivo. ' + error.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Error al cargar el archivo: ' + error.message, 'error');
      }
    } else {
      Swal.fire('Advertencia', 'Ningún archivo seleccionado.', 'warning');
    }
  };

  return (
    <div className={` ${styles.FormPedidos} `}>
      <h1 className="mb-3">Administración Evento</h1>

      <div>
        <label htmlFor="">Cargue archivo productos: </label>
        <input type="file" onChange={(e) => handleFileChange(e, 'productos')} />
        <button
          onClick={() =>
            handleFileUpload(
              'http://192.190.42.51:8083/apiPedidosMps/v1/productos/cargar',
              'Carga de productos exitosa',
              selectedFileProductos
            )
          }
        >
          Cargar Archivo
        </button>
      </div>

      <div>
        <label htmlFor="">Cargue archivo Clientes: </label>
        <input type="file" onChange={(e) => handleFileChange(e, 'clientes')} />
        <button
          onClick={() =>
            handleFileUpload(
              'http://192.190.42.51:8083/apiPedidosMps/v1/clientes/plano',
              'Carga de clientes exitosa',
              selectedFileClientes
            )
          }
        >
          Cargar Archivo
        </button>
      </div>

      <div>
        <label htmlFor="">Cargue archivo Usuarios: </label>
        <input type="file" onChange={(e) => handleFileChange(e, 'usuarios')} />
        <button
          onClick={() =>
            handleFileUpload(
              'http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/cargar',
              'Carga de usuarios exitosa',
              selectedFileUsuarios
            )
          }
        >
          Cargar Archivo
        </button>
      </div>
    </div>
  );
}
