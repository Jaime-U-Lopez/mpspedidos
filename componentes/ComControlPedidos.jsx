import React, { createContext, useContext, useState } from 'react';

// Crea el contexto de pedido
const PedidoContext = createContext();

// Hook personalizado para acceder al contexto de pedido
export function usePedido() {
  return useContext(PedidoContext);
}

// Proveedor de contexto de pedido
export function PedidoProvider({ children }) {
  const [numeroPedido, setNumeroPedido] = useState(1); // Número de pedido inicial

  // Función para incrementar el número de pedido
  const incrementarNumeroPedido = () => {
    setNumeroPedido(numeroPedido + 1);
  };

  // Define el valor proporcionado por el contexto
  const value = {
    numeroPedido,
    incrementarNumeroPedido,
  };

  return <PedidoContext.Provider value={value}>{children}</PedidoContext.Provider>;
}


