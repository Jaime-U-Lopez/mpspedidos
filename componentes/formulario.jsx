

'use client';
import { useState, useEffect } from 'react';

const ProductForm = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [cantidades, setCantidades] = useState({}); // Estado para almacenar las cantidades

  

  const handleCantidadChange = (e, productoId) => {
    const nuevaCantidad = parseInt(e.target.value, 10);

    // Actualiza el estado de las cantidades con la nueva cantidad
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: nuevaCantidad,
    }));
  };


  console.log('Productos:', productos);
  console.log('Cantidades:', cantidades);
  const handleSubmit = () => {
    // Puedes realizar acciones con los productos y las cantidades ingresadas

    e.preventDefault();

    console.log('Productos:', productos);
    console.log('Cantidades:', cantidades);
  };

  const productos2 = [
    { id: 1, nombre: 'Producto 1', cantidad: null },
    { id: 2, nombre: 'Producto 2', cantidad: null },
    { id: 3, nombre: 'Producto 3', cantidad: null },
  ];

  return (
    <div>
      <h1>Formulario de Productos</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {productos2.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>
                  <input
                    type="number"
                    value={cantidades[producto.id] || ''}
                    onChange={(e) => handleCantidadChange(e, producto.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button">Guardar</button>
      </form>
    </div>
  );
};

export default ProductForm;