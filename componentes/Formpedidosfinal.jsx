
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation'
import Swal from 'sweetalert2';




export default function FormPedidos() {


  const pathname = usePathname();
  const url = pathname;
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState(

  );

  const [isLoading, setIsLoading] = useState(false);
  const [cliente, setCliente] = useState();



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
    axios
      .get(`http://localhost:8082/apiPedidosMps/v1/pedidos/orden/${cliente}`)
      .then((response2) => {

        const dataFromApi = response2.data;
        setData(dataFromApi)

        console.log(dataFromApi)
        actualizacionDatos(dataFromApi);

      })

      .catch((error) => {
        console.error(error);

      });
  }, [cliente]); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas



  console.log(data);
  console.log(formData);




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
    console.log(dataFromApi)
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
    }

    setFormData(datosCliente);

  }



  // Calcular el neto a pagar





  const totalCantidad = data.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = data.reduce((total, producto) => total + producto.valorUnitario, 0);
  const ivaTotal = data.reduce((total, producto) => total + producto.iva, 0);

  const netoAPagar = valorTotal - ivaTotal;




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
    console.log('Datos actualizados:', formData);
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




  //<<<<<<<<___________________________________>>>>>>>>>>>>>


  return (


    <div className={` ${styles.FormPedidos} `}    >

      <div className={styles.ajusteCarrito} >

        <h1 className='mb-3 '> Solicitud de Pedido </h1>
        {imageIzquierda}
        {imagenDerecha}
        <p> {imagenCarrito} = {totalCantidad}</p>

      </div>

      <h2 className='mb-3' > Confirmar Pedido :  </h2>

      <form onSubmit={handleSubmit}  >



        {data && data.length > 0 && (
          <div className="input-group">
            <span className="input-group-text">Orden</span>

            <input
              className="form-control "
              type="text"
              placeholder="Numero orden"
              name="todoNombre"
              disabled
              value={cliente}
            />


          </div>

        )}

        {data && data.length > 0 && (
          <div className="input-group">
            <span className="input-group-text">Evento</span>

            <input
              className="form-control "
              type="text"
              placeholder="Nombre Evento"
              name="todoNombre"
              disabled
              value={data[0].dni}
            />


          </div>
        )}


        {data && data.length > 0 && (
          <div className="input-group">
            <span className="input-group-text">Documento identificacion  </span>

            <input
              className="form-control "
              type="number"
              placeholder="Ingresar el Nit o CC"
              name="todoNombre"
              disabled
              value={data[0].dni}

            />





          </div>
        )}

        {formData && (
          <div className="input-group">
            <span className="input-group-text">Razon Social   </span>


            <input
              className="form-control"
              type="text"
              id="nombreComercial"
              name="nombreComercial"
              placeholder="Nombre Razon social"
              value={formData.nombreComercial}
              onChange={handleInputChange}
            />


          </div>

        )}
        {formData && (
          <div className="input-group">
            <span className="input-group-text">Persona de Contacto</span>

            <input
              className="form-control"
              type="text"
              id="personaContacto"
              name="personaContacto"
              placeholder="Persona de Contacto"
              value={formData.personaContacto}
              onChange={handleInputChange}
            />




          </div>
        )}

        {formData && (

          <div className="input-group">
            <span className="input-group-text">Dirección  </span>

            <input
              className="form-control"
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Ingresa la dirección"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </div>
        )}


        {formData && (

          <div className="input-group">
            <span className="input-group-text">Celular de contacto  </span>


            <input
              className="form-control"
              type="text"
              id="celular"
              name="celular"
              placeholder="Ingresa la dirección"
              value={formData.celular}
              onChange={handleInputChange}
            />




          </div>
        )}


        {formData && (
          <div className="input-group">
            <span className="input-group-text">Tel. Fijo de contacto  </span>


            <input
              className="form-control"
              type="text"
              id="telefonoFijo"
              name="telefonoFijo"
              placeholder="Ingresa el numero Fijo"
              value={formData.telefonoFijo}
              onChange={handleInputChange}
            />




          </div>
        )}


        {formData && (
          <div className="input-group">
            <span className="input-group-text">Email de contacto </span>



            <input
              className="form-control"
              type="text"
              id="correoElectronico"
              name="correoElectronico"
              placeholder="Ingresa el Email de contacto"
              value={formData.correoElectronico}
              onChange={handleInputChange}
            />


          </div>
        )}
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
        {data && data.length > 0 && (
          <div className="input-group">
            <span className="input-group-text"> Valor Total   </span>
            <input
              className="form-control "
              type="number"
              placeholder="Valor  Total "
              name="todoNombre"
              disabled
              value={valorTotal}
            />
          </div>
        )}

        {data && data.length > 0 && (
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
        )}
        {data && data.length > 0 && (
          <div className="input-group">
            <span className="input-group-text">Neto a pagar</span>
            <input
              className="form-control"
              type="text"
              placeholder="Nombre Comercial"
              name="nombreComercial"
              disabled
              value={netoAPagar}
            />
          </div>
        )}


        <div className="input-group">
          <span className="input-group-text"> Forma de pago     </span>
          <select defaultValue="Seleccione el tipo" className="form-select form-select-lg " aria-label=".form-select-lg example">
            <option value="1">Seleccione el Tipo</option>
            <option value="2">Contado </option>
            <option value="3">Credito</option>
            <option value="3">Contado y Credito</option>
          </select>

        </div>

        {formData && (
          <div className="input-group">
            <span className="input-group-text"> Estado   </span>

            <input
              className="form-control "
              type="text"
              placeholder="Estado "
              name="estado"

              disabled
              value={formData.estado}
              onChange={handleInputChange}
            />
          </div>
        )}

        {formData && (
          <div className="input-group">
            <span className="input-group-text"> Observaciones  </span>

            <textarea
              className="form-control "
              type="textbox"
              placeholder="Observaciones "
              name="observaciones"
              rows="4"
              value={formData.observaciones}
              onChange={handleInputChange}
            />
          </div>
        )}
        <ul>

          <li >
        
            <button     className="btn w100- mt-3 mb-14 btn-primary" type="submit">Confirmar Pedido</button>
          </li>
          <li >
            <Link href="/pedidos/confirmarPedido" className={styles.linkCancelarPedido} >Cancelar Pedido</Link>
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
            <th scope="col">Tipo Negocio  </th>
            <th scope="col">Descripción  </th>
            <th scope="col">Marca </th>
            <th scope="col" >Unidades </th>
            <th scope="col" >Precio Unitario   </th>
            <th scope="col" >Valor Unit COP   </th>
            <th scope="col" >Valor Unit USD </th>
            <th scope="col" >Iva   </th>
            <th scope="col" > Carrito </th>

          </tr>
        </thead>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}

                onClick={() => setSelectedRow(item)}
                className={selectedRow === item ? "selectedrow" : ''}
              >
                <th scope="row">{index + 1}</th>
                <td>{item.numerodeparte}</td>
                <td>{item.tipodeNegocio}</td>
                <td>{item.nombreArticulo}</td>
                <td>{item.marca}</td>
                <td>{item.cantidad}</td>

                <td>{item.preciocompra}</td>
                <td>{item.preciocomprausd}</td>
                <td>{item.iva}</td>



              </tr>

            ))}
          </tbody>
        )}


      </table>


    </div>
  );
};