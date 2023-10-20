import { useEffect, useState } from 'react';
import { listarArticuloPorId} from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTimes } from '@fortawesome/free-solid-svg-icons';


const ListadoArticulo = ({id}) =>{

    const [datosTabla,setDatosTabla] = useState([]);
    const [articuloSeleccionado,setArticuloSeleccionado] = useState({});

    useEffect(()=>{
        //console.log("muestra",id);
        listaArticuloServicio(id);
    },[]);

    const listaArticuloServicio= async(id)=>{
        try {
            const response = await store.dispatch(listarArticuloPorId(id));
            //console.log("listaArticulo",response.detalleArticulo);

            if (response.status === StatusCodes.OK) {	
                setDatosTabla(response.detalleArticulo);
            }
        } catch (error) {
            //console.log(error);
        }
    }
    const seleccionarArtiuclo=(itemDetalle)=>{
        setArticuloSeleccionado(itemDetalle);
        document.getElementById("li-articulo-" + itemDetalle.idArticulo).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"   
        if (Object.keys(articuloSeleccionado).length !== 0) {
            document.getElementById("li-articulo-" + itemDetalle.idArticulo).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
        }            
    }

    return(
        <>         
            <div className="table-bordered container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab">
            <Table className="table" responsive bordered hover>
                <thead className="thead-dark bg-dark text-white" >
                    <tr>
                    {/*<th>Id Orden</th>*/}
                    <th>Id</th>
                    <th>Orden</th>
                    <th>Codigo de Articulo</th>
                    <th>Descripcion</th>
                    <th>Numero de Lote</th>
                    <th>Ubicacion</th>
                    <th>Id de Pallet</th>
                    <th>Fecha de Caducidad</th>
                    <th>Cantidad</th>
                    {/*<th>Reservado</th>*/}
                    <th></th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map((itemDetalle, index) =>
                    <tr key={index}>
                        <td>{itemDetalle.idArticulo}</td>
                        <td>{itemDetalle.envio}</td>
                        <td>{itemDetalle.codigoArticulo}</td>
                        <td>{itemDetalle.descripcion}</td>
                        <td>{itemDetalle.numeroLote}</td>
                        <td>{itemDetalle.ubicacion}</td>
                        <td>{itemDetalle.idPallet}</td>
                        <td>{itemDetalle.fechaCaducidad}</td>
                        <td>{itemDetalle.cantidad}</td>
                        <td>
                        <div className="form-check">
                            {/*<input className="form-check-input" type="checkbox" value="1" id="checkdetalle" onChange={()=>this.contarProgreso()}/> */}
                            <input className="form-check-input" type="checkbox" id="checkdetalle" onChange={(e)=>cambiarProgreso(e)} />
                        </div>
                        </td>
                        <td><Button onClick={() => this.mostrarActualizar(itemDetalle)} ><FontAwesomeIcon icon={faCirclePlus} /></Button></td>
                        <td><Button onClick={() => this.mostrarEliminar(itemDetalle)}> <FontAwesomeIcon icon={faTimes}   /></Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            </div>
        </>
        )
}
export default ListadoArticulo;