'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function FormPedidos() {


const [dataInicial, setDataInicial]=useState([]);
const [data, setData]=useState([]);
const itemsPerPage = 10;
const [currentPage, setCurrentPage] = useState(1);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dataToShow = data.slice(startIndex, endIndex);
const[filtroEstado, setFiltroEstado]=useState()
 
useEffect(() => {
  consultarData();
}, []);


const consultarData = async () => {
  try {
    const response = await axios.get('http://localhost:8082/apiPedidosMps/v1/pedidos/');
    const dataFromApi = response.data;
  
    setData(dataFromApi);
    setDataInicial(dataFromApi);
  } catch (error) {
    console.error(error);
  }
};



console.log(data)

const goToPage = (page) => {
  setCurrentPage(page);
};


const filterData = (originalData, filtro) => {
  if (filtro === '1') {
    // Filtra por "Pendiente Aprobación"
    return originalData.filter(item => item.estado === 'Pendiente Aprobación');
  } else if (filtro === '2') {
    // Filtra por "Aprobado"
    return originalData.filter(item => item.estado === 'Aprobado');
  } else if (filtro === '3') {
    // Filtra por "Cancelado"
    return originalData.filter(item => item.estado === 'Cancelado');
  }
  // En caso de "Seleccione el Estado" o valor no válido, muestra todos los datos
  return originalData;
};


const handleFiltroChange = event => {
  const filtro = event.target.value;
  setFiltroEstado(filtro);
  const datosFiltrados = filterData(dataInicial, filtro);
  setData(datosFiltrados);
  console.log(da)
};



  var imagen=  <Image 
  src="/img/icons8-aprobar-48.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>

  var denegar=  <Image 
  src="/img/icons8-denegar-100.png"
  alt="Picture of the author"
  width={80/2}
  height={50}></Image>

  


  var imageIzquierda = <Image
    src="/img/icons8-flecha-izquierda.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>
var imagenDerecha=<Image 
src="/img/icons8-flecha-derecha-64.png"
alt="Picture of the author"
width={80/2}
height={50}></Image>
  return (


    <div className={` ${styles.FormPedidos} `}    >


      <h1 className='mb-3 '> Control Pedidos y Autorizaciones  </h1>
      <h2 className='mb-3' > Buscar Pedido  :    </h2>

      <form>



      <div className="input-group">
          <span className="input-group-text">Orden pedido </span>

          <input
            className="form-control "
            type="number"
            placeholder="Numero de orden "
            name="todoNombre"
            onChange={handleFiltroChange}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Documento DNI </span>

          <input
            className="form-control "
            type="number"
            placeholder="Ingresar el Nit o CC"
            name="todoNombre"
          
          />
        </div>

        <div className="input-group">
          <span className="input-group-text">Razon Social</span>

          <input
            className="form-control "
            type="text"
            placeholder="Nombre comercial "
            name="nombreComercial"

          />
        </div>

      


        <div className="input-group">
          <span className="input-group-text">Fecha orden  </span>

          <input
            className="form-control "
            type="date"
            placeholder="Ingresar el Nit o CC"
            name="todoNombre"
          
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Estado Pedido   </span>

          <select defaultValue="Seleccione el Estado"  
           className="form-select form-select-lg "
            aria-label=".form-select-lg example"
            
            value={filtroEstado}
            onChange={(e) => {
              const valorFiltro = e.target.value;
              const datosFiltrados = filterData(dataInicial, valorFiltro);
              setData(datosFiltrados) }}
            >
   
   <option value="1">Seleccione el Estado</option>
   <option value="Confirmado">Pendiente Aprobación </option>
   <option value="CONFIRMADO">Aprobado</option>
   <option value="CANCELADO">Cancelado</option>
  </select>
     
        </div>
        

        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="button"
   
onClick={consultarData}
        >
          Buscar
        </button>

        
        </div>
     
     

      </form>
      <p>Pedidos Encontrados : 10 de 10  </p>
      {imageIzquierda}
     {imagenDerecha}

     <table className={`${styles.TablePedidos} table-responsive table table-hover table-bordered border-primary`}>
  <thead>
    <tr className='table-primary'>
      <th scope="col">N°</th>
      <th scope="col">Orden</th>
      <th scope="col">Nit o CC</th>
      <th scope="col">Nombre comercial</th>
      <th scope="col">Valor Total</th>
      <th scope="col">Iva</th>
      <th scope="col">Neto a Pagar</th>
      <th scope="col">Forma de pago</th>
      <th scope="col">Estado</th>
      <th scope="col">Denegar</th>
      <th scope="col">Aprobar</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.numeroPedido}</td>
        <td>{item.dni}</td>
        <td>{item.nombreComercial}</td>
        <td>{item.valorTotal}</td>
        <td>{item.totalIva}</td>
        <td>{item.netoApagar}</td>
        <td>{item.formaDePago}</td>
        <td>{item.estado}</td>
        <td className=' justify-content-center align-items-center'>{denegar}</td>
        <td className='d-flex justify-content-center align-items-center'>{imagen}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};