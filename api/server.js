const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Define la ubicación donde se guardarán los archivos

const app = express();

app.post('/api/upload', upload.single('archivo'), (req, res) => {
  // Accede al archivo subido a través de req.file
  // Realiza aquí el procesamiento necesario, como guardar el archivo o realizar otras operaciones
  res.json({ message: 'Archivo subido con éxito' });
});

app.listen(8083, () => {
  console.log('Servidor en ejecución en el puerto 8083');
});