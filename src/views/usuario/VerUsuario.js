import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsuarioForm from "./components/UsuarioForm";

const VerUsuario = () =>{
    const param = useParams();
   
    useEffect(()=>{
        console.log("param:",param);
    },[param]);

    return(
        <UsuarioForm textoAccion={'ver'} > </UsuarioForm>
    );
}
export default VerUsuario;