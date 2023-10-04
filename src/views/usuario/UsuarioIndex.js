import {useEffect,useState} from 'react';
import ListadoUsuarios from './components/ListadoUsuarios';
import { Breadcrumb, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons';

const UsuarioIndex = ()=> {

    return (
        <div className="container-fluid p-3">
            <div className="row py-3">
                <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                    <h1><strong>Usuarios</strong></h1>
                    <h3>Listado de Usuarios</h3>
                </div>
                <div className="offset-2 col-2" style={{textAlign: "center",alignSelf:"center"}}>
                    <NavLink to={"/usuario/nuevo"} ><Button className="btn-primary"> Nuevo&nbsp;&nbsp;<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Button></NavLink>
                </div>
            </div>  
            <ListadoUsuarios></ListadoUsuarios>             
        </div>
    )

}


export default UsuarioIndex;