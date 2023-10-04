import {useEffect,useState} from 'react';
import { Breadcrumb } from "react-bootstrap";
import UsuarioForm from './components/UsuarioForm';

const NuevoUsuario = ()=> {

    return (
        <div className="container-fluid pt-3 ">
            <div className="row py-3 text-center">
                <div className="col m-0 font-weight-bold text-primary pb-3">
                    <h1><strong>Nuevo</strong></h1>
                    <h3>Usuario</h3>
                </div>
            </div>
            <UsuarioForm accion={'nuevo'}></UsuarioForm>
        </div>
    )

}

export default NuevoUsuario;