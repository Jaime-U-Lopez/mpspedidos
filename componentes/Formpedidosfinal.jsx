
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2';

import numeral from 'numeral';


export default function FormPedidos() {



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

  let datoUserInitial=  localStorage.getItem(usernameMPS);


  var totalProductos = data.length;
  var totalProductosEnCarrito = 0;
  const [productoData, setProductoData] = useState({}

  );


  const extraerIdCliente = (url) => {
    const numeroMatch = url.match(/\/([^/]+)$/);

    if (numeroMatch) {
      try {
        const parametro = numeroMatch[1].trim();

        setCliente(parametro);
      } catch (error) {
        console.error(error);
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'Hubo un error al procesar el identificador del cliente.', 'error');
      }
    }
  }


  useEffect(() => {

 extraerIdCliente(url)
 mostraCliente()
    
   
     
    
 
  }, [cliente,clienteId]); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas



const mostraCliente=()=>{

  axios
  .get(`http://localhost:8082/apiPedidosMps/v1/pedidos/orden/{orden}?orden=${cliente}`)
  .then((response2) => {
    const dataFromApi = response2.data;
    setDataInicial(dataFromApi)


   seleccionarPedido(dataFromApi)

   })

  .catch((error) => {
    console.error(error);

  });

  actualizacionDatos(data)
  getEvento()
  let datoUserInitial=  localStorage.getItem(usernameMPS);
  setDatoUser(datoUserInitial)
 
}


const getEvento=()=>{


  axios
  .get(`http://localhost:8082/apiPedidosMps/v1/eventos/1`)
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
    let evento = "Evento de ejemplo";
    let idCliente = 123; // ID del cliente
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

 
    // Calcular la suma del valor total y el IVA
    dataFromApi.forEach((producto) => {

      // Suponiendo que el IVA es el 15% del precio (puedes ajustarlo según tus necesidades)
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
        fechaCreacion=producto.fechaCreacion
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
      observaciones: '', 
      fechaCreacion:'',
    }
    

    setFormData(datosCliente);
 
    setClienteId(id);
  }


  const totalCantidad = data.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = data.reduce((total, producto) => total + producto.valorTotalPorPro, 0);
  const ivaTotal = data.reduce((total, producto) => total + producto.iva, 0);
  const netoAPagar = valorTotal + ivaTotal;


  // Manejar cambios en los campos de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes hacer algo con los datos actualizados, como enviarlos a una API.
  
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
    
    // Función para obtener el número sin el signo de pesos
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
      
         
            // Realiza la solicitud DELETE con Axios
            const id  = producto.id;
  
           await axios.delete(`http://localhost:8082/apiPedidosMps/v1/pedidos/{id}?id=${id}`);
    
            // Actualiza el carrito y la lista de cantidades después de eliminar el producto
           const nuevoProductos = dataTable.filter((item) => item.id !== producto.id);
           const idEliminar = dataTable.filter((item) => item.id == producto.id);
           setDataTable(nuevoProductos)
           setData(nuevoProductos)
         
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
  
      let apiUrl = `http://localhost:8082/apiPedidosMps/v1/pedidos/`;



      const datofijos={valorTotalPedido:valorTotal   , netoApagar: netoAPagar   ,  ivaTotalPed : ivaTotal   }

      const datosEnvioModificado= formData

      const cambiosAenviar = {
        ...datofijos,
        ...datosEnvioModificado,
      };



if(formData.formaPago!="null"){

  if(dataTable.length>0) {
    try {
     

      const pedidoInicial = { codigoInterno: cliente, datosUpdate: cambiosAenviar , estado: "Confirmado",  evento:evento, correoAsesor: datoUser }
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

      if (error.response) {
        // Si la respuesta del servidor está presente en el error, accede a ella.
        const responseData = error.response.data.message;
    
        console.log("Mensaje de error:", responseData); // Accede al mensaje de error específico
        console.log("Código de estado:", error.response.status); // Accede al código de estado HTTP (en este caso, 400)
        // Otras propiedades de la respuesta, como headers, statusText, etc., también están disponibles en error.response
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + responseData, 'error');
      } else {
        console.log("Error sin respuesta del servidor:", error.message);
        setError(true); // Establece el estado de error en true
        Swal.fire('Error', 'No se pudo guardar el pedido, error: ' + error.message, 'error');
      }
    } finally {
      setIsLoading(false); // Establece isLoading en false después de la carga

    }
 

  }else{

    Swal.fire('Error', 'Debe seleccionar como minimo un producto.', 'error');
  }
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




const localeColombia = 'es-CO';
const options = {
  maximumFractionDigits: 2,
  

};

const formato = new Intl.NumberFormat(localeColombia, options);










  //<<<<<<<<___________________________________>>>>>>>>>>>>>


  return (


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
              type="number"
              placeholder="Valor  Total "
              name="todoNombre"
              disabled
              
              value={formato.format(valorTotal) }
            />
          </div>


   
          <div className="input-group">
            <span className="input-group-text"> Iva total   </span>
            <input
              className="form-control "
              type="number"
              placeholder="Valor Iva Total "
              name="todoNombre"
              disabled
                   
              value={ivaTotal}
         
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
          <select defaultValue="Seleccione el tipo"
     
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

              value={formData ? formData.observaciones : ''}
              onChange={handleInputChange}
            />
          </div>
  
        <ul>
      

        <li>
        <div style={{ pointerEvents: confirmados || formData.estado === "Confirmado" ? "none" : "auto" }}>
            <Link
              href={`/pedidos/actualizarPedido/${encodeURIComponent(clienteId)}/${encodeURIComponent(cliente)}`}
              scroll={false}
              prefetch={false}
            >
              Agregar Productos
            </Link>
        </div>
        </li> 
      
        <button     className="btn w100- mt-3 mb-14 btn-primary" type="Button" onClick={() => confirmarPedido()} 
        
        disabled={confirmados || formData.estado=="Confirmado"? true :false  } 
        >
        Confirmar Pedido
          </button>
      

          <li >
      
      {confirmados || formData.estado=="Confirmado"?
        <Link href="/pedidos/buscarCliente"
        className={styles.linkCancelarPedido} >Realizar Nuevo Pedido </Link>
       :
       <Link href="/pedidos/buscarCliente"
       className={styles.linkCancelarPedido} >Cancelar Pedido</Link>
     
      }
            </li>
        </ul>

      </form>


      <p> Detalle de Productos seleccionados : {totalProductos} de   {totalProductos}   </p>
      {imageIzquierda}
      {imagenDerecha}
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
            <th scope="col" >Neto a Pagar PDN  </th>
            <th scope="col" >Valor Min COP   </th>
            <th scope="col" >Valor Min USD </th>
            <th scope="col" >Iva   </th>
            <th scope="col" > Carrito </th>

          </tr>
        </thead>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <tbody>


            {dataTable.map((item, index) => (
              <tr key={item.id}

                onClick={() => setSelectedRow(item)}
                className={selectedRow === item ? "selectedrow" : ''}
              >
                <th scope="row">{index + 1}</th>
                <td>{item.numerodeparte}</td>
                <td>{item.tipoDeNegocio}</td>

                <td className={styles.descripcionProducto}>{item.descripcion}</td>
                <td>{item.marca}</td>
                <td>{item.cantidad}</td>

                <td>   {formatNumberWithCurrency(item.valorUnitario)} </td>
                <td>{formatNumberWithCurrency( item.valorNetoPorProd)}</td>
                <td>   {  item.preciominimocop} </td>
                <td>   {item.preciominimousd} </td>
                <td>   {formatNumberWithCurrency(item.iva) } </td>
               
                <td >


                {data.includes(item) ? (
                  <button
                    className={styles.StyleIconosForm}
                    onClick={() => eliminarDelCarrito(item)}
               

                    disabled={confirmados || formData.estado=="Confirmado"? true :false  } 
             
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
  );
};