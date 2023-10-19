"use client"

import { useEffect } from 'react'
import { router, usePathname, useSearchParams } from 'next/navigation'
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
function ActiveLink({ params, href, ID }) {

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const slug =params 
 
  const search = searchParams.get('slug')

  const style = {
    marginRight: 10,
  
    
  }
 
  const handleClick = (e) => {
    e.preventDefault()
 
  }

  const segment = useSelectedLayoutSegment()
  const isActive = ID === segment

 
console.log(search)
  
useEffect(() => {
  const  url = `${pathname}`
  console.log(url)
  // You can now use the current URL
  // ...
}, [pathname, searchParams])


const url = pathname;

// Utiliza una expresión regular para extraer el número al final de la URL
const numeroMatch = url.match(/\/(\d+)$/);

// Verifica si se encontró un número en la URL
if (numeroMatch) {
  // Extrae el número como una cadena y luego conviértelo a un número entero
  const numero = parseInt(numeroMatch[1]);

  console.log("Número:", numero);
} else {
  console.log("No se encontró un número en la URL.");
}


  return (

    <div>

   

    </div>
   
  )
}
 
export default ActiveLink