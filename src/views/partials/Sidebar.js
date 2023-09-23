import iconoTexto from '../../img/icono-texto.png';
import iconoLogotipo from '../../img/icono-logo.png';
import { removerAutorizacion } from '../../config/LocalStorageService';
import { Outlet,NavLink } from 'react-router-dom';
const Sidebar = () => {    
  //NavLink => carga de componentes tipo Ajax    
  
  switch(window.usuario.nivelUsuario){
    case '1': 
      return(
        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
              <div>
                {/*<a href='' className="nav_logo"> <img src={iconoLogotipo} width='25px'></img> <span className="nav_logo-name"> <img src={iconoTexto} width='90px'></img></span> </a>*/}
                <div className="nav_list">
                  <NavLink to="/" className="nav_link"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                  <NavLink to="/importar" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Importar</span> </NavLink>
                  <NavLink to="/orden" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Órdenes</span> </NavLink>
                  <NavLink to="/historial" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Historial</span> </NavLink>
                  <NavLink to="/usuario" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Usuarios</span> </NavLink>
                  <NavLink to=''  className="nav_link"  onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </NavLink>
                  {/*<a className="nav_link"  onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </a>*/}
                </div>
                {/*<a href="#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a>*/}
                {/*<a href="#" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Stats</span> </a>*/}
              </div>
          </nav>
          <Outlet/>
      </div>
      );
      
    case '2': 
      return(
        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
              <div>
                <a href='' className="nav_logo"> <img src={iconoLogotipo} width='25px'></img> <span className="nav_logo-name"> <img src={iconoTexto} width='90px'></img></span> </a>
                <div className="nav_list">
                  <NavLink to="/" className="nav_link"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                  <NavLink to="/importar" className="nav_link"> <i className='bx bx-folder nav_icon'></i> <span className="nav_name">Importar</span> </NavLink>
                  <NavLink to="/orden" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Órdenes</span> </NavLink>
                  <NavLink to="/historial" className="nav_link"> <i className='bx bx-bar-chart-alt-2 nav_icon'></i> <span className="nav_name">Historial</span> </NavLink>
                  <NavLink to="/usuario" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Usuarios</span> </NavLink>
                  <NavLink to=''  className="nav_link"  onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </NavLink>
                  {/*<a href="#" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Bookmark</span> </a>*/}
                </div>
                </div>
          </nav>
          <Outlet/>
      </div>
      );
    case '3': 
    return(
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
              <a href='' className="nav_logo"> <img src={iconoLogotipo} width='25px'></img> <span className="nav_logo-name"> <img src={iconoTexto} width='90px'></img></span> </a>
              <div className="nav_list">
                <NavLink to="/" className="nav_link"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Dashboard</span> </NavLink>
                <NavLink to="/orden" className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Órdenes</span> </NavLink>
                <NavLink to=''  className="nav_link"  onClick={()=>removerAutorizacion()}> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Cerrar Sesión</span> </NavLink>
              </div>
              </div>
        </nav>
        <Outlet/>
    </div>
    );
    default:
      break;  
  }        
}
export default Sidebar;