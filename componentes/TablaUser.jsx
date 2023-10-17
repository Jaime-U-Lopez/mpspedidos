import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from 'app/page.module.css'

export default function UserManagementTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
 
    getUsuarios();
  }, []);


const getUsuarios=()=>{

    axios.get(`http://localhost:8082/apiPedidosMps/v1/usuarios/`)
    .then((response) => {
      // Actualiza el estado con los datos de los usuarios
      setUsers(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener los usuarios:', error);
    });

}

  // Calcula el índice de inicio y fin para la paginación
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const usersToDisplay = users.slice(startIndex, endIndex);

  const handleDeleteUser = (userId) => {
    console.log(userId)

 const id= userId.id
 console.log(id)
    // Realiza una solicitud DELETE para eliminar el usuario por su ID
    axios.delete(`http://localhost:8082/apiPedidosMps/v1/usuarios/{id}?id=${id}`)
      .then(() => {
        // Actualiza la lista de usuarios después de eliminar
        setUsers(users.filter((user) => user.id !== userId.id));

        getUsuarios()
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  };



  return (
    <div  className={styles.TablePedidos}  >
      <h2>Usuarios Creados</h2>
      <table className="table table-responsive table table-hover table-bordered border-primary">
        <thead>
          <tr className="table-primary">
            <th scope="col">N°</th>
            <th scope="col">Nombre usuario</th>
            <th scope="col">Rol</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{startIndex + index + 1}</th>
              <td>{user.nombreUsuario}</td>
              <td>{user.rol}</td>
              <td className="d-flex justify-content-center align-items-center">
                <button
                  className={`btn btn-danger ${styles.DeleteButton}`}
                  onClick={() => handleDeleteUser(user)}
                >
                  Eliminar
                </button>
              </td>
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