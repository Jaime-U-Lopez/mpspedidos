'use client';
import Image from 'next/image'
import styles from 'app/page.module.css'
import Link from 'next/link'
import FormAdmonUser from './FormAdmonUser'
import FormAdmonPlanos from './FormAdmonPlanos'
import { useState } from 'react'
import FormAdmonEvento from './FormAdmonEvento';


export default function BotonesAdmon( ) {



  const [habilitarEvento, setHabilitarEvento] = useState(true);
  const [habilitarUsuarios, setHabilitarUsuarios] = useState(false);
  const [habilitarPlanos, setHabilitarPlanos] = useState(false);

  const handleEventoClick = () => {
    setHabilitarEvento(true);
    setHabilitarUsuarios(false);
    setHabilitarPlanos(false);
  };

  const handleUsuariosClick = () => {
    setHabilitarEvento(false);
    setHabilitarUsuarios(true);
    setHabilitarPlanos(false);
  };

  const handlePlanosClick = () => {
    setHabilitarEvento(false);
    setHabilitarUsuarios(false);
    setHabilitarPlanos(true);
  };

  return (
    <div className={styles.admonWeb}>
      <h1>Administración WebSite</h1>
      <div className={styles.btnAdmon}>
        <button onClick={handleEventoClick} disabled={habilitarEvento}>
          Evento
        </button>
        <button onClick={handleUsuariosClick} disabled={habilitarUsuarios}>
          Usuarios
        </button>
        <button onClick={handlePlanosClick} disabled={habilitarPlanos}>
          Planos
        </button>
      </div>

      {habilitarUsuarios && <FormAdmonUser />}
      {habilitarPlanos && <FormAdmonPlanos />}
      {habilitarEvento && <FormAdmonEvento />}
    </div>
  );
}
