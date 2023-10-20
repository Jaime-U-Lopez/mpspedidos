'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function FormPedidos() {


const [dataInicial, setDataInicial]=useState([]);
const [data, setData]=useState([]);
const itemsPerPage = 10;
const [currentPage, setCurrentPage] = useState(1);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, data.length);
const dataToShow = data.slice(startIndex, endIndex);
const[filtroEstado, setFiltroEstado]=useState()
const [numeroPedido, setNumeroPedido] = useState();
const [resultadoBusqueda,  setResultadoBusqueda]=useState(null);

useEffect(() => {
  consultarData();
}, []);


const consultarData = async () => {
  try {
    const response = await axios.get('http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/');
    const dataFromApi = response.data;
  
    setData(dataFromApi);
    setDataInicial(dataFromApi);
  } catch (error) {
    console.error(error);
  }
};




const goToPage = (page) => {
  setCurrentPage(page);
};


const filterData = (originalData, filtro) => {
  
  if (filtro === '1') {

    return originalData.filter(item => item.estado === 'Confirmado');
  } else if (filtro === '2') {
  
    return originalData.filter(item => item.estado === 'sinConfirmacion');
  } else if (filtro === '3') {

    return originalData.filter(item => item.estado === 'aprobado');
  }else if (filtro === '4') {
  
    return originalData.filter(item => item.estado === 'cancelado');

}
return originalData;
}


const buscarPorNumeroPedido = (dato) => {

  const pedidoEncontrado = data.find(item => item.nit === dato);

 
}



const handleFiltroChange = event => {
  const filtro = event.target.value;
  setFiltroEstado(filtro);
  const datosFiltrados = filterData(dataInicial, filtro);
  setData(datosFiltrados);
 
};


const aprobarPedido =async (pedido) => {


  if( pedido.estado!="sinConfirmacion" &&pedido.estado!="cancelado" ){

 Swal.fire({
    icon: 'success',
    title: 'Estas aprobando',
    text: `Pedido :  ${pedido.numeroPedido} `,
    showCancelButton: true,
    confirmButtonText: 'Sí, Aprobar ',
    cancelButtonText: 'No, cancelar',
  }).then(async(result) => {
   
    if (result.isConfirmed) {

      var cod= pedido.codigoInterno;
      const url= `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/email/`
      const pedidoInicial = { codigoInterno: cod,  estado: "aprobado",   correoAsesor: pedido.correoAsesor }
      const response = await axios.post(url,pedidoInicial);
    
    const id  = pedido.id;
    consultarData()


        Swal.fire({
          icon: 'success',
          title: 'Pedido aprobado exitosamente',
          text: `Ha sido aprobado el  Pedido :  ${pedido.numeroPedido} `,
          showConfirmButton: false,
          timer: 2000,
        });
  
    }

  }

  );
  


 


}else {

  Swal.fire({
    icon: 'error',
    title: 'El estado del pedido no esta habilitado o no se puede cambiar',
    showConfirmButton: false,
    timer: 2000,
  });
}




}
const cancelarPedido = async (pedido) => {

  Swal.fire({
    icon: 'warning',
    title: '¿Seguro de Denegar el Pedido?',
    text: `Pedido : ${pedido.numeroPedido} `,
    showCancelButton: true,
    confirmButtonText: 'Sí, Denegar',
    cancelButtonText: 'No, cancelar',

  }).then(async(result) => {
   
    if( pedido.estado!="sinConfirmacion"){

      if (result.isConfirmed) {
  
        var cod= pedido.codigoInterno;
  
    
        const url= `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/email/`
  
        const pedidoInicial = { codigoInterno: cod,  estado: "cancelado",   correoAsesor: "or4846@hotmail.com" }
        const response = await axios.post(url,pedidoInicial);

  consultarData()
   
  
  
         const nuevoProductos = dataInicial.filter((item) => item.id == pedido.id);
        // const idEliminar = dataTable.filter((item) => item.id == producto.id);
  
  
  
          Swal.fire({
            icon: 'success',
            title: 'Pedido Cancelado con Exito',
            text: `Producto cancelado.`,
            showConfirmButton: false,
            timer: 2000,
          });
    
      }

    }  Swal.fire({
      icon: 'error',
      title: 'El estado del pedido no esta habilitado',
      
      showConfirmButton: false,
      timer: 2000,
    });

 
  
  })

};



const pedidosTotales =data.length
var totalProductosActualesTable = dataToShow.length;


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




function formatNumber(number) {
  const formattedNumber = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
  
  return formattedNumber;
}

//--------------------------------------------->



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

            value={filtroEstado}
            onChange={(e) => {
              const valorFiltro = e.target.value;
              buscarPorNumeroPedido(valorFiltro);
        
            
            }}
            

        
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
   
   <option value="0">Seleccione el Estado</option>
   <option value="1">Pendiente Aprobación </option>
   <option value="2">Sin Confirmación </option>
   <option value="3">Aprobado</option>
   <option value="4">Cancelado</option>
  </select>
     
        </div>

        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="button"
   
        onClick={buscarPorNumeroPedido}
        >
          Buscar
        </button>

        
        </div>
     
     

      </form>
      <p>Pedidos Encontrados : {totalProductosActualesTable} de {pedidosTotales}  </p>
   
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
    
      <th scope="col">Aprobar</th>
      <th scope="col">Denegar</th>
    </tr>
  </thead>
  <tbody>
    {dataToShow.map((item, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.numeroPedido}</td>
        <td>{item.dni}</td>
        <td>{item.nombreComercial}</td>
        <td className="align-right" >{formatNumber(item.valorTotal)}</td>
        <td className="align-right" >{formatNumber(item.totalIva)}</td>
        <td className="align-right" >{formatNumber(item.netoApagar)}</td>
        <td>{item.formaDePago}</td>
        <td>{item.estado}</td>
      
        <td className='d-flex justify-content-center align-items-center'

      onClick={() => aprobarPedido(item)}>

      {imagen}</td>
      <td className=' justify-content-center align-items-center'

      onClick={() => cancelarPedido(item)}>
        {denegar}</td>
        <button type="submit" style={{ display: 'none' }}></button>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};