
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { router, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import NumberFormat from 'react-number-format';



export default function FormPedidosProductos({contadorPedidos}) {




  const pathname = usePathname()
  let codigoInternot="";
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
  const [codigoInterno, setCodigoInterno] = useState('');
  const [itemsPerPage,setItemsPerPage]=useState(0);
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
  const [totalCantidades, setTotalCantidades] = useState([]); 
  const [controlInput, setControlInput] = useState(false)
  const [cantidadPedidoActuales, setCantidadPedidoActuales] = useState(0);
  const [controEnvio, setControEnvio] = useState(true)
  const [controlClik, setControlClik] = useState(true)
  const [actualizarProductos, setActualizarProductos] = useState(true)
  const [clientePed, setClientePed] = useState()
  const [clienteId, setClienteId] = useState()
  const [datoUser, setDatoUser] = useState()
  const [continueConteoProd, setContinueConteoProd] = useState(0);
  



  useEffect(() => {
   extraerIdClienteSinPromesa(pathname)
   let apiUrl = `http://localhost:8083/apiPedidosMps/v1/productos/marcas/`;
   //let apiUrl ='http://192.190.42.51:8083/apiPedidosMps/v1/productos/marcas/';
    axios
      .get(apiUrl)
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


      var dato= sessionStorage.getItem('usernameMPS');
setDatoUser(dato)
 
  }, [clienteId,clientePed]); 



  function generarCodigoAleatorio(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
  }

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
       cantidad: cantidades.cantidad}
      
       const precioUnitarioInput={
        id:precioUnitario.id,
        valorUnitario:precioUnitario.preciocompra,
       }
      
      
      
       const productoSeleccionado = Object.assign({},  cantidadesInput,precioUnitarioInput);
       setTotalCantidades([...totalCantidades, productoSeleccionado]);
      
      const valor = cantidades.cantidad;
      const valorTotal=cantidadPedidoActuales+valor;
      
       setCantidadPedidoActuales(valorTotal)
       //setControlClik(false)
       setContinueConteoProd(1);
            Swal.fire({
              icon: 'success',
              title: 'Producto agregado al carrito',
              text: `${formData.numerodeparteTable} ha sido agregado a tu carrito.`,
              showConfirmButton: false,
              timer: 2000,
            });
      
            setControlInput(false)
    
  

    } else {

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

    var v=marcas[0]
  
    e.preventDefault();
    setIsLoading(true); // Establece isLoading en true durante la carga
    setError(false); // Reinicia el estado de error

   // let apiUrlPorNumuro=  'http://localhost:8083/apiPedidosMps/v1/productos/numeroParte/?numeroParte=1100AS-128GB-'
   //let apiUrl = "http://192.190.42.51:8083/apiPedidosMps/v1/productos/";
   let apiUrl = "http://localhost:8083/apiPedidosMps/v1/productos/";

    if (formData.marca !== "no" && formData.numerodeparte == '0' || formData.numerodeparte == '' || formData.numerodeparte == null) {
      apiUrl += `marcas/${formData.marca}`;

      if (formData.numerodeparte && formData.numerodeparte !== "0") {
        apiUrl += `/${formData.marca}/${formData.numerodeparte}`;
      }
    } else if (formData.numerodeparte) {
      apiUrl += `numeroParte/?numeroParte=${formData.numerodeparte}`;
    } else {
      apiUrl += `marcas/${formData.marca}`;
    }


    const codigoAleatorio = generarCodigoAleatorio(4);
    const codigoInternote = `${clienteId}${codigoAleatorio}`;
    setCodigoInterno(codigoInternote);


    try {
      const response = await axios.get(apiUrl);
      const dataInicial = response.data;
      setData(dataInicial);
      setItemsPerPage(10)


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
      setError(true); 
      Swal.fire('Error', 'La marca ingresada no registra en la base de datos, intenta nuevamente!.', 'error');

      if (error.response) {
        
        const responseData = error.response.data.message;
        console.log("Mensaje de error:", responseData); 
        console.log("Código de estado:", error.response.status); 
       
        setError(true); 
        Swal.fire('Error', 'No se pudo realizar la busqueda, error: ' + responseData, 'error');
      } else {
        console.log("Error sin respuesta del servidor:", error.message);
        setError(true); 
        Swal.fire('Error', 'No se pudo realizar la busqueda, Error sin respuesta del servidor: ' + error.message, 'error');
      }   
   
    } finally {
      setIsLoading(false); 
    }


  };




  const sinSeleccionProductos = async () => {
    Swal.fire('Error', 'Debe seleccionar como minimo un producto.', 'error');

  }




  const handleSubmitPost = async () => {

    setIsLoading(true); 
    setError(false); 
    const url = pathname;
    const ListaProductosMapeados = totalCantidades.map((item) => ({
      id: item.id,
      cantidad: item.cantidad,
      valorUnitario:item.valorUnitario,
    }));

    //enviamos pedido

    //let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/`;
    let apiUrl = `http://localhost:8083/apiPedidosMps/v1/pedidos/`;

    let numRetries = 0;
    let success = true;

    if(ListaProductosMapeados.length>=1){

      let dataInicial="";

      const cliente = await extraerIdCliente(url);
      setClientePed(cliente)

      var codigo=codigoInternot;
      setCodigoInternoTraspaso(codigo);
   
      const codigoAleatorio = generarCodigoAleatorio(4);
      const codigoInternote = `${clienteId}${codigoAleatorio}`;
    
      if(controlClik){
        setCodigoInterno(codigoInternote);
      }
        
      setControlClik(false)
   
      try {

        const pedidoInicial = { idCliente: cliente, listaProductos: ListaProductosMapeados, estado: "sinConfirmacion", codigoInterno:  codigoInterno,  correoAsesor : datoUser}
        const response = await axios.post(apiUrl, pedidoInicial);
        dataInicial = response.data.message;
        console.log(pedidoInicial);
        console.log(dataInicial);

        setActualizarProductos(true)
        //setControEnvio(true);
      } catch (error) {
        console.error(error);
        setControlClik(false)
        if (error.response) {
           const responseData = error.response.data.message;
      
          console.log("Mensaje de error:", responseData); 
          console.log("Código de estado:", error.response.status); 
          setError(true); 
          Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + responseData, 'error');
        } else {
          console.log("Error sin respuesta del servidor:", error.message);
          setError(true); 
          Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + error.message, 'error');
        }
      } finally {
        setIsLoading(false); 

      }
   
    }else{
      Swal.fire('Error', 'Debe seleccionar como minimo un producto.', 'error');
    }
  };
 
  function continuarPedido() {
    

         
    if(controlClik){
      handleSubmitPost()
    }
    
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
      
      return new Promise((resolve, reject) => {
        const numeroMatch = url.match(/\/(\d+)$/);
        if (numeroMatch) {
          try {
            const numero = parseInt(numeroMatch[1]);
            resolve(numero);
      
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('No se encontró un número de cliente en la URL.'));
        }
      });
    }


    const extraerIdClienteSinPromesa = (url) => {
      const numeroMatch = url.match(/\/(\d+)$/);
      if (numeroMatch) {
        try {
          const numero = parseInt(numeroMatch[1]);
          setClienteId(numero)
          return numero;
    
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error('No se encontró un número de cliente en la URL.');
      }
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





    function MASK(form, n, mask, format) {
      if (format == "undefined") format = false;
      if (format || NUM(n)) {
       var dec = 0, point = 0;
       var x = mask.indexOf(".")+1;
        if (x) { dec = mask.length - x; }
    
        if (dec) {
          n = NUM(n, dec)+"";
          x = n.indexOf(".")+1;
          if (x) { point = n.length - x; } else { n += "."; }
        } else {
          n = NUM(n, 0)+"";
        } 
        for (var x = point; x < dec ; x++) {
          n += "0";
        }
       var  x = n.length, y = mask.length, XMASK = "";
        while ( x || y ) {
          if ( x ) {
            while ( y && "#0.".indexOf(mask.charAt(y-1)) == -1 ) {
              if ( n.charAt(x-1) != "-")
                XMASK = mask.charAt(y-1) + XMASK;
              y--;
            }
            XMASK = n.charAt(x-1) + XMASK, x--;
          } else if ( y && "$0".indexOf(mask.charAt(y-1))+1 ) {
            XMASK = mask.charAt(y-1) + XMASK;
          }
          if ( y ) { y-- }
        }
      } else {
         XMASK="";
      }
      if (form) { 
        form.value = XMASK;
        if (NUM(n)<0) {
          form.style.color="#FF0000";
        } else {
          form.style.color="#000000";
        }
      }
      return XMASK;
    }
    
    // Convierte una cadena alfanumérica a numérica (incluyendo formulas aritméticas)
    //
    // s   = cadena a ser convertida a numérica
    // dec = numero de decimales a redondear
    //
    // La función devuelve el numero redondeado
    
    function NUM(s, dec) {
      for (var s = s+"", num = "", x = 0 ; x < s.length ; x++) {
       var c = s.charAt(x);
        if (".-+/*".indexOf(c)+1 || c != " " && !isNaN(c)) { num+=c; }
      }
      if (isNaN(num)) { num = eval(num); }
      if (num == "")  { num=0; } else { num = parseFloat(num); }
      if (dec != undefined) {
       var r=.5; if (num<0) r=-r;
       var e=Math.pow(10, (dec>0) ? dec : 0 );
        return parseInt(num*e+r) / e;
      } else {
        return num;
      }
    }


  //<<<<<<<<___________________________________>>>>>>>>>>>>>

  return (


    <div className={` ${styles.FormPedidos} `}    >
      <div className={styles.ajusteCarrito} >

 
        <h1 className='mb-3 '> Solicitud de Pedido </h1>


        <p> {imagenCarrito} = {totalProductosEnCarrito}</p>
      </div>
      <h4 className='mb-3'> Cliente:  <span>{clientePed}</span> </h4>
  
     
      <h2 className='mb-3' > Seleccionar Articulos : </h2>

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
          >
            Buscar
          </button>
</div>
        
<ul>

{continueConteoProd!=0? (
       
          <li>              
          <Link className='success' 
          href={`/pedidos/confirmarPedido/${encodeURIComponent(clienteId)}/${encodeURIComponent(codigoInterno)}`}
          onClick={continuarPedido} 
          >
            
            Continuar Pedido
          </Link>
</li> 
    
      ):( 
        <li>
       <Link className='success' href={`/pedidos/buscarProductos/${encodeURIComponent(clienteId)}`} scroll={false} prefetch={false}
      
       onClick={ sinSeleccionProductos} 
       >Continuar Pedido</Link>
  
      </li> 
      )}

         <li >
            <Link href="/home" className={styles.linkCancelar} >Cancelar Pedido</Link>
          </li>
     </ul>

      </form>

      <div>    
    </div>
      
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

      {data.length > 0 && formData.numerodeparte !== '' || formData.marca !== 'no' ? (
      <table className={`${styles.TablePedidos} ${styles.lupa} table-responsive table  table-hover  table-bordered border-primary     `}>
        <thead>
          <tr className='text-center'>
            <th scope="col">N°</th>
            <th scope="col">N° de parte </th>
            <th scope="col">Tipo Negocio</th>
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
              <td name="tiponegocio">{producto.tipoDeNegocio}</td>
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
                    value={(precioUnitario[producto.id]) || ''}
                    onChange={(e) => {
                      MASK(this, e.target.value, '-$##,###,##0.00', 1);
                      handlePrecioChange(e, producto.id);
                    }}
                  
                    disabled="true"
                  />


                ) : (
                  <input
                    type="text"
                    name='precioUnitarioInp'
                    placeholder="Ingresa el precio"
                    
                    className={styles.inputCantidad}
                    value={(precioUnitario[producto.id]) || ''}
                    onChange={(e) => {
                      MASK(this, e.target.value, '-$##,###,##0.00', 1);
                      handlePrecioChange(e, producto.id);
                    }}
                  />
                )}

              </td>
              <td className={ styles.alineacionValoresDere}  > {formatNumber(producto.preciominimocop)}</td>
              <td className={ styles.alineacionValoresDere}  >{formatNumber(producto.preciominimousd )}</td>



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

      ): (
  <p>Por favor, seleccione una marca y un número de parte antes de buscar productos.</p>
        )}


</div>


  );
};