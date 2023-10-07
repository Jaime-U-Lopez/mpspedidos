
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { router, usePathname, useSearchParams } from 'next/navigation'
import { useState , useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function FormPedidosProductos() {

  const pathname = usePathname()
  const [selectedRow, setSelectedRow] = useState(null);
  const [cantidadPorItem, setCantidadPorItem] = useState({});
  const [pedidoPorItem, setpedidoPorItem] = useState({});
  const [data, setData] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [formData, setFormData] = useState({
    numerodeparte: '0',
    marca: '',
    nombre:'',
    numerodeparteTable:'',
  });
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente]=useState(0);
  const [cantidades, setCantidades] = useState({});


    const handleCantidadChange = (e, productoId) => {
      const nuevaCantidad = parseInt(e.target.value, 10);
  
      // Actualiza el estado de las cantidades con la nueva cantidad
      setCantidades((prevCantidades) => ({
        ...prevCantidades,
        [productoId]: nuevaCantidad,
      }));
    };
  


console.log(carrito)

    const handleChange = (e) => {
      // Actualiza el estado cuando se cambia el valor de un campo del formulario
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
    };
  




  const agregarAlCarrito = (producto,) => {

    if (cantidad > 0) {
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${formData.numerodeparteTable} ha sido agregado a tu carrito.`,
        showConfirmButton: false,
        timer: 2000,
      });
     


      
      setCarrito([...carrito, producto.codigo]);


    } else {
      // Muestra un mensaje de error si la cantidad es menor o igual a cero
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad debe ser mayor a cero para agregar el producto al carrito.',
      });
    }
   
  };
  
  
  const eliminarDelCarrito = (producto) => {
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar ${formData.numerodeparteTable}  del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoCarrito = carrito.filter((item) => item.id !== producto.id);
        setCarrito(nuevoCarrito);
  
        Swal.fire({
          icon: 'success',
          title: 'Producto eliminado del carrito',
          text: `${formData.numerodeparteTable}  ha sido eliminado del carrito.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

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





  const handleSubmitGet = async (e) => {

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



  const handleSubmitPost = async (e) => {

    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error


    const url=pathname;
    extraerIdCliente(url);

//cliente solo en nit
    cliente
// producto 
carrito



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

        <Link href="/pedidos/buscarCliente"   prefetch={false}>{imageIzquierda}</Link>

      }
    });
  }


  const getCantidadEnCarrito = (productoId) => {
    return carrito[productoId] || 0;
  };
  

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
    src="/img/icons8-flecha-izquierda.png"
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



    const extraerIdCliente = (url) => {

    const numeroMatch = url.match(/\/(\d+)$/);

    if (numeroMatch) {
      try{
        const numero = parseInt(numeroMatch[1]);

        setCliente(numero);
        Swal.fire('ok bien ', numero+' la identificacion del cliente no es numerica!.', 'error');
      }catch{
        console.error(error);
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'la identificacion del cliente no es numerica!.', 'error');

      }
    
    } 
        }



//<<<<<<<<___________________________________>>>>>>>>>>>>>


  return (


    <div className={` ${styles.FormPedidos} `}    >
      <div className={styles.ajusteCarrito} >
        <h1 className='mb-3 '> Solicitud de Pedido  </h1>
    

        <p> {imagenCarrito} = {totalProductosEnCarrito}</p>
      </div>

      <h2 className='mb-3' > Seleccionar Articulos :    </h2>
  
      <form onSubmit={handleSubmitGet}>
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
          <span className="input-group-text">N° Parte Prod</span>

          <input
            className="form-control "
            type="text"
            placeholder="Numero de parte"
            name="numerodeparte"
            onChange={handleChange}
          />
        </div>

        <div >
          <button
            className="btn w-100 mt-4 mb-3 btn-primary"
            type="submit"
            //disabled={isLoading} // Deshabilita el botón durante la carga
          >
            Buscar
          </button>
        </div>


      
        <button
            className="btn w40- mt-4 mb-3 btn-primary"
            type="submit"
            //disabled={isLoading} // Deshabilita el botón durante la carga
            onClick={handleSubmitPost}
          >
            Guardar Pedido
          </button>
        
        <ul>
          <li >
            <Link href="/pedidos/confirmarPedido" >Continuar Pedido</Link>
          </li>
          <li >
            <Link href="/pedidos/confirmarPedido" className={styles.linkCancelar} >Cancelar Pedido</Link>
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
            <th scope="col">N° de parte </th>
            <th scope="col">Nombre Articulo </th>
            <th scope="col" >Descripción </th>
            <th scope="col" >Color </th>
            <th scope="col" >Marca </th>
            <th scope="col" >Valor  </th>
            <th scope="col" >Clasif trib </th>
            <th scope="col" >Cant Articulos</th>
            <th scope="col" >Carrito </th>
    
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((producto,index) => (
            <tr key={producto.id}>
               <th scope="row">{index + 1}</th>
              <td name="numerodeparteTable">{producto.numerodeparte}</td>
              <td name="nombre" >{producto.nombre}</td>
              <td className={styles.descripcionProducto}>{producto.descripcion}</td>
              <td>{producto.color}</td>
              <td>{producto.marca}</td>
              <td>{producto.preciocompra}</td>
            <td>{producto.clasificaciontributaria}</td>


              <td><input 
               className={styles.inputCantidad}
               type="number"
               placeholder="Ingresa Cantidad"
               name="cantidad"
               onChange={(e) => handleCantidadChange(e, producto.id)}
               min="1" 
               value={cantidades[producto.id] || ''}
               style={{
                 textAlign: 'center', // Centra horizontalmente el contenido
               }}
            
              /> 
            
               </td>
            
              <td     >
                {carrito.includes(producto) ? (
                  <button 
                  className={styles.StyleIconosForm}
                  onClick={() => eliminarDelCarrito(producto)}>
                   { imagenBasuraDelete}
                  </button>
                ) : (
                  <button 
                  className={styles.StyleIconosForm} 
                  onClick={() => agregarAlCarrito(producto)}>
                    {imagen}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
 
  
  );
};