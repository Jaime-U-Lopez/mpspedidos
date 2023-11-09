'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormAdmonPlanos({formulario}) {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('excelFile', selectedFile);

      try {
        const response = await fetch('http://localhost:8082/apiPedidosMps/v1/productos/cargar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // El archivo se ha cargado exitosamente.
          console.log('El archivo se ha cargado exitosamente.');
        } else {
          console.error('Error al cargar el archivo.');
        }
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
      }
    } else {
      console.error('Ningún archivo seleccionado.');
    }
  };

  return (


    <div className={` ${styles.FormPedidos} `}    >

        <h1 className='mb-3 '> Administración Cargue de Archivos Planos   </h1>


    <div>
    <span >Cargue archivo productos: </span>
    
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleFileUpload}>Cargar Archivo</button>


    </div>
        
    <div>
    <span >Cargue archivo Clientes: </span>
    
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleFileUpload}>Cargar Archivo</button>

    </div>

    <div>
    <span >Cargue archivo Usuarios : </span>
    
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleFileUpload}>Cargar Archivo</button>

    </div>

        </div>
  );
};