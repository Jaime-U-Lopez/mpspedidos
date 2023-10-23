'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useUser } from './UserContext';
import { locale } from 'numeral';



export default function FormPedidos( {autorizacion}) {



const [dataInicial, setDataInicial]=useState([]);
const [data, setData]=useState([]);

const [currentPage, setCurrentPage] = useState(1);
const [pageSize] = useState(10);
const [page, setPage] = useState(1);
const startIndex = (page - 1) * pageSize;
const endIndex = startIndex + pageSize;
const dataToShow = data.slice(startIndex, endIndex);
const[filtroEstado, setFiltroEstado]=useState()
const [numeroPedido, setNumeroPedido] = useState();
const [resultadoBusqueda,  setResultadoBusqueda]=useState(null);
const [autorizado,setAutorizado]=useState(true)
const [error,setError]=useState(false)
const [formData, setFormData] = useState({

  dni: '',
  nombreComercial: '',
  numeroPedido: '',
  fecha: '',

});

const handleChange = (e) => {

  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

};

const { state, dispatch } = useUser();


const { username } = state;



console.log(data)  

useEffect(() => {
  consultarData();
  validacionRol();
}, []);


const consultarData = async () => {
  try {
  // const response = await axios.get('http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/');
    const response = await axios.get('http://localhost:8083/apiPedidosMps/v1/pedidos/');
    const dataFromApi = response.data;
  
    setData(dataFromApi);
    setDataInicial(dataFromApi);
  } catch (error) {
    console.error(error);
  }
};


const validacionRol = async () => {
  var nombre = sessionStorage.getItem('usernameMPS');

  try {
    const response = await axios.get(`http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
   // const response = await axios.get(`http://localhost:8083/apiPedidosMps/v1/usuarios/usuario/${nombre}`);
    const info = response.data;


    if(info.rol==="Cartera") {
      setAutorizado(false)
    }



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



const filterDatas = () => {


  if (formData.numeroPedido.trim() != '') {
  
  const buscar = parseInt(formData.numeroPedido);
  const dt= dataInicial.filter((item) => item.numeroPedido === buscar);
  setData(dt) 

};

if (formData.dni.trim() != '') {

  const buscar = parseInt(formData.dni);
  const dt= dataInicial.filter((item) => item.dni === buscar);
  setData(dt) 

};

if (formData.nombreComercial.trim() != '') {
  
  const buscar = formData.nombreComercial.toLowerCase()

  const dt= dataInicial.filter((item) => item.nombreComercial.toLowerCase().includes(buscar));

  setData(dt) 

};


if (formData.fecha.trim() != '') {
  
  const buscar = formData.fecha
  console.log(buscar)
  const dt= dataInicial.filter((item) => item.fechaCreación===buscar);
  console.log(dt)
  setData(dt) 

};

if (formData.fecha.trim() === ''
&& formData.nombreComercial.trim() === ''
&& formData.dni.trim() === ''
&& formData.numeroPedido.trim() === ''
) {


  setData(dataInicial) 

}



}



const handleFiltroChange = event => {
  const filtro = event.target.value;
  setFiltroEstado(filtro);
  const datosFiltrados = filterData(dataInicial, filtro);
  setData(datosFiltrados);
 
};


const aprobarPedido =async (pedido) => {


  if( pedido.estado!="sinConfirmacion" && pedido.estado!="cancelado" ){
if( pedido.estado!="aprobado"){
 Swal.fire({
    icon: 'success',
    title: 'Estas aprobando',
    text: `Pedido :  ${pedido.numeroPedido} `,
    showCancelButton: true,
    confirmButtonText: 'Sí, Aprobar ',
    cancelButtonText: 'No, cancelar',
  }).then(async(result) => {
   
    if (result.isConfirmed) {

      try {
       
        var nombre = sessionStorage.getItem('usernameMPS');
      var cod= pedido.codigoInterno;
     // const url= `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/email/`
      const url= `http://localhost:8083/apiPedidosMps/v1/pedidos/email/`
      
      const pedidoInicial = { codigoInterno: cod,  estado: "aprobado",   correoAsesor: pedido.correoAsesor }
       const response = await axios.post(url,pedidoInicial);
console.log(pedidoInicial)       
     const id  = pedido.id;
     consultarData()
         Swal.fire({
           icon: 'success',
           title: 'Pedido aprobado exitosamente',
           text: `Ha sido aprobado el  Pedido :  ${pedido.numeroPedido} `,
           showConfirmButton: false,
           timer: 2000,
         });
   
     
       
      } catch (error) {
        console.error(error);

        if (error.response) {
           const responseData = error.response.data.message;
      
          console.log("Mensaje de error:", responseData); 
          console.log("Código de estado:", error.response.status); 
          setError(true); 
          Swal.fire('Error', 'No se pudo aprobar la  orden , error: ' + responseData, 'error');
        } else {
          console.log("Error sin respuesta del servidor:", error.message);
          setError(true); 
          Swal.fire('Error', 'No se pudo aprobar la  orden , error: ' + error.message, 'error');
        }
      } 

    }});
}else {

  Swal.fire({
    icon: 'error',
    title: 'El estado del pedido ya figura aprobado',
    showConfirmButton: false,
    timer: 2000,
  });
}

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

  if( pedido.estado!="sinConfirmacion" && pedido.estado !="aprobado" ){
    if( pedido.estado!="cancelado"){
  Swal.fire({
    icon: 'warning',
    title: '¿Seguro de Denegar el Pedido?',
    text: `Pedido : ${pedido.numeroPedido} `,
    showCancelButton: true,
    confirmButtonText: 'Sí, Denegar',
    cancelButtonText: 'No, cancelar',

  }).then(async(result) => {
   
      if (result.isConfirmed) {
        var cod= pedido.codigoInterno;
  
       // const url= `http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/email/`
        const url= `http://localhost:8083/apiPedidosMps/v1/pedidos/email/`

        const pedidoInicial = { codigoInterno: cod,  estado: "cancelado",   correoAsesor: pedido.correoAsesor}
        const response = await axios.post(url,pedidoInicial);
        consultarData()
         const nuevoProductos = dataInicial.filter((item) => item.id == pedido.id);

          Swal.fire({
            icon: 'success',
            title: 'Pedido Cancelado con Exito',
            text: `Pedido cancelado.`,
            showConfirmButton: false,
            timer: 2000,
          });
    
      }

  
  })

} else {
    Swal.fire({
      icon: 'error',
      title: 'El estado del pedido ya figura cancelado',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  


}else {
  Swal.fire({
    icon: 'error',
    title: 'El estado del pedido no esta habilitado o no se puede cambiar',
    showConfirmButton: false,
    timer: 2000,
  });
}

}

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
            name="numeroPedido"
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Documento DNI </span>

          <input
            className="form-control "
            type="number"
            placeholder="Ingresar el Nit o CC"
            name='dni'
            onChange={handleChange}
          
          />
        </div>
  

        <div className="input-group">
          <span className="input-group-text">Razon Social</span>

          <input
            className="form-control "
            type="text"
            placeholder="Nombre comercial "
            name="nombreComercial"
            onChange={handleChange}
          />
        </div>

    
        <div className="input-group">
          <span className="input-group-text">Fecha orden  </span>

          <input
            className="form-control rounded-lg shadow bg-primary text-white"
            type="date"
            placeholder="Ingresar el Nit o CC"
            name="fecha"
            onChange={handleChange}
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
   
        onClick={filterDatas}
        >
          Buscar
        </button>

        </div>
    
      </form>
      <p>Pedidos Encontrados : {totalProductosActualesTable} de {pedidosTotales}  </p>
   
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
      <th scope="col">Confirmar</th>
      <th scope="col">Aprobar</th>
      <th scope="col">Denegar</th>
   

    </tr>
  </thead>
  <tbody>
    {dataToShow.map((item, index) => (
      <tr key={index}>
   <th scope="row">{startIndex + index + 1}</th>
        <td>{item.numeroPedido}</td>
        <td>{item.dni}</td>
        <td>{item.nombreComercial}</td>
        <td className={ styles.alineacionValoresDere} >{formatNumber(item.valorTotal)}</td>
        <td className={ styles.alineacionValoresDere}  >{formatNumber(item.totalIva)}</td>
        <td className={ styles.alineacionValoresDere} >{formatNumber(item.netoApagar)}</td>
        <td>{item.formaDePago}</td>
        <td>{item.estado}</td>
        <td     className=' justify-content-center align-items-center'>
          
   
          <Link    
          href={`/pedidos/confirmarPedido/${encodeURIComponent(item.dni)}/${encodeURIComponent(item.codigoInterno)}`} scroll={false} prefetch={false}>ir</Link>
        
           </td>

        <td className='d-flex justify-content-center align-items-center'>
    
        <button
          className={styles.StyleIconosForm}
          onClick={() => aprobarPedido(item)}

          disabled={autorizado ? true :false  } 
          >
          {imagen}
      
        </button>
      
      </td>
      <td className=' justify-content-center align-items-center' >

      <button
          className={styles.StyleIconosForm}
          onClick={() => cancelarPedido(item)}

          disabled={autorizado ? true :false  } 
          >
      {denegar}
      
        </button>

        </td>

      </tr>
    ))
    
 
    }
  </tbody>
</table>

    </div>


  );



};