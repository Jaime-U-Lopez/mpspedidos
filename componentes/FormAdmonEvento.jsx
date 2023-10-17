'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import stylesForm from 'app/form.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function FormAdmonEvento({ onEventCreate }) {


  const [eventName, setEventName] = useState('');

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleCreateEvent = () => {
     onEventCreate(eventName);
     
    setEventName('');
  };






  return (


    <div className={` ${styles.FormPedidos} `}    >


      <h1 className='mb-3 '> Administración Evento  </h1>


      <form>

        <div className="input-group">
          <span className="input-group-text">Nombre Evento</span>

          <input
            className="form-control "
            type="text"
            placeholder="Ingresa el nombre de Evento"
            name="evento"

      
 
          value={eventName}
          onChange={handleEventNameChange}
 
          
          />
        </div>

        


        <div >
        <button
          className="btn w-50 mt-4 mb-3 btn-primary"
          type="button"
         onClick={handleCreateEvent}>

        
          Crear Evento
        </button>
        </div>
            
      </form>
      
    </div>
  );
};