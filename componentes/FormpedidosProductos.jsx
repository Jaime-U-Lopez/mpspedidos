
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2';


export default function FormPedidosProductos() {



  const [selectedRow, setSelectedRow] = useState(null);
  const [cantidadPorItem, setCantidadPorItem] = useState({});
  const [pedidoPorItem, setpedidoPorItem] = useState({});
  const [data, setData] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [formData, setFormData] = useState({
    numerodeparte: '0',
    marca: '',
  });
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);


  // Calcula el índice inicial y final de los elementos a mostrar en la página actual

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra los datos según la página actual
  const dataToShow = data.slice(startIndex, endIndex);
  // Función para cambiar de página
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // Estado para rastrear errores



  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia el valor de un campo del formulario
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error


    let apiUrl = "http://192.168.1.38:8082/apiPedidosMps/v1/productos/";

    if (formData.marca !== "no" && formData.numerodeparte=='0' ||formData.numerodeparte==''|| formData.numerodeparte==null) {
      apiUrl += `marcas/${formData.marca}`;

    if (formData.numerodeparte && formData.numerodeparte !== "0") {
      apiUrl += `/${formData.marca}/${formData.numerodeparte}`;
    }
    } else if (formData.numerodeparte) {
      apiUrl += `filtro/${formData.numerodeparte}`;
    }else {
      apiUrl += `marcas/${formData.marca}`;

    }

    try {
      const response = await axios.get(apiUrl);
      const dataInicial = response.data;
      setData(dataInicial);
    

      console.log(formData)
      Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic afuera
        onBeforeOpen: () => {
          Swal.showLoading(); // Muestra un spinner de carga
        },
      });
      setTimeout(() => {
        setIsLoading(false); // Cambia isLoading a falso cuando la página ha terminado de cargar
        Swal.close(); // Cierra la alerta de carga

      }, 500);

    } catch (error) {
      console.error(error);
      setError(true); // Establece el estado de error en true
      Swal.fire('Error', 'La marca ingresada no registra en la base de datos, intenta nuevamente!.', 'error');
    } finally {
      setIsLoading(false); // Establece isLoading en false después de la carga


    }

    setCurrentPage(1);
  };

  useEffect(() => {
    // Hacer la solicitud para obtener la lista de marcas

    axios
      .get('http://192.168.1.38:8082/apiPedidosMps/v1/productos/marcas/')
      .then((response2) => {
        // Actualizar el estado con la lista de marcas recibida de la API

        const dataFromApi = response2.data;
        setMarcas(dataFromApi);
      })


      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'Sin marcas para seleccionar en Base de datos.', 'error');
      });
  }, []); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas


  function handleRowClick(item) {

    Swal.fire({
      icon: 'success', // Icono de éxito
      title: 'Producto agregado al carrito',
      text: `${item.nombre} ha sido agregado a tu carrito.`,
      showConfirmButton: false, // No muestra el botón "Aceptar"
      timer: 2000, // Auto-cierre del mensaje después de 2 segundos (ajusta según tus necesidades)
    });
  }
  function handleRowClickDelete(item) {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar ${item.nombre} del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza la acción de eliminación aquí usando 'item'
        // ...

        // Luego, muestra un mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado del carrito',
          text: `${item.nombre} ha sido eliminado del carrito.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  function handleClickAtras() {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: `¿Quieres cancelar la orden del pedido ?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        <Link href="/pedidos/buscarCliente">{imageIzquierda}</Link>

      }
    });
  }



  /*
    const handleCantidadChange = (itemId, cantidad) => {
      if (cantidadPorItem.length === 0) {
        // Si la cantidad es vacía, elimina el valor del estado
        const newCantidadPorItem = { cantidad: cantidad  };
      
        setCantidadPorItem(newCantidadPorItem);
      } else {
        // Actualiza el valor del estado con la cantidad ingresada
        setCantidadPorItem({ ...cantidadPorItem, cantidad: cantidad });
  
        setPedidoPorItem({
          ...pedidoPorItem,
          [selectedRow.id]: {
            ...pedidoPorItem[selectedRow.id],
            cantidad: cantidadPorItem[selectedRow.id] ,
          },
        });
      }
    };
  
  */

  const [carrito, setCarrito] = useState({});

  const handleCantidadChange = (productoId, cantidad) => {
    setCarrito((prevCarrito) => ({
      ...prevCarrito,
      [productoId]: cantidad,
    }));
  };

  const getCantidadEnCarrito = (productoId) => {
    return carrito[productoId] || 0;
  };
  const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 15 },
    { id: 3, nombre: 'Producto 3', precio: 20 },
  ];


  // Función para calcular el total de la compra
  const calcularTotal = () => {
    let total = 0;
    for (const producto of productos) {
      const cantidad = getCantidadEnCarrito(producto.id);
      total += cantidad * producto.precio;
    }
    return total;
  };


  var totalProductos = data.length;
  var totalProductosActualesTable = dataToShow.length;
  var totalProductosEnCarrito = 0;


  var imagen = <Image
    src="/img/icon-addProdc.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>

  var imageIzquierda = <Image
    src="/img/icons8-flecha-izquierda-64 (1).png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>
  var imagenDerecha = <Image
    src="/img/icons8-flecha-derecha-64.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>

  var imagenCarrito = <Image
    src="/img/icons8-carrito-de-la-compra-cargado-100.png"
    alt="Picture of the author"
    width={50 / 2}
    height={50}>

  </Image>

  var imagenBasuraDelete = <Image
    src="/img/icons8-basura-llena-100.png"
    alt="Picture of the author"
    width={50 / 2}
    height={50}></Image>


  return (


    <div className={` ${styles.FormPedidos} `}    >
      <div className={styles.ajusteCarrito} >
        <h1 className='mb-3 '> Solicitud de Pedido  </h1>
        <div >
   
        
         
     {imageIzquierda}
        
   


        </div>
        <div>
          {imagenDerecha}
        </div>
        <p> {imagenCarrito} = {totalProductosEnCarrito}</p>
      </div>

      <h2 className='mb-3' > Seleccionar Articulos :    </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-group-text">Marca </span>
          <select
            onChange={handleChange}
            name="marca"
            className="form-select form-select-lg"
            aria-label=".form-select-lg example"
          >
            <option value="no" >Seleccione la marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.marca}>
                {marca.marca}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <span className="input-group-text">Numero de parte Producto</span>

          <input
            className="form-control "
            type="text"
            placeholder="Numero de parte"
            name="numerodeparte"

    value= {formData.numerodeparte } // Usa el valor del estado
            onChange={handleChange}


          />
        </div>

        <div >
          <button
            className="btn w-100 mt-4 mb-3 btn-primary"
            type="submit"
            disabled={isLoading} // Deshabilita el botón durante la carga
          >
            Buscar
          </button>
        </div>

        <ul>
          <li >
            <Link href="/pedidos/confirmarPedido" >Continuar Pedido</Link>
          </li>
        </ul>

      </form>
      <p>Productos Encontrados : {totalProductosActualesTable} de   {totalProductos}   </p>
      <div className={styles.btnAtrasAdelante}>

        <div onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}>
          {imageIzquierda}
        </div>
        <div onClick={() => goToPage(currentPage + 1)}
          disabled={endIndex >= data.length}>
          {imagenDerecha}
        </div>  </div>

      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `}>
        <thead>
          <tr className='table-primary' >
            <th scope="col">N°</th>
            <th scope="col">Numero de parte </th>
            <th scope="col">Nombre Articulo </th>
            <th scope="col" >Descripción </th>
            <th scope="col" >Color </th>
            <th scope="col" >Marca </th>
            <th scope="col" >Valor  </th>
            <th scope="col" >Clasificación tributaria </th>
            <th scope="col" >Cantidad Articulos</th>
            <th scope="col" >Ingresar al Carrito </th>
            <th scope="col" >Eliminar del Carrito </th>
          </tr>
        </thead>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <tbody>
            {dataToShow.map((item, index) => (
              <tr key={item.id}

                onClick={() => setSelectedRow(item)}
                className={selectedRow === item ? "selectedrow" : ''}
              >
                <th scope="row">{index + 1}</th>
                <td>{item.numerodeparte}</td>

                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.color}</td>
                <td>{item.marca}</td>

                <td>{item.preciocompra}</td>

                <td>{item.clasificaciontributaria}</td>
                <td>
                  <input
                    className={styles.inputCantidad}
                    type="number"
                    placeholder="Ingresa Cantidad"
                    name="cantidad"
                    style={{
                      textAlign: 'center', // Centra horizontalmente el contenido
                    }}

                    onChange={(e) =>
                      handleCantidadChange(item.id, parseInt(e.target.value, 10))
                    }
                  />
                </td>
                <td onClick={() => handleRowClick(item)} className='justify-content-center align-items-center'> {imagen} </td>
                <td onClick={() => handleRowClickDelete(item)} className='justify-content-center ' style={{
                  textAlign: 'center', // Centra horizontalmente el contenido

                }} > {imagenBasuraDelete} </td>
              </tr>

            ))}
          </tbody>
        )}

      </table>

    </div>
  );
};