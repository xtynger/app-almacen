import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ListadoArticulo from "./components/ListadoArticulo";
import ListadoDetalle from "./components/ListadoDetalle";
const DetalleArticuloIndex = () =>{
    const param = useParams();

    useEffect(()=>{
        console.log("ListadoArticulo", (param.id).split("-")[1]);
    },[]);
    return(
        <>
           {/* <Breadcrumb>
                <Breadcrumb.Items>
                    <Breadcrumb.Item href="/">
                        Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/orden">
                        Órdenes
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="#">
                        Detalle
                    </Breadcrumb.Item>
                </Breadcrumb.Items>
            </Breadcrumb>
             */} 
            <div className="container-fluid" style={{backgroundColor:'#ffffff'}}>
                <div className="row pt-3">
                    <div className="col m-0 font-weight-bold text-primary pb-3">
                        <h3><strong>Detalle de Articulo</strong></h3>
                        <h3>Listado de artículo</h3>
                    </div>
                </div>                
            </div>
            <ListadoArticulo id={(param.id).split("-")[1]}></ListadoArticulo>
        </>
    );
}
export default DetalleArticuloIndex;