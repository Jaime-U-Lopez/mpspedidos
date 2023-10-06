import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MPS Mayorista - Control Pedidos',
  description: 'Portal para el control de pedidos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
     
      <body className={inter.class}>{children}</body>

    

    </html>
  )
}
