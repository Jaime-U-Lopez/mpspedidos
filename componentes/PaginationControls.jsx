

import React from 'react';
import Image from 'next/image'

function PaginationControls({ currentPage, totalItems, itemsPerPage, goToPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);



  var imageIzquierda = <Image
    src="/img/icons8-flecha-izquierda.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>
  var imagenDerecha = <Image
    src="/img/icons8-flecha-derecha-64.png"
    alt="Picture of the author"
    width={80 / 2}
    height={50}></Image>



  return (
    <div>

<p>Resultados Encontrados : {totalPages} de   {totalItems}   </p>

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {imageIzquierda}
      </button>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
       {imagenDerecha}
      </button>
    </div>
  );
}

export default PaginationControls;