import { writeFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'querystring';
import { xlsx } from 'xlsx';

export default async (req, res) => {
  // Genera el contenido del archivo Excel
  const data = [
    ['Nombre', 'Edad'],
    ['Ejemplo 1', 25],
    ['Ejemplo 2', 30],
  ];

  const ws = xlsx.utils.aoa_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Hoja1');

  const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

  // Guarda el archivo en el servidor (opcional)
  const filePath = join(process.cwd(), 'public', 'example.xlsx');
  await writeFile(filePath, excelBuffer);

  // Configura las cabeceras de la respuesta para la descarga del archivo
  res.setHeader('Content-Disposition', 'attachment; filename=example.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.end(excelBuffer);
};