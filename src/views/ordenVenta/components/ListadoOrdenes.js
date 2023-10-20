import { useEffect, useState } from 'react';
import { listarOrden } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';



const ListadoOrdenes = () =>{

    const [datosTabla,setDatosTabla] = useState([]);
    const [ordenSeleccionada,setOrdenSeleccionada] = useState({});
    useEffect(()=>{
        //console.log("muestra");
        listaOrdernesServicio();
        
    },[]);

    const listaOrdernesServicio= async()=>{
        try {
            const response = await store.dispatch(listarOrden());
            //console.log("listaOrden",response.listaOrden);

            if (response.status === StatusCodes.OK) {	
                setDatosTabla(response.listaOrden);
            }
        } catch (error) {
            //console.log(error);
        }
    }
    const seleccionarOrden=(itemOrden)=>{
        setOrdenSeleccionada(itemOrden);
        document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"   
        if (Object.keys(ordenSeleccionada).length !== 0) {
            document.getElementById("li-orden-" + ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        }            
    }
    const mostrarEliminar=()=>{
        
    }

    return(
            <div className="table-bordered" id="tabla" role="tabpanel" aria-labelledby="home-tab" >
                <table id="tabla" className="table" >
                    <thead id="thead" className="table thead-dark">
                        <tr>
                            <th>Id Orden</th>
                            <th>Orden</th>
                            <th>Id Cliente AX</th>
                            <th>Nombre Cliente</th>
                            <th>Referencia</th>
                            <th>Asignado por</th>
                            <th>Completado por</th>
                            <th>Fecha de Subida</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha Terminado</th>
                            <th>Estado</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosTabla.map(itemOrden =>
                            <tr key={itemOrden.idOrden}
                                id={"li-orden-" + itemOrden.idOrden}
                                onClick={() => seleccionarOrden(itemOrden)}>
                                <td>{itemOrden.idOrden}</td>
                                <td>{itemOrden.envio}</td>
                                <td>{itemOrden.idClienteAx}</td>
                                <td>{itemOrden.nombreCliente}</td>
                                <td>{itemOrden.referencia}</td>
                                <td>{itemOrden.asignadoPor}</td>
                                <td>{itemOrden.asignadoA}</td>
                                <td>{itemOrden.fechaSubida}</td>
                                <td>{itemOrden.fechaInicio}</td>
                                <td>{itemOrden.fechaCompletado}</td>
                                <td>{itemOrden.estado}</td>
                                <td><i className='bx bxs-edit' data-bs-toggle="modal" data-bs-target="#exampleModalCenter" ></i></td>
                                <td><i className='bx bx-x' onClick={() => mostrarEliminar(itemOrden)}></i></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
}
export default ListadoOrdenes;