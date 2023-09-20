import Image from 'next/image'
import styles from 'app/page.module.css'
import FormPedidos from '@/componentes/FormpedidosClientes'
import NavbarBotones from '@/componentes/NavbarBotones'

export default function Home() {
  return (
    <main class={styles.main}>
      <div class={styles.description}>

<nav>

  <p>logo</p>
</nav>

<FormPedidos/>
<NavbarBotones />

              </div>



    </main>
  )
}
