
'use client';
import React, { useState } from 'react';




function Formulario({ initialData }) {




    // Definimos un estado para los datos y lo inicializamos con los valores iniciales
    const [formData, setFormData] = useState(initialData);
  
    // Manejar cambios en los campos de entrada
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    // Manejar el envío del formulario
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes hacer algo con los datos actualizados, como enviarlos a una API.
      console.log('Datos actualizados:', formData);
    };
  
    return (
        <div>
          <h1>Formulario de Edición</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      );
    
  }
  
  export default Formulario;