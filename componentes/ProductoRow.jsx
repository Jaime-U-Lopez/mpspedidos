import React, { useState } from 'react';



export default function ProductoRow({ producto, onAgregar, onEliminar, enCarrito }) {
    const [cantidad, setCantidad] = useState(0);
  
    const handleAgregar = () => {
      onAgregar(producto, cantidad);
      setCantidad(0);
    };
  
    const handleEliminar = () => {
      onEliminar(producto);
    };
  
    return (
      <tr>
        {/* ... Otras columnas de la tabla ... */}
        <td>
          <input
           // className={styles.inputCantidad}
            type="number"
            placeholder="Ingresa Cantidad"
            name="cantidad"
           
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
          />
        </td>
        <td>
          {enCarrito ? (
            <button onClick={handleEliminar}>eliminar</button>
          ) : (
            <button onClick={handleAgregar}>agregar</button>
          )}
        </td>
      </tr>
    );
  }