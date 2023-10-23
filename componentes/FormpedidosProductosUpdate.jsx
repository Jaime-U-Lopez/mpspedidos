
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { router, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import numeral from 'numeral';



export default function FormPedidosProductos() {

  const pathname = usePathname()
  let codigoInterno = 0;
  const [data, setData] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [formData, setFormData] = useState({
    numerodeparte: '0',
    marca: '',
    nombre: '',
    numerodeparteTable: '',
    cantidadInp:0,
    precioUnitarioInp:0,
  });
  const [codigoInternoTraspaso,setCodigoInternoTraspaso]=useState();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
const [page, setPage] = useState(1);
const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const dataToShow = data.slice(startIndex, endIndex);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [carritoEnvio, setCarritoEnvio] = useState([]);
   const [cantidades, setCantidades] = useState({});
  const [precioUnitario, setPrecioUnitario] = useState({});
  const [totalCantidades, setTotalCantidades] = useState([]); // Estado para almacenar el total de cantidades
  const [controlInput, setControlInput] = useState(false)
  const [cantidadPedidoActuales, setCantidadPedidoActuales] = useState(0);
  const [controEnvio, setControEnvio] = useState(true)
  const [clientePed, setClientePed] = useState()

 
  const [actualizarProductos, setActualizarProductos] = useState(false);








  useEffect(() => {
    // Hacer la solicitud para obtener la lista de marcas

    extraerIdCodigoInternoCancelar(pathname)
    extraerIdCodigoInternoId(pathname)
    axios
      .get('http://192.190.42.51:8083/apiPedidosMps/v1/productos/marcas/')
     // .get('http://localhost:8083/apiPedidosMps/v1/productos/marcas/')
      .then((response2) => {
        // Actualizar el estado con la lista de marcas recibida de la API

        const dataFromApi = response2.data;
        setMarcas(dataFromApi);


        var extracionCliente=extraerIdCliente(pathname)
        setClientePed(extracionCliente)
      })



      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'Sin marcas para seleccionar en Base de datos.', 'error');
      });
  }, [codigoInternoTraspaso, pathname]); 


  const handleCantidadChange = (e, productoId) => {

    const nuevaCantidad = parseInt(e.target.value, 10);

    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]:
        nuevaCantidad,
      id: productoId,
      cantidad: nuevaCantidad
    }));

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setControlInput(true);

  };


  const handlePrecioChange = (e, productoId) => {

    const nuevoPrecio = parseInt(e.target.value, 10);

    setPrecioUnitario((prevPrecioUnitario) => ({
      ...prevPrecioUnitario,
      [productoId]:
      nuevoPrecio,
      id: productoId,
      preciocompra: nuevoPrecio
    }));


    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setControlInput(true);



  };





  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const agregarAlCarrito = (producto) => {


   if (cantidades[producto.id] > 0 && precioUnitario[producto.id] !== undefined && precioUnitario[producto.id] >= 0) {
   
      setCarrito([...carrito, producto]);
      setCarritoEnvio([...carritoEnvio, producto]);
   


      const cantidadesInput={ 
        id:cantidades.id,
      cantidad: cantidades.cantidad

      }


      const precioUnitarioInput={
        id:precioUnitario.id,
        valorUnitario:precioUnitario.preciocompra,
      }



        const productoSeleccionado = Object.assign({},  cantidadesInput,precioUnitarioInput);
        setTotalCantidades([...totalCantidades, productoSeleccionado]);

        const valor = cantidades.cantidad;
        const valorTotal=cantidadPedidoActuales+valor;

        setCantidadPedidoActuales(valorTotal)

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${formData.numerodeparteTable} ha sido agregado a tu carrito.`,
        showConfirmButton: false,
        timer: 2000,
      });

      setControlInput(false)


    } else {
      // Muestra un mensaje de error si la cantidad es menor o igual a cero
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La Cantidad y Precio Unitario,  deben ser mayor a cero para agregar el producto al carrito.',
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
        const nuevasCantidades = totalCantidades.filter((item) => item.id !== producto.id);

        setTotalCantidades(nuevasCantidades);
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



  const goToPage = (page) => {
    setCurrentPage(page);
  };


 

  const handleSubmitGet = async (e) => {

    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error


    let apiUrl = "http://192.190.42.51:8083/apiPedidosMps/v1/productos/";

    if (formData.marca !== "no" && formData.numerodeparte == '0' || formData.numerodeparte == '' || formData.numerodeparte == null) {
      apiUrl += `marcas/${formData.marca}`;

      if (formData.numerodeparte && formData.numerodeparte !== "0") {
        apiUrl += `/${formData.marca}/${formData.numerodeparte}`;
      }
    } else if (formData.numerodeparte) {
      apiUrl += `filtro/${formData.numerodeparte}`;
    } else {
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



  const handleSubmitPut = async () => {

  
    setIsLoading(true); // 
    setError(false); //

    const url = pathname;
     
    const ListaProductosMapeados = totalCantidades.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
      valorUnitario:item.valorUnitario,
    }));

    
    //enviamos pedido

   let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/addProduct/`;
    // let apiUrl = `http://localhost:8083/apiPedidosMps/v1/pedidos/addProduct/`;


    let numRetries = 0;
    let success = true;

    const cod =  extraerIdCodigoInternoCancelar(pathname)
    const codigoInterno2 = `${cod}`

    if(ListaProductosMapeados.length>=1){
      let dataInicial="";
    
try {
       
        setCodigoInternoTraspaso(codigoInterno2);
        const pedidoInicial = { idCliente: clientePed.value, listaProductos: ListaProductosMapeados, estado: "sinConfirmacion", codigoInterno: codigoInternoTraspaso }
  
        const response = await axios.patch(apiUrl, pedidoInicial);
         dataInicial = response.data.message;

       
        setActualizarProductos(true)
        setControEnvio(true);
      } catch (error) {
        console.error(error);

        if (error.response) {
        
          const responseData = error.response.data.message;
      
          console.log("Mensaje de error:", responseData); 
          console.log("Código de estado:", error.response.status); 
         
          setError(true); 
          Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + responseData, 'error');
        } else {
          console.log("Error sin respuesta del servidor:", error.message);
          setError(true); // Establece el estado de error en true
          Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + error.message, 'error');
        }
      } finally {
        setIsLoading(false); // Establece isLoading en false después de la carga

      }
   
    }
  };



  function continuarPedido() {
    handleSubmitPut()

    
  }

  var totalProductos = data.length;
  var totalProductosActualesTable = dataToShow.length;
  var totalProductosEnCarrito = cantidadPedidoActuales;


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


      

    const extraerIdCodigoInternoCancelar = (url) => {

      const segments = url.split('/'); // Divide la URL en segmentos utilizando "/"
      const ultimoSegmento = segments[segments.length - 1]; // Obtén el último segmento
      setCodigoInternoTraspaso(ultimoSegmento);


      return ultimoSegmento;
    }

    const extraerIdCodigoInternoId = (url) => {

      const segments = url.split('/'); // Divide la URL en segmentos utilizando "/"
      const antepenultimo = segments[segments.length - 2]; // Obtén el último segmento
      setClientePed(antepenultimo);

      
      return antepenultimo;
    }



    const extraerIdCliente = (url) => {
      return new Promise((resolve, reject) => {
        const numeroMatch = url.match(/\/(\d+)/);
        if (numeroMatch) {
          try {
            const numero = parseInt(numeroMatch[1]);
            const ultimoSegmento = url.split('/').pop();
            resolve(numero);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("No se encontró ningún número en la URL"));
        
        }
      });
    };

    const extraerIdCodigoInterno = (url) => {
      return new Promise((resolve, reject) => {
        const numeroMatch = url.match(/\/(\d+)[a-zA-Z]*$/);
        if (numeroMatch) {
          try {
            const numero = parseInt(numeroMatch[1]);
            const ultimoSegmento = url.split('/').pop();
            resolve(ultimoSegmento);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('No se encontró un número interno  en la URL.'));
        }
      });
    };
   
    function formatNumber(number) {
      if (typeof number !== 'number') {
        // Si el valor no es un número, intenta convertirlo a un número.
        number = parseFloat(number);
      }
    
      const formattedNumber = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      
      return formattedNumber;
    }


  //<<<<<<<<___________________________________>>>>>>>>>>>>>


  return (


    <div className={` ${styles.FormPedidos} `}    >
      <div className={styles.ajusteCarrito} >

 
        <h1 className='mb-3 '> Solicitud de Pedido  </h1>

  
        <p> {imagenCarrito} = {totalProductosEnCarrito}</p>
      </div>
      <h3 className='mb-3 '> Agregar nuevos productos  </h3>
      <h4 className='mb-3 '> Cliente: {clientePed}  </h4>
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
          
          
          <div >
         

</div>
        

<ul>
{controEnvio? (
       
       <li>
    <Link 
       onClick={continuarPedido}
    
   href={`/pedidos/confirmarPedido/${encodeURIComponent(clientePed)}/${encodeURIComponent(codigoInternoTraspaso)}`} scroll={false} prefetch={false}>Continuar Pedido</Link>
  
         </li> 
      ):( 
        <li>
            </li> 
      )}


          <li >
             <Link href={`/pedidos/confirmarPedido/${encodeURIComponent(codigoInternoTraspaso)}`}  scroll={false} prefetch={false}  className={styles.linkCancelar}  >Cancelar Pedido</Link>
  
          </li>

        </ul>

      </form>
      <p>Productos Encontrados : {totalProductosActualesTable} de   {totalProductos}   </p>
      <div className={styles.btnAtrasAdelante}>

       
      <button     
          
          onClick={() => setPage(page - 1)} disabled={page === 1}
          >
          {imageIzquierda}
        </button>
        <button
        
        onClick={() => setPage(page + 1)} disabled={endIndex >= data.length}
        
        >
          {imagenDerecha}
        </button>



      </div>



      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `}>
        <thead>
          <tr className='text-center'>
            <th scope="col">N°</th>
            <th scope="col">N° de parte </th>
     
            <th scope="col" >Descripción </th>
            <th scope="col" >Color </th>
            <th scope="col" >Marca </th>
            <th scope="col" >Stock </th>

            <th scope="col" >Valor Unitario  </th>
            <th scope="col">Precio Unit COP</th>
            <th scope="col">Precio Unit USD</th>
            <th scope="col">Cantidad</th>
            <th scope="col" >Carrito </th>



          </tr>
        </thead>
        <tbody>
          {dataToShow.map((producto, index) => (
            <tr className='text-center' key={producto.id}>
                <th scope="row">{startIndex + index + 1}</th>
              <td name="numerodeparteTable">{producto.numerodeparte}</td>

              <td className={styles.descripcionProducto}>{producto.descripcion}</td>
              <td>{producto.color}</td>
              <td>{producto.marca}</td>
              <td>{producto.stock}</td>
              <td>

              {carrito.includes(producto) ? (
                
                  <input
                    type="number"
                    name='precioUnitarioInp'
                    placeholder="Ingresa el precio"
                    className={styles.inputCantidad}
                    value={   precioUnitario[producto.id] || ''}
                    onChange={(e) => handlePrecioChange(e, producto.id)}
                    disabled="true"
                  />


                ) : (
                  <input
                    type="number"
                    name='precioUnitarioInp'
                    placeholder="Ingresa el precio"
                    className={styles.inputCantidad}
                    value={precioUnitario[producto.id] || ''}
                    onChange={(e) => handlePrecioChange(e, producto.id)}

                  />
                )}

              </td>
              <td className={ styles.alineacionValoresDere}  > {formatNumber(producto.preciominimocop)   }</td>
              <td className={ styles.alineacionValoresDere} >{formatNumber(producto.preciominimousd) }</td>

              <td>
                {carrito.includes(producto) ? (
                  <input
                    type="number"
                    name='cantidadInp'
                    placeholder="Ingresa Cantidad"
                    className={styles.inputCantidad}
                    value={cantidades[producto.id] || ''}
                    onChange={(e) => handleCantidadChange(e, producto.id)}
                    disabled="true"
                  />
                ) : (
                  <input
                    type="number"
                    name='cantidadInp'
                    placeholder="Ingresa Cantidad"
                    className={styles.inputCantidad}
                    value={cantidades[producto.id] || ''}
                    onChange={(e) => handleCantidadChange(e, producto.id)}

                  />
                )}

              </td>
              <td     >
                {carrito.includes(producto) ? (
                  <button
                    className={styles.StyleIconosForm}
                    onClick={() => eliminarDelCarrito(producto)}>
                    {imagenBasuraDelete}
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