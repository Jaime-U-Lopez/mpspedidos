'use client';
import Image from 'next/image'
import { useState } from 'react';





export default function FormPedidos() {


  var imagen = <Image
    src="/img/icon-addClient.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>

    const [nit, setNit] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
  
    const handleNitChange = (event) => {
      setNit(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleRememberChange = (event) => {
      setRemember(event.target.checked);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes manejar el envío del formulario
    };

  return (


<div>


<h1>MPS   Control de pedidos </h1>

  <form id="login-form" method="POST" action="https://www.mps.com.co/login">
    <div className="js-form-message form-group">
      <label htmlFor="nit" className="form-label">
        Usuario <span className="text-danger">*</span>
      </label>
      <input
        id="nit"
        type="text"
        className="form-control"
        name="nit"
     
        required=""
      />
    </div>

    <div className="js-form-message form-group">
      <label htmlFor="password" className="form-label">
        Contraseña <span className="text-danger">*</span>
      </label>
      <input
        id="password"
        type="password"
        className="form-control"
        name="password"
        required=""
      />
    </div>

    <div className="d-flex justify-content-between mb-3">
      <div className="custom-control custom-checkbox d-flex align-items-center">
        <input
          className="custom-control-input"
          type="checkbox"
          name="remember"
          id="remember"
        />
        <label htmlFor="remember" className="custom-control-label form-label">
          Recordarme
        </label>
      </div>
    </div>

    <button type="submit" className="btn btn-primary-dark-w px-5 btn-block">
      Ingresar
    </button>
  </form>
</div>
  
  );
};