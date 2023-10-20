




export default function Layout({ children, home, title, description }) {
    return (
      <div >
       
        <header >
         
          <nav>
          
          </nav>
        </header>
        <main>{children}</main>
      

      </div>
    );
  }
  
  Layout.defaultProps = {
    title: "Mi sitio web con Next",
    description: "Este es un sitio web para aprender con next.js",
  };