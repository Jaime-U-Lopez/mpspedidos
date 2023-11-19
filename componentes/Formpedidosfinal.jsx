
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2';
import Layout from './Layout';
import numeral from 'numeral';


function FormPedidos({contadorPedidos}) {




  const pathname = usePathname();
  const url = pathname;
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataInicial, setDataInicial] = useState([]);
  const [pedidosEliminados, setPedidosEliminados] = useState([]);
  const [formData, setFormData] = useState({formaPago:""});

  const [isLoading, setIsLoading] = useState(false);
  const [cliente, setCliente] = useState();
  const [clienteId, setClienteId] = useState();

  const [error, setError] = useState(false);
  const [confirmados, setConfirmados] = useState(false);
  const [evento, setEvento] = useState();
  const [datoUser, setDatoUser] = useState();
  const [netoAPagar, setNetoAPagar] = useState();
  const [valorTotal, setValorTotal] = useState();
  const [totalCantidad, setTotalCantidad] = useState();

  const [ivaTotal, setIvaTotal] = useState();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = dataTable.slice(startIndex, endIndex);
  const [bloqueClick , setBloqueClick] = useState(false);
  const [controlCancelar, setControlCancelar] = useState(false);
  

  var totalProductos = data.length;
  var totalProductosEnCarrito = 0;
  const [productoData, setProductoData] = useState({}

  );

  const extraerCodigoInterno= (url) => {
    const numeroMatch = url.split('/');

    if (numeroMatch) {
      try {
        const parametro = numeroMatch[4]
        setCliente(parametro);

      } catch (error) {
        console.error(error);
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'Hubo un error al procesar el identificador del cliente.', 'error');
      }
    }
  }


  useEffect(() => {

  extraerCodigoInterno(url)


 mostraCliente()

   


var dato= sessionStorage.getItem('usernameMPS');
setDatoUser(dato)
    
 
  }, [cliente,clienteId]); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas



const mostraCliente= async ()=>{

  axios
  //.get(`http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/orden/{orden}?orden=${cliente}`)
  .get(`http://localhost:8083/apiPedidosMps/v1/pedidos/orden/{orden}?orden=${cliente}`)
  .then((response2) => {
    const dataFromApi = response2.data;
    setDataInicial(dataFromApi)

console.log(dataFromApi);
   seleccionarPedido(dataFromApi)
   totales(dataFromApi)
   })

  .catch((error) => {
    console.error(error);

  });

  actualizacionDatos(data)
  getEvento()





 
}


const getEvento=()=>{

  axios
  .get(`http://192.190.42.51:8083/apiPedidosMps/v1/eventos/1`)
  //.get(`http://localhost:8083/apiPedidosMps/v1/eventos/1`)
  
  .then((response2) => {
    const dataFromApi = response2.data;
    setEvento(dataFromApi)


   })

  .catch((error) => {
    console.error(error);

  });




}



  const actualizacionDatos = (dataFromApi) => {
    let iva = 0;
    let nombreComercial = "";
    let evento = "";
    let idCliente = 0; 
    let personaContacto = "";
    let direccion = "";
    let celular = "";
    let telefonoFijo = "";
    let email = "";
    let formaDePago = "";
    let estado = "";
    let observaciones = "";
    let id=0;
    let fechaCreacion=""


    dataFromApi.forEach((producto) => {


      nombreComercial = producto.nombreComercial
      personaContacto = producto.personaContacto,
        direccion = producto.direccion,
        celular = producto.celular,
        telefonoFijo = producto.telefonoFijo,
        email = producto.correoElectronico;
      formaDePago = producto.formaDePago,
        estado = producto.estado,
        observaciones = producto.observaciones
        id= producto.dni
        fechaCreacion=getCurrentDate()
    });

    const datosCliente = {
      celular: String(celular),
      correoElectronico: String(email),
      direccion: String(direccion),
      nombreComercial: String(nombreComercial),
      telefonoFijo: String(telefonoFijo),
      personaContacto: String(personaContacto),
      observaciones: String(observaciones),
      estado: String(estado),
      formaPago: String(formaDePago),
      observaciones: observaciones, 
      fechaCreacion:fechaCreacion,
    }
    

    setFormData(datosCliente);
 
    setClienteId(id);
  }


const totales = (data)=>{

  const ivaTotal = data.reduce((total, producto) => total + producto.iva, 0);
  const totalCantidad = data.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = data.reduce((total, producto) => total + producto.valorTotalPorPro, 0);

 

 const netoAPagar = valorTotal + ivaTotal;


 setIvaTotal(ivaTotal);
 setTotalCantidad(totalCantidad);
 setValorTotal(valorTotal);
setNetoAPagar(netoAPagar);

}

 


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

  
  };


  const seleccionarPedido = (dataFech) => {
    setData(dataFech)
   actualizacionDatos(dataFech)
      setDataTable(dataFech)
  };



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
    width={80 / 2}
    height={50}></Image>

  var imagenBasuraDelete = <Image
    src="/img/icons8-basura-llena-100.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>




    function formatNumberWithCurrency(number) {
      const formattedNumber = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      
      return formattedNumber;
    }
    

    function getNumberWithoutCurrency(formattedNumber) {
      return parseFloat(formattedNumber.replace(/[^0-9,.-]/g, '').replace(',', '.'));
    }

    const eliminarDelCarrito = (producto) => {

      Swal.fire({
        icon: 'question',
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar ${formData.numerodeparteTable}  del carrito?`,
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      }).then(async(result) => {
        if (result.isConfirmed) {
      
         

            const id  = producto.id;
 
           await axios.delete(`http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/{id}?id=${id}`);
         //  await axios.delete(`http://localhost:8083/apiPedidosMps/v1/pedidos/{id}?id=${id}`);
    
           const nuevoProductos = dataTable.filter((item) => item.id !== producto.id);
           const nuevoProductosdata = data.filter((item) => item.id !== producto.id);
           setDataTable(nuevoProductos)
           totales(nuevoProductos)
       
           if(nuevoProductos.length==0){
            setDataInicial([])
           }

            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado del carrito',
              text: `${formData.numerodeparteTable} ha sido eliminado del carrito.`,
              showConfirmButton: false,
              timer: 2000,
            });
      
        }
      });
    };
    
    const confirmarPedido = async () => {
     
      setError(false); // Reinicia el estado de error

      const url = pathname;
       
      //enviamos pedido
  
      let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/`;
      //let apiUrl = `http://localhost:8083/apiPedidosMps/v1/pedidos/`;


      const datofijos={valorTotalPedido:valorTotal   , netoApagar: netoAPagar   ,  ivaTotalPed : ivaTotal   }

      const datosEnvioModificado= formData

      const cambiosAenviar = {
        ...datofijos,
        ...datosEnvioModificado,
      };



if(formData.formaPago!="null"){
  if(formData.formaPago!=1){

  if(dataTable.length>0) {
    try {
      setBloqueClick(true)
      const pedidoInicial = { codigoInterno: cliente, datosUpdate: cambiosAenviar , estado: "Confirmado",  evento:evento.nombreEvento, correoAsesor: datoUser }
     console.log(pedidoInicial);
      const response = await axios.patch(apiUrl, pedidoInicial);


      setConfirmados(true)
      
      Swal.fire({
        icon: 'sucess',
        title: 'Cargando exitosamente...',
        text: `Productos confirmados correctamente!`,
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(() => {
        setIsLoading(false);
        Swal.close();

      }, 1500);
  
    
     // setControEnvio(true);
    } catch (error) {
      console.error(error);
      if( formData.estado=="sinConfirmacion" ){
                setBloqueClick(false)
      }

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
  }}
}else{

  Swal.fire('Error', 'Debe seleccionar la forma de pago.', 'error');

}


}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega ceros iniciales para el mes
  const day = String(today.getDate()).padStart(2, '0'); // Agrega ceros iniciales para el día

  return `${year}-${month}-${day}`;
}

const goToPage = (page) => {
  setCurrentPage(page);
};


const cancelarPedido = async()=>{

  if( formData.estado=="sinConfirmacion" ){

  Swal.fire({
    icon: 'question',
    title: '¿Estás seguro de cancelar el pedido? ',
    text: `¿Quieres eliminar ${formData.numeroPedido} ?`,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, guardar para luego continuar',
  }).then(async(result) => {
    if (result.isConfirmed) {
  
        await axios.delete(`http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/codigo/${cliente}`);
       // await axios.delete(`http://localhost:8083/apiPedidosMps/v1/pedidos/codigo/${cliente}`);

        Swal.fire({
          icon: 'success',
          title: 'Pedido eliminado con exito',
          text: `${formData.numeroPedido} ha sido eliminado.`,
          showConfirmButton: false,
          timer: 2000,
        });
  
        setControlCancelar(true);
    }else{

    }
  });


}else{

  Swal.fire({
    icon: 'danger',
    title: 'El pedido no se puede eliminar',
    text: `Este estado no se puede eliminar.`,
    showConfirmButton: false,
    timer: 2000,
  });

}

}


  //<<<<<<<<___________________________________>>>>>>>>>>>>>


  return (
    <Layout>  

    <div className={` ${styles.FormPedidos} `}    >

      <div className={styles.ajusteCarrito} >

        <h1 className='mb-3 '> Solicitud de Pedido </h1>
   
        <p> {imagenCarrito} = {totalCantidad}</p>

      </div>

      <h2 className='mb-3' > Confirmar Pedido :  </h2>

      <form onSubmit={handleSubmit}  >


          <div className="input-group">
            <span className="input-group-text">Orden</span>

            <input
              className="form-control "
              type="text"
              placeholder="Numero orden"
              name="todoNombre"
              disabled
              value={data.length > 0 ? data[0].numeroPedido : ''}
            />
          </div>


          <div className="input-group">
            <span className="input-group-text">Evento</span>

            <input
              className="form-control "
              type="text"
              placeholder="Nombre Evento"
              name="todoNombre"
              disabled
              value={evento ? evento.nombreEvento : ''} 
            />


          </div>




          <div className="input-group">
            <span className="input-group-text">Documento identificacion  </span>

            <input
              className="form-control "
              type="number"
              placeholder="Ingresar el Nit o CC"
              name="todoNombre"
              disabled
              value={data.length > 0 ? data[0].dni : ''} 

            />


          </div>
   

          <div className="input-group">
            <span className="input-group-text">Razon Social   </span>


            <input
              className="form-control"
              type="text"
              id="nombreComercial"
              name="nombreComercial"
              placeholder="Nombre Razon social"
              disabled
              value={formData ? formData.nombreComercial : ''}
              onChange={handleInputChange}
            />


          </div>

    
          <div className="input-group">
            <span className="input-group-text">Persona de Contacto</span>

            <input
              className="form-control"
              type="text"
              id="personaContacto"
              name="personaContacto"
              placeholder="Persona de Contacto"
 
              value={formData ? formData.personaContacto : ''}
              onChange={handleInputChange}
            />

          </div>




          <div className="input-group">
            <span className="input-group-text">Dirección  </span>

            <input
              className="form-control"
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Ingresa la dirección"
  
              value={formData ? formData.direccion : ''}
              onChange={handleInputChange}
            />
          </div>





          <div className="input-group">
            <span className="input-group-text">Celular de contacto  </span>

            <input
              className="form-control"
              type="text"
              id="celular"
              name="celular"
              placeholder="Ingresa la dirección"
              value={formData ? formData.celular : ''}
            
              onChange={handleInputChange}
            />

          </div>




          <div className="input-group">
            <span className="input-group-text">Tel. Fijo de contacto  </span>


            <input
              className="form-control"
              type="text"
              id="telefonoFijo"
              name="telefonoFijo"
              placeholder="Ingresa el numero Fijo"
              value={formData ? formData.telefonoFijo : ''}
              onChange={handleInputChange}
            />

          </div>




          <div className="input-group">
            <span className="input-group-text">Email de contacto </span>



            <input
              className="form-control"
              type="text"
              id="correoElectronico"
              name="correoElectronico"
              placeholder="Ingresa el Email de contacto"
              value={formData ? formData.correoElectronico : ''}
  
              onChange={handleInputChange}
            />


          </div>

        <div className="input-group">
          <span className="input-group-text">Total Productos  </span>



          <input
            className="form-control"
            type="text"
            id="totalCantidad"
            name="totalCantidad"
            placeholder="Cantidad de Productos a comprar"
            value={totalCantidad}
            onChange={handleInputChange}
            disabled
          />




        </div>
 
          <div className="input-group">
            <span className="input-group-text"> Valor Total   </span>
            <input
              className="form-control "
              type="text"
              placeholder="Valor  Total "
              name="todoNombre"
              disabled
              
            value={formatNumberWithCurrency(valorTotal) }
            />
          </div>


   
          <div className="input-group">
            <span className="input-group-text"> Iva total   </span>
            <input
              className="form-control "
              type="text"
              placeholder="Valor Iva Total "
              name="todoNombre"
              disabled
                   
              value={formatNumberWithCurrency(ivaTotal)}
         
            />
          </div>


          <div className="input-group">
            <span className="input-group-text">Neto a pagar</span>

            <input
              className="form-control"
              type="text"
              placeholder="Nombre Comercial"
              name="nombreComercial"
              disabled
              value={formatNumberWithCurrency(netoAPagar) }
            />
          </div>



        <div className="input-group">
          <span className="input-group-text"> Forma de pago     </span>
          <select defaultValue="1"
     
          name="formaPago"
            onChange={handleInputChange}
           className="form-select form-select-lg "
            aria-label=".form-select-lg example"
     
            value={formData ? formData.formaPago : ''}
            >

            <option value="1">Seleccione el Tipo</option>
            <option value="contado">Contado </option>
            <option value="credito">Credito</option>
            <option value="contadoYCredito">Contado y Credito</option>
          </select>

        </div>


          <div className="input-group">
            <span className="input-group-text"> Estado   </span>

            <input
              className="form-control "
              type="text"
              placeholder="Estado "
              name="estado"
              disabled
          
            value={confirmados || formData.estado=="Confirmado"? "Confirmado" :formData.estado } 

              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text"> Fecha   </span>

            <input
              className="form-control "
              type="date"
              placeholder="Fecha "
              name="fechaCreacion"
      
          disabled
            value={
              
              getCurrentDate()
            
            } 

              onChange={handleInputChange}
            />
          </div>
        
        
          <div className="input-group">
            <span className="input-group-text"> Observaciones  </span>

            <textarea
              className="form-control "
              type="textbox"
              placeholder="Observaciones "
              name="observaciones"
              rows="4"
              disabled={ bloqueClick  || formData.estado=="Confirmado"|| formData.estado=="aprobado" || formData.estado=="cancelado"? true :false  } 
              value={formData ? formData.observaciones : ''}
              onChange={handleInputChange}
            />
          </div>
  
        <ul>
            

        <li>
        <div style={{ pointerEvents: confirmados || formData.estado === "Confirmado" || formData.estado=="aprobado" || formData.estado=="cancelado" ? "none" : "auto" }}>
            <Link
              href={`/pedidos/actualizarPedido/${encodeURIComponent(clienteId)}/${encodeURIComponent(cliente)}`}
              scroll={false}
              prefetch={false}
              disabled={ bloqueClick  || formData.estado=="Confirmado"|| formData.estado=="aprobado" || formData.estado=="cancelado"? true :false  } 
       
            >
              Agregar Productos
            </Link>
        </div>
        </li> 
      
        <button     className="btn w100- mt-3 mb-14 btn-primary" type="Button" onClick={() => confirmarPedido()} 
        
        disabled={ bloqueClick  || formData.estado=="Confirmado"|| formData.estado=="aprobado" || formData.estado=="cancelado"? true :false  } 
      
        >
        Confirmar Pedido
          </button>
      

          <li >
      
      {confirmados || formData.estado=="Confirmado"?
        <Link href="/pedidos/buscarCliente"
        className={styles.linkCancelarPedido} >Realizar Nuevo Pedido </Link>
       :
      <button 
      className="btn w100- mt-3 mb-14 btn-danger"
      type="button"
            onClick={cancelarPedido}

      >Eliminar Pedido</button>
       }


      <Link href="/pedidos/buscarCliente"
        className={styles.linkCancelarPedido} >Cancelar  </Link>:<p></p>

        </li>
        </ul>

      </form>


      <p> Detalle de productos en pedido : {totalProductos} de   {totalProductos}   </p>
      

      <div className={styles.btnAtrasAdelante}>

        <button onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}>
          {imageIzquierda}
        </button>
        <button onClick={() => goToPage(currentPage + 1)}
          disabled={endIndex >= data.length}>
          {imagenDerecha}
        </button>
        </div>




      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>

          <tr className="table-primary  'text-center'">
            <th scope="col">N°</th>
            <th scope="col">Numero de parte </th>
            <th scope="col">Tipo Negocio </th>
            <th scope="col">Descripción  </th>
            <th scope="col">Marca </th>
            <th scope="col" >Unid </th>
            <th scope="col" >Precio Unit   </th>
            <th scope="col" >Neto a Pagar PDN </th>
            <th scope="col" >Valor Min COP </th>
            <th scope="col" >Valor Min USD </th>
            <th scope="col" >Iva   </th>
            <th scope="col" > Carrito </th>

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
          <th scope="row">{startIndex + index + 1}</th>
                <td>{item.numerodeparte}</td>
                <td>{item.tipoDeNegocio}</td>

                <td className={styles.descripcionProducto}>{item.descripcion}</td>
                <td>{item.marca}</td>
                <td>{item.cantidad}</td>

                <td className={ styles.alineacionValoresDere} >   {formatNumberWithCurrency(item.valorUnitario)} </td>
                <td className={ styles.alineacionValoresDere} >{formatNumberWithCurrency( item.valorNetoPorProd)}</td>
                <td className={ styles.alineacionValoresDere} >   {formatNumberWithCurrency(getNumberWithoutCurrency(item.preciominimocop))} </td>
                <td className={ styles.alineacionValoresDere} >   {item.preciominimousd} </td>
                <td className={ styles.alineacionValoresDere} >   {formatNumberWithCurrency(item.iva) } </td>
               
                <td >


                {data.includes(item) ? (
                  <button
                    className={styles.StyleIconosForm}
                    onClick={() => eliminarDelCarrito(item)}
               

                    disabled={ bloqueClick  || formData.estado=="Confirmado"|| formData.estado=="aprobado" || formData.estado=="cancelado"? true :false  } 
          
                    >
                    {imagenBasuraDelete}
               
                  </button>
                ) : (
                  <button
                    className={styles.StyleIconosForm}
                   >
               
                  </button>
                )}
              </td>
            
              </tr>

            ))}
          </tbody>
        )}
      </table>
    </div>
    </Layout>
  );


};
export async function getStaticProps() {

  try {
    const response = await fetch(`http://192.190.42.51:8083/apiPedidosMps/v1/productos/marcas/`)
    const info = await res.json();
    return {
      props: {
        info,
      },
    };
  } catch (error) {
    console.log(error);
  }


}

export default FormPedidos;