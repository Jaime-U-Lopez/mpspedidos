

import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';

export default function FileUploadComponent(){

    const [excelData, setExcelData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const data = await readXlsxFile(file);
      setExcelData(data);
      console.log('Datos del archivo Excel:', data);
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
    }
  };

  return (
    <div>
      <h2>Cargar Archivo Excel</h2>
      <input type="file" onChange={handleFileChange} />
      {excelData && (
        <div>
          <h3>Datos del Archivo Excel:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );



  };

