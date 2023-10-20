import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Button } from "react-bootstrap";
import ModificarArticulo from "./components/ModificarArticulo";
import store from "../../redux/Store";
import { listarArticuloPorId } from '../../redux/ordenVenta/OrdenVentaActions';
import { StatusCodes } from 'http-status-codes';

const ArticuloIndex = () =>{
    const param = useParams();
    const [articulo,setArticulo] =useState({});
    const [resta,setResta] =useState(0);
    const [progreso, setProgreso] =useState();
    const addTableRows = useRef(null);
    const RemoveTableRows = useRef(null);

    useEffect(()=>{
        if((param.id).split("-")[1])busquedaArticulo((param.id).split("-")[1]);  
    },[(param.id).split("-")[1]]);
      
    const busquedaArticulo= async(id)=>{
        try {
            const response = await store.dispatch(listarArticuloPorId(id));
  
            if (response.status === StatusCodes.OK) {	
                setArticulo(response.detalleArticulo);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
           {/* <Breadcrumb>
                <Breadcrumb.Item href="/">
                    Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/orden">
                    Órdenes
                </Breadcrumb.Item>
                <Breadcrumb.Item href={"/detalleorden/"+(param.id).split("-")[1]+"-"+articulo.envio}>
                    {articulo.envio}
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#">
                    {articulo.descripcion}
                </Breadcrumb.Item>
            </Breadcrumb>
            */} 
            <div className="container-fluid">
                <div className="row py-3">
                    <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                        <h5>{articulo.descripcion}</h5>
                    </div>
                    <div className="col-2 text-center m-0 font-weight-bold text-primary">
                        <h5><strong>Total: </strong>{articulo.cantidad}</h5>
                        <h5 style={{backgroundColor:"#ffc107",color:"#fff",borderRadius:"10px"}}>Faltan: {resta}</h5>
                    </div>
                    <div className="col-2 text-center" style={{alignSelf:"center"}}>
                        <Button onClick={()=>addTableRows.current()} className="btn-primary">Agregar +</Button>&nbsp;&nbsp;
                        <Button onClick={()=>RemoveTableRows.current()} className="btn-danger">Quitar -</Button>
                    </div>
                </div>                
            </div>
            <ModificarArticulo articulo={articulo} progreso={(param.id).split("-")[2]} cod={(param.id).split("-")[0]} setArticulo={setArticulo} setResta={setResta} addTableRows={addTableRows} RemoveTableRows={RemoveTableRows}></ModificarArticulo>
        </>
    );
}
export default ArticuloIndex;