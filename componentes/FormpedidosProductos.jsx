
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
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = data.slice(startIndex, endIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [carritoEnvio, setCarritoEnvio] = useState([]);
  const [cliente, setCliente] = useState(0);
  const [cantidades, setCantidades] = useState({});
  const [precioUnitario, setPrecioUnitario] = useState({});
  const [totalCantidades, setTotalCantidades] = useState([{cantidad:0}]); // Estado para almacenar el total de cantidades
  const [controlInput, setControlInput] = useState(false)
  const [cantidadPedidoActuales, setCantidadPedidoActuales] = useState(0);

  const [actualizarProductos, setActualizarProductos] = useState(false);


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
    // Actualiza el estado cuando se cambia el valor de un campo del formulario
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

  };

  const agregarAlCarrito = (producto) => {

    if (controlInput && cantidades.cantidad > 0 && precioUnitario.preciocompra>0) {


      setCarrito([...carrito, producto]);
      setCarritoEnvio([...carritoEnvio, producto]);
   


const cantidadesInput={ 
  id:cantidades.id,
 cantidad: cantidades.cantidad}


 const precioUnitarioInput={
  id:precioUnitario.id,
  preciocompra:precioUnitario.preciocompra,
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
        conteoProductos(nuevasCantidades)

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



  console.log(totalCantidades)


  function generarCodigoAleatorio(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
  }


  const handleSubmitGet = async (e) => {

    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error


    let apiUrl = "http://192.168.1.38:8082/apiPedidosMps/v1/productos/";

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

  const handleSubmitPost = async (e) => {

    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error
    const codigoUnico = uuidv4();

    const url = pathname;
    extraerIdCliente(url);

    const codigoAleatorio = generarCodigoAleatorio(4);
    codigoInterno = `${cliente}${codigoAleatorio}`
    setCodigoInternoTraspaso(codigoInterno);

    const ListaProductosMapeados = totalCantidades.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
    }));

    const pedidoInicial = { idCliente: cliente, listaProductos: ListaProductosMapeados, estado: "sinConfirmacion", codigoInterno: codigoInterno }

    setPedido(pedidoInicial)
    console.log(ListaProductosMapeados)

    //enviamos pedido

    let apiUrl = `http://localhost:8082/apiPedidosMps/v1/pedidos/`;
    
    let numRetries = 0;
    let success = true;

    if(ListaProductosMapeados.length>=1){
      try {
      
        const response = await axios.post(apiUrl, pedidoInicial);
        const dataInicial = response.data;
        console.log(dataInicial)
        console.log(dataInicial)
        Swal.fire({
          title: 'Cargando exitosamente...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        setTimeout(() => {
          setIsLoading(false);
          Swal.close();

        }, 500);
        setActualizarProductos(true)
      } catch (error) {
        console.error(error);
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'No se pudo guardar el pedido, valide su conexion a internet.', 'error');

      } finally {
        setIsLoading(false); // Establece isLoading en false después de la carga

      }
   

    }else{

      Swal.fire('Error', 'Debe seleccionar como minimo un producto.', 'error');
    }
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

        <Link href="/pedidos/buscarCliente" prefetch={false}>{imageIzquierda}</Link>

      }
    });
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



  const extraerIdCliente = (url) => {

    const numeroMatch = url.match(/\/(\d+)$/);

    if (numeroMatch) {
      try {
        const numero = parseInt(numeroMatch[1]);

        setCliente(numero);
       
      } catch {
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
          <div >
          {!actualizarProductos?  ( <button
          className="btn w40- mt-4 mb-3 btn-primary"
          type="submit"
          //disabled={isLoading} // Deshabilita el botón durante la carga
          onClick={handleSubmitPost}
        >
          Guardar Pedido
        </button>) :(

        <button className="btn w40- mt-4 mb-3 btn-primary"
        type="submit"
        //disabled={isLoading} // Deshabilita el botón durante la carga
        onClick={handleSubmitPost}
      >
        Actualizar  Pedido
      </button>
      
    
    )}

       

</div>
        

        <ul>
          <li >
            <Link href={`/pedidos/confirmarPedido/${encodeURIComponent(codigoInternoTraspaso)}`} scroll={false} prefetch={false} >Continuar Pedido</Link>


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
        </div>
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
            <th scope="col">Precion Unit COP</th>
            <th scope="col">Precion Unit USD</th>
            <th scope="col">Cantidad</th>
            <th scope="col" >Carrito </th>



          </tr>
        </thead>
        <tbody>
          {dataToShow.map((producto, index) => (
            <tr className='text-center' key={producto.id}>
              <th scope="row">{index + 1}</th>
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
                    value={precioUnitario[producto.id] || ''}
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
              <td> {producto.preciominimocop}</td>
              <td>{producto.preciominimousd}</td>



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