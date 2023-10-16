import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import { UserProvider } from '@/componentes/UserContext'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MPS Mayorista - Control Pedidos',
  description: 'Portal para el control de pedidos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <UserProvider>
      <body className={inter.class}>{children}</body>
      </UserProvider>
    

    </html>
  )
}
