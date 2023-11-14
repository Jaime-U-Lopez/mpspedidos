'use client';

import axios from 'axios';
import styles from 'app/page.module.css';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';


export default function TablaConsulta({data}) {

 
const [formData, setFormData] = useState({

  valorConsulta:0,
});

const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10); 



const handleChange = (e) => {

  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

};

  const [dataConsulta, setDataConsulta]=useState([]);

  useEffect(() => {
    consultaPersonalizada();

  }, [page, pageSize]);
  

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPageSize(newSize);
    setPage(1); 
  };


const consultaPersonalizada = async () => {

  try {
    
   // const response = await axios.get(`http://192.190.42.51:8083/apiPedidosMps/v1/pedidos/consulta/valor/{valor}?valor=${formData.valorConsulta}`);
    
    const response = await axios.get(`http://localhost:8083/apiPedidosMps/v1/pedidos/consulta/valor/{valor}?valor=${formData.valorConsulta}`);
      const info = response.data;

      setDataConsulta(info);
     

  } catch (error) {
    console.error(error);
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


  function formatNumberTabla(number) {
    if (typeof number !== 'number') {
    
      number = parseFloat(number);
    }
  
    return number.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetJS');

    XLSX.writeFile(workBook, 'DataSheet.xlsx');
  };


  const exportToExcel= () => {
    
    const table = document.getElementById('myTable');
    const rows = Array.from(table.querySelectorAll('tr'));
    const textData = rows.map(row => Array.from(row.children).map(cell => cell.textContent.trim()));
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.aoa_to_sheet(textData);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetJS');
    XLSX.writeFile(workBook, 'DataSheet.xlsx');

  };
   
  

  const totalClientes = dataConsulta.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const usersToDisplay = dataConsulta.slice(startIndex, endIndex);

  var totalClientesActuales = usersToDisplay.length;

  const valorTotal = dataConsulta.reduce((total, pedidos) => total + pedidos.totalPagado, 0);

//<________________________________________________________>

  return (

    
    <div  className={styles.TablePedidos}  >

        <div className={styles.FormPedidos}>
        <h2 className='mb-3'>Acumulado de Pedidos Aprobados:</h2>
      <p>Valor acumulado actual : {formatNumber(valorTotal)}</p>

        </div>
      <form>

      <div>
              <div className="input-group">
                <span className="input-group-text">Valor  </span>
                <input
                  className="form-control "
                  type="number"
                  placeholder="Ingresa el valor total  "
                  name="valorConsulta"
                  onChange={handleChange}
                />
              </div>
      </div>        

      <div >
          <button
            className="btn w-40 mt-4 mb-3 btn-primary"
            type="button"
            onClick={consultaPersonalizada}
          >
            Consulta Consolidado
          </button>




      </div>
      <button
      className="btn w-40 mt-2 mb-3 btn-success"
            
      onClick={exportToExcel}>Descargar a Excel</button>


    <p>Clientes Encontrados : {totalClientesActuales} de   {totalClientes}   </p>

    <div>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5 líneas</option>
          <option value={10}>10 líneas</option>
          <option value={20}>20 líneas</option>
          <option value={50}>50 líneas</option>
          <option value={150}>150 líneas</option>
          <option value={1000}>1000 líneas</option>
        </select>
      </div>  

      </form>



      <table  id="myTable" className="table table-responsive table table-hover table-bordered border-primary">
        <thead>
          <tr className="table-primary">
            <th scope="col">N°</th>
            <th scope="col">N° identificacion</th>
            <th scope="col">Nombre Comercial</th>
            <th scope="col">Estado</th>
            <th scope="col">Conteo Pedidos</th>
            <th scope="col">Total a pagar sin iva</th>
            <th scope="col">Unid Totales</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((pedidos, index) => (
            <tr key={pedidos.id}>
              <th scope="row">{startIndex + index + 1}</th>
              <td className={ styles.alineacionValoresDere}>{pedidos.dni}</td>
              <td>{pedidos.nombreComercial}</td>
              <td  className="text-center" >{pedidos.estado}</td>
              <td>{pedidos.conteoPedidos}</td>

              <td className={ styles.alineacionValoresDere}  >{formatNumberTabla(pedidos.totalPagado )}</td>

            
              <td className="text-center" >{pedidos.unidadesAcumuladas}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

   


      {/* Controles de paginación */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} disabled={endIndex >= dataConsulta.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}