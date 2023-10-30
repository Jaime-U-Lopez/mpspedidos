import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from 'app/page.module.css'

export default function TablaUser({data}) {
 
 
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);


  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const usersToDisplay = data.slice(startIndex, endIndex);

console.log(data)


  return (
    <div  className={styles.TablePedidos}  >
      <h2>Consulta clientes con valor superior o igual </h2>
      <table className="table table-responsive table table-hover table-bordered border-primary">
        <thead>
          <tr className="table-primary">
            <th scope="col">N°</th>
            <th scope="col">N° identificacion</th>
            <th scope="col">Nombre Comercial</th>
            <th scope="col">Estado</th>
            <th scope="col">Neto a pagar</th>
            <th scope="col">Unidades totales</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((pedidos, index) => (
            <tr key={pedidos.id}>
              <th scope="row">{startIndex + index + 1}</th>
              <td>{pedidos.dni}</td>
              <td>{pedidos.nombreComercial}</td>
              <td>{pedidos.estado}</td>
              <td>{pedidos.netoApagar}</td>
              <td>{pedidos.unidadesAcumuladas}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} disabled={endIndex >= users.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}