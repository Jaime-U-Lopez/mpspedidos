
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function FormPedidos() {

  const [selectedRow, setSelectedRow] = useState(null);
  const [cantidadPorItem, setCantidadPorItem] = useState({});
  const [pedidoPorItem, setpedidoPorItem] = useState({});
  const [data, setData] = useState([]);
  const [dataInput, setDataInput] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [formData, setFormData] = useState({
    numerodeparte: '0',
    marca: '',
  });
  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  var totalProductosActuales = data.length;
  var totalProductos = data.length;
  var totalProductosEnCarrito = 0;



  useEffect(() => {
    // Hacer la solicitud para obtener la lista de marcas

    axios
      .get('http://localhost:8082/apiPedidosMps/v1/pedidos/orden/75107724ycma')
      .then((response2) => {
        

        const dataFromApi = response2.data;
       setData([dataFromApi])
       setDataInput(dataFromApi)
       console.log(dataFromApi)
      })


      .catch((error) => {
        console.error(error);
        Swal.fire('Error', 'Sin marcas para seleccionar en Base de datos.', 'error');
      });
  }, []); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas




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
  return (


    <div className={` ${styles.FormPedidos} `}    >

      <div className={styles.ajusteCarrito} >

        <h1 className='mb-3 '> Solicitud de Pedido </h1>
        {imageIzquierda}
        {imagenDerecha}
        <p> {imagenCarrito} = {totalProductosEnCarrito}</p>

      </div>

      <h2 className='mb-3' > Confirmar Pedido :  </h2>

      <form   >

        <div className="input-group">
          <span className="input-group-text">Orden</span>

          <input
            className="form-control "
            type="number"
            placeholder="Numero orden"
            name="todoNombre"
            disabled
            value={dataInput.id}
          />


        </div>
        <div className="input-group">
          <span className="input-group-text">Evento</span>

          <input
            className="form-control "
            type="number"
            placeholder="Nombre Evento"
            name="todoNombre"
            disabled
          />


        </div>

        <div className="input-group">
          <span className="input-group-text">Documento identificacion  </span>

          <input
            className="form-control "
            type="text"
            placeholder="Ingresar el Nit o CC"
            name="todoNombre"
            disabled
            value={dataInput.dni}

          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Razon Social   </span>

          <input
            className="form-control "
            type="text"
            placeholder="Nombre Razon social"
            name="todoNombre"
            disabled
            value={dataInput.nombreComercial}
          />
        </div>
       
        <div className="input-group">
          <span className="input-group-text">Persona de contacto </span>

          <input
            className="form-control "
            type="text"
            placeholder="Ingresa Persona de contacto "
            name="todoNombre"


          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Dirección  </span>
          <input
            className="form-control "
            type="text"
            placeholder="Ingresa la dirección"
            name="todoNombre"

          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Celular de contacto  </span>
          <input
            className="form-control "
            type="text"
            placeholder="Ingresa el Celular"
            name="todoNombre"
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Tel. Fijo de contacto  </span>
          <input
            className="form-control "
            type="number"
            placeholder="Ingresa el numero Fijo"
            name="todoNombre"
            value={dataInput.correoElectronico}

          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Email de contacto </span>

          <input
            className="form-control "
            type="email"
            placeholder="Ingresa el Email de contacto"
            name="todoNombre"
            value={dataInput.correoElectronico}

            
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Total Productos  </span>
          <input
            className="form-control "
            type="number"
            placeholder="Cantidad de Productos a comprar"
            name="todoNombre"
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
          />
        </div>

        <div className="input-group">
          <span className="input-group-text"> Neto a Pagar    </span>
          <input
            className="form-control "
            type="number"
            placeholder="Neto a Pagar "
            name="todoNombre"
            disabled
          />
        </div>

        <div className="input-group">
          <span className="input-group-text"> Forma de pago     </span>
          <select defaultValue="Seleccione el tipo" className="form-select form-select-lg " aria-label=".form-select-lg example">
            <option value="1">Seleccione el Tipo</option>
            <option value="2">Contado </option>
            <option value="3">Credito</option>
            <option value="3">Contado y Credito</option>
          </select>

        </div>
        <div className="input-group">
          <span className="input-group-text"> Estado     </span>

          <input
            className="form-control "
            type="text"
            placeholder="Estado "
            name="todoNombre"

          />
        </div>

        <div className="input-group">
          <span className="input-group-text"> Observaciones     </span>

          <textarea
            className="form-control "
            type="textbox"
            placeholder="Observaciones "
            name="todoNombre"
            rows="4" 

          />
        </div>

        <ul>

          <li >
            <Link href="/pedidos/confirmarPedido" >Confirmar Pedido</Link>
          </li>
          <li >
            <Link href="/pedidos/confirmarPedido" className={styles.linkCancelar} >Cancelar Pedido</Link>
          </li>
        </ul>

      </form>


      <p> Detalle de Productos seleccionados : {totalProductos} de   {totalProductos}   </p>
      {imageIzquierda}
      {imagenDerecha}
      <table className={`${styles.TablePedidos} table-responsive table  table-hover  table-bordered border-primary     `} >

        <thead>

          <tr className="table-primary">
            <th scope="col">N°</th>
            <th scope="col">Numero de parte </th>
            <th scope="col">Nombre Articulo </th>
            <th scope="col">Marca </th>
            <th scope="col" >Unidades </th>
            <th scope="col" >Valor Unit P   </th>
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
                <td>{item.nombre}</td>
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