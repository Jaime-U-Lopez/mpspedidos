
import axios from 'axios';


async function fetchData() {
  try {
    const response = await axios.get('http://localhost:8080/api/ruta-de-tu-endpoint');
    // Manejar la respuesta del backend aquí
    console.log(response.data);
  } catch (error) {
    // Manejar errores aquí
    console.error(error);
  }
}

// Llama a la función para realizar la solicitud
fetchData();
