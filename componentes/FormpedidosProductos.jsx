
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import React, { useEffect } from 'react';
import axios from 'axios';


import Swal from 'sweetalert2';


export default function FormPedidosProductos() {


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
  const [selectedRow, setSelectedRow] = useState(null);

  
  const handleChange = (e) => {
    // Actualiza el estado cuando se cambia el valor de un campo del formulario
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)




  useEffect(() => {
    // Hacer la solicitud para obtener la lista de marcas
    axios
      .get('http://localhost:8082/apiPedidosMps/v1/productos/')
      .then((response) => {
        // Actualizar el estado con la lista de marcas recibida de la API

        const dataFromApi = response.data;
        setMarcas(dataFromApi);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'Sin marcas para seleccionar en Base de datos.', 'error');
      });
  }, []); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas

  console.log(marcas)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error
    try {

      if(formData.numerodeparte>=1){
      const response = await axios.get(`http://localhost:8082/apiPedidosMps/v1/productos/${formData.numerodeparte}`);

      const dataInicial = [response.data];

      setData(dataInicial); // Almacena los datos en un arreglo para que puedan ser mapeados


      }else{
        axios
        .get('http://localhost:8082/apiPedidosMps/v1/productos/')
         .then((response) => {
        // Actualizar el estado con la lista de marcas recibida de la API

        const dataInicial = response.data;
        setData(dataInicial)
      })
      }
  

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

  console.log()
  function handleRowClick(item) {
    // Your SweetAlert2 logic here
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Yes" button
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked the "No" button
        Swal.fire('Cancelled', 'Your file is safe :)', 'info');
      }
    });
  }


var totalProductos=data.length;
var totalProductosActualesTable=dataToShow.length;
var totalProductosEnCarrito=0;


var imagen=  <Image 
src="/img/icon-addProdc.png"
alt="Picture of the author"
width={80/2}
height={50}></Image>

var imageIzquierda=<Image 
src="/img/icons8-flecha-izquierda-64 (1).png"
alt="Picture of the author"
width={80/2}
height={50}></Image>
var imagenDerecha=<Image 
src="/img/icons8-flecha-derecha-64.png"
alt="Picture of the author"
width={80/2}
height={50}></Image>

var imagenCarrito=<Image 
src="/img/icons8-carrito-de-la-compra-cargado-100.png"
alt="Picture of the author"
width={50/2}
height={50}>
  
</Image>

var imagenBasuraDelete=<Image 
src="/img/icons8-basura-llena-100.png"
alt="Picture of the author"
width={50/2}
height={50}></Image>


  return (


    <div className={` ${styles.FormPedidos} `}    >

      <div className={styles.ajusteCarrito} >

      <h1 className='mb-3 '> Solicitud de Pedido  </h1>
      {imageIzquierda}
     {imagenDerecha}
      <p> {imagenCarrito} = {totalProductosEnCarrito}</p>  
        
      </div>
      
      <h2 className='mb-3' > Seleccionar Articulos :    </h2>

      <form onSubmit={handleSubmit}>  

        <div className="input-group">
          <span className="input-group-text">Marca </span>

          <select
      value={formData.marca} // Usa el valor del estado para reflejar la selección
      onChange={handleChange}
      name="marca" // Asegúrate de que el atributo name coincida con la clave en formData
      className="form-select form-select-lg"
      aria-label=".form-select-lg example"
    >
      <option value="1">Seleccione la marca</option>
      
      {marcas.map((marcass) => (
    <option key={marcass.id} value={marcass.marca}>
      {marcass.moneda}
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
            value={formData.Numerodeparte} // Usa el valor del estado
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
      
      <div  onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}>
            {imageIzquierda}
      </div>
    <div onClick={() => goToPage(currentPage + 1)}
          disabled={endIndex >= data.length}>
      {imagenDerecha}
      </div>  </div>
   
      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `}>
        <thead>
          <tr  className='table-primary' >
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
        
        {error ? (
        <p>Nit no encontrado o error en la solicitud.</p>
      ) : isLoading ? (
        <p>Cargando...</p>
      ) : (
  <tbody>
    {dataToShow.map((item, index) => (
      <tr key={item.id} 
      
      onClick={() => setSelectedRow(item)}
      className={ selectedRow === item ? "selectedrow" : ''}
      
      >
        <th scope="row">{index + 1}</th>
        <td>{item.numerodeparte}</td>

        <td>{item.nombre}</td>
        <td>{item.descripcion}</td>
        <td>{item.color}</td>
        <td>{item.marca}</td> 

        <td>{item.preciocompra}</td>
   
          <td>{item.clasificaciontributaria}</td>
          <td> cantidad de articulos</td>
     
        <td onClick={()=>  handleRowClick(item)  } className='d-flex justify-content-center align-items-center'> {imagen} </td>
        <td className='justify-content-center ' > {imagenBasuraDelete} </td>
      </tr>
     
   

    ))}
          </tbody>
        )}       
    
      </table>

    </div>
  );
};