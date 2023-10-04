import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import store from "../../redux/Store";
import UsuarioForm from "./components/UsuarioForm";
 

const EditarUsuario = () =>{
    const param = useParams();
   
    useEffect(()=>{
        console.log("param:",param.id);
    },[param]);
    const cargaInfo = async()=>{
       
    }

    return(
        <div className="container-fluid pt-3 ">
            <div className="row py-3 text-center">
                <div className="col m-0 font-weight-bold text-primary pb-3">
                    <h1><strong>Editar</strong></h1>
                    <h3>Usuario</h3>
                </div>
            </div>
            <UsuarioForm accion={'editar'} id={param.id}></UsuarioForm>
        </div>
);
}
export default EditarUsuario;