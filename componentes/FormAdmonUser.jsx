'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

import axios from 'axios';
import TablaUser from './TablaUser';


export default function FormAdmonUser() {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    password: '',
    rol: '1', // Valor por defecto
  });

  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const newErrors = {};

    // Verifica si los campos están en blanco
    if (!formData.nombre) {
      newErrors.nombre = 'El campo Nombre es obligatorio';
    }
    if (!formData.usuario) {
      newErrors.usuario = 'El campo Usuario es obligatorio';
    }
    if (!formData.password) {
      newErrors.password = 'El campo Password es obligatorio';
    }
    if (formData.rol === '1') {
      newErrors.rol = 'Debe seleccionar un Rol';
    }

    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
    try {
    // const response = await axios.post('http://localhost:8083/apiPedidosMps/v1/usuarios/', formData);
     const response = await axios.post('http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/', formData);
      


      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado con exito ',

        showConfirmButton: false,
        timer: 2000,
      });


    } catch (error) {
      // Manejar errores
      console.error('Error al enviar la solicitud:', error);

      
      Swal.fire({
        icon: 'error',
        title: 'No se pudo crear el usuario  ',

        showConfirmButton: false,
        timer: 2000,
      });
    }}
  };

  return (
    <div className={styles.FormPedidos}>
      <h2 className='mb-3'>Administración de usuarios:</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-group-text">Nombre usuario</span>
          <input
            className="form-control"
            type="text"
            placeholder="Ingresa el nombre de usuario"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Usuario</span>
          <input
            className="form-control"
            type="text"
            placeholder="Ingresa el nombre de usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Password</span>
          <input
            className="form-control"
            type="password"
            placeholder="Ingresa el Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Rol</span>
          <select
            className="form-select form-select-lg"
            aria-label=".form-select-lg example"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="1">Seleccione el Rol</option>
            <option value="2">Administrador</option>
            <option value="3">Cartera</option>
            <option value="4">Comercial</option>
            <option value="5">Ventas</option>
          </select>
        </div>
        <div>
          <button className="btn w-50 mt-4 mb-3 btn-primary" type="submit">
            Crear
          </button>
        </div>
        <div>
          <button className="btn w-50 mt-2 mb-3 btn-danger" type="button">
            Resetear Password
          </button>
        </div>
      </form>
      <p>Usuarios Creados:</p>

      <TablaUser/>


    </div>
  );
}