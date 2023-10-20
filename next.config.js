/** @type {import('next').NextConfig} */


module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // Redirige la raíz a la página de inicio de sesión
        permanent: false, // Cambia esto según tus necesidades
      },
    ];
  },
};