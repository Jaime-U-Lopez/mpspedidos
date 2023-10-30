"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ConsultaPedidosPorValor() {
  const [valor, setValor] = useState(0); // Estado para almacenar el valor ingresado
  const [resultados, setResultados] = useState([]); // Estado para almacenar los resultados de la consulta

  const handleValorChange = (e) => {
    setValor(e.target.value);
  };

  const consultarPedidosPorValor = async () => {
    try {

      //const response = await axios.get(`http://localhost:8082/apiPedidosMps/v1/pedidos/consulta/valor/{valor}?valor=${valor}`);

      const response = await axios.get(`http://localhost:8082/apiPedidosMps/v1/pedidos/consulta/valor/{valor}?valor=${valor}`);
      setResultados(response.data);
    } catch (error) {
      console.error('Error al consultar pedidos por valor:', error);
    }
  };

  useEffect(() => {
    consultarPedidosPorValor();
  }, [valor]);

  return (
    <div>
      <h1>Consulta de Pedidos por Valor</h1>
      <div>
        <label>Ingrese el valor:</label>
        <input
          type="number"
          value={valor}
          onChange={handleValorChange}
        />
        <button onClick={consultarPedidosPorValor}>Consultar</button>
      </div>
      <div>
        <h2>Resultados de la consulta:</h2>
        <ul>
          {resultados.map((pedido) => (
              <li key={pedido.id}>
              Cliente Nit: {pedido.dni}, Valor Total: {pedido.valorTotal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}