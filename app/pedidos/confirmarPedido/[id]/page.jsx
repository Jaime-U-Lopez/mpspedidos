
'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import FormPedidosfinal from '@/componentes/Formpedidosfinal'
import NavbarBotones from '@/componentes/NavbarBotones'
import Navbar from '@/componentes/Navbar'
import Flooter from '@/componentes/Flooter'
import axios from 'axios';
import React, { useState , useEffect} from 'react'

export default function ConfirmarPedidos() {





  let iva = 0;
 
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






  var eventop= String(evento)
const datosCliente={

nombre: personaContacto,
Direccion: direccion,
edad: celular,
TelefonoFijo: telefonoFijo,
email: email,
FormaDePago: formaDePago,
Estado: estado,
Observaciones: observaciones
}
console.log(eventop);




  const [data5, setData5] = useState([

    {
      nombre: 'Perez',
      apellido: 'Perez',
      edad: 30,
      email: 'juan@example.com',
    }]
  );

  const [dataObjet, setDataObjet] = useState();
if(data5 ){
 var datosinput= data5[0]
 var nombreComercial=data5.map(item => item.personaContacto);
 var obj={ nombre:nombreComercial}

  console.log(data5);

}


  const data2 = {
    nombre: eventop,
    apellido: 'Perez',
    edad: 30,
    email: 'juan@example.com',
  };

console.log(dataObjet);
  useEffect(() => {

 
    axios
      .get(`http://localhost:8082/apiPedidosMps/v1/pedidos/orden/1020755461PrSD`)
      .then((response2) => {
        

        const dataFromApi = response2.data;
       setData(dataFromApi)
      
        



    })

      .catch((error) => {
        console.error(error);

      });
  }, []); // Este efecto se ejecuta una vez al cargar el componente para obtener la lista de marcas


    


  // Calcular la suma del valor total y el IVA
  data5.forEach((producto) => {
    
    // Suponiendo que el IVA es el 15% del precio (puedes ajustarlo según tus necesidades)
  

    personaContacto= producto.personaContacto,
    direccion= producto.direccion,
    celular= producto.celular
    telefonoFijo= producto.telefonoFijo,
    email= producto.email;
  
    formaDePago= producto.formaDePago,
    estado= producto.estado,
    observaciones= producto.observaciones


  });





  return (
    
    <main className={styles.main}>
  
      <Navbar/>   
      <div className={styles.container}>
        
      <div className={styles.navmenuClienteYProductos}>
        <NavbarBotones />  
      </div>
    
      <div className={styles.ventaderecha}>
      <FormPedidosfinal />
 
      </div>
      
        </div>
        
<div className={styles.flooter}>
<Flooter/>
</div>
    </main>
  )
}
