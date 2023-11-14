'use client';
import Image from 'next/image'
import { useState, useHistory} from 'react';
import styles from 'app/page.module.css'

import axios from 'axios';
import Swal from 'sweetalert2';
import { UserProvider, useUser } from './UserContext';
import  {useAuth } from './UserContext';

export default function FormLogin() {

  //const { state, dispatch } = useUser();
  const { setUser, login , state} = useAuth();



 
  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e });
  };

  const handleSaveUsername = () => {
   
    const { username } = state;
    localStorage.setItem('username', username); 
  
  };


  //const {setUser}  = useUser();
  

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
  
    const handleUsuarioChange = (event) => {

      const { username } = state;
      localStorage.setItem('username', username); 
      setUsuario(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleRememberChange = (event) => {
      setRemember(event.target.checked);
    };
  

    const validacionLogin = async(e) => {
      e.preventDefault();

      const { username } = state;
      sessionStorage.setItem('username', username); 




      //let apiUrl = `http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/validarUser`;
      let apiUrl = `http://localhost:8083/apiPedidosMps/v1/usuarios/validarUser`;

      const usuarioSt= `${usuario}`;

     
         try {
           const validacion = { usuario: usuario, password: password }
           const response = await axios.post(apiUrl, validacion);

           sessionStorage.setItem('usernameMPS', usuarioSt);
           sessionStorage.setItem('isLoggedIn', 'true');
           await login(validacion.usuario, validacion.password);

           const { username } = state;
           //state="prueba"

           Swal.fire({
             title: 'Validación exitosa...',
             allowOutsideClick: false,
             onBeforeOpen: () => {
               Swal.showLoading();
             },
           });
           setTimeout(() => {
         
             Swal.close();
             window.location.href = '/home'; 

           }, 500);
          
           setUser(validacion.usuario);

         } catch (error) {
           console.error(error);
   
           if (error.response) {
            
             const responseData = error.response.data.message;
         
             console.log("Mensaje de error:", responseData); 
             console.log("Código de estado:", error.response.status); 
             
            
             Swal.fire('Error', 'Sin credenciales validas : '+responseData);
           } else {
             console.log("Error sin respuesta del servidor:", error.message);
           }
         } finally {
        
         }
       
     };


  return (

<div
  className={` ${styles.loginGeneral} d-flex justify-content-center align-items-center`}>
<div 
  className={` ${styles.loginTitle} `}

>
<h1   >MPS Control de pedidos </h1>




</div>


  <form id="login-form" 
  className={` ${styles.login} `}
  //method="POST" action="http://192.190.42.51:8083/apiPedidosMps/v1/usuarios/validarUser">
  method="POST" action="http://localhost:8083/apiPedidosMps/v1/usuarios/validarUser">
    <div className="">
      <label htmlFor="usuario" className="form-label">
        Usuario <span className="text-danger">*</span>
      </label>
      <input
        id="usuario"
        type="text"
        className={`${styles.loginGeneralinput} form-control text-black`}  style={{ color: 'black' }}

        name="usuario"
     
        required=""
        value={usuario}
        onChange={handleUsuarioChange}
      />
    </div>

    <div className="">
      <label htmlFor="password" className="form-label">
        Contraseña <span className="text-danger">*</span>
      </label>
      <input
        id="password"
        type="password"
        className="form-control"
        name="password"
        required=""
        value={password}
        onChange={handlePasswordChange}
      />
    </div>

    <div className="d-flex justify-content-between mb-3">
      <div className="custom-control custom-checkbox d-flex align-items-center">
        <input
         className="custom-control-input"
         type="checkbox"
         name="remember"
         id="remember"
         checked={remember}
         onChange={handleRememberChange}
        />
        <label htmlFor="remember" className="custom-control-label form-label">
          Recordarme
        </label>
      </div>
    </div>
    <button
        type="button"
    onClick={validacionLogin}

    className="btn w40- mt-4 mb-3 btn-primary"
    >
      Ingresar
    </button>
    <ul>
 
</ul>
  </form>

</div>
  
  );
};