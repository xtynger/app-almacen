import { useEffect, useState } from 'react';
import { listarOrdenDetallePorId, modificarOrdenDetalle } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus, faDeleteLeft, faEdit, faExclamation, faTimes, faX } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { toastme } from 'toastmejs';

const ListadoDetalleAdmin = ({ id, progreso, setProgress }) => {

    const [datosTabla, setDatosTabla] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState({});
    const [rowDataArticulos, setRowDataArticulos] = useState([]);
    const [progresoLocal, setProgresoLocal] = useState();

    useEffect(() => {
        //console.log("muestra", id);
        listaOrdernesServicio(id);
    }, []);

    const listaOrdernesServicio = async (id) => {
        try {
           const response = await store.dispatch(listarOrdenDetallePorId(id));
           const progressDb = (100 / (response.detalleOrden.filter(item => item.rama == 1).length) * (response.detalleOrden.filter(item => (item.rama == 1) && (item.estado == 5 || item.estado == 6 || item.estado == 8)).length));
            if (response.status === StatusCodes.OK) {
                if(progressDb==100)setProgresoLocal(progressDb);
                setProgress(progressDb==0?0:progressDb);
                setDatosTabla(response.detalleOrden);
            }
        } catch (error) {
            //console.log(error);
        }
    }
    
    return (
        <section>

            <div className="container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab">
                <Table className="table-sm border-white" responsive bordered hover striped >
                    <thead className="thead-dark bg-dark text-white" >
                        <tr className='align-middle text-center' scope="col">
                            {/*<th>Id Orden</th>*/}
                            {/*<th scope="col">Id</th>*/}
                            {/*<th scope="col">Orden</th>*/}
                            <th scope="col" width="50px">Codigo Articulo</th>
                            <th scope="col" style={{width:'400px'}}>Descripcion</th>
                            <th scope="col" width="50px">N° Lote</th>
                            <th scope="col" width="50px">Ubicacion</th>
                            <th scope="col" width="50px">Id de Pallet</th>
                            <th scope="col"  style={{ textAlign: 'center',width:'100px' }}>Fecha de Caducidad</th>
                            <th scope="col"  style={{ textAlign: 'center',width:'50px' }}>Cantidad</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosTabla.map((itemDetalle, index) =>
                            <tr className='align-middle' scope="row" key={index}>
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.codigoArticulo}</td>
                                    : <td></td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.descripcion}</td>
                                    : <td></td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.numeroLote}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.numeroLote}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.ubicacion}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.ubicacion}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.idPallet}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.idPallet}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.fechaCaducidad}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.fechaCaducidad}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '15px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.cantidad}</td>
                                    : <td style={{ fontSize: '13px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.cantidad}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ textAlign: 'center', width: '50px'}}>
                                        {itemDetalle.estado == 7?
                                        <Button className='btn-warning' disabled style={{fontWeight:'bold', width: '100px'}} ><FontAwesomeIcon icon={faExclamation} /></Button>
                                        :<>
                                            {itemDetalle.estado == 5
                                                ? <Button className='btn-success' disabled style={{fontWeight:'bold', width: '100px'}} ><FontAwesomeIcon icon={faCheck} />&nbsp;&nbsp;&nbsp;Listo</Button>
                                                : <>
                                                    {itemDetalle.estado == 8
                                                        ? <Button className='btn-warning' disabled style={{fontWeight:'bold', width: '100px'}} >Modificado</Button>
                                                        : <Button className='btn-secondary' disabled style={{fontWeight:'bold', width: '100px'}} >Anulado</Button>
                                                    }
                                                </> 
                                            }
                                        </>
                                        }
                                      </td>
                                    :<td style={{ textAlign: 'center', width: '50px'}}>
                                        {itemDetalle.estado == 5 || itemDetalle.estado == 8 || itemDetalle.estado == 7
                                                ? <Button className='btn-success' disabled style={{fontWeight:'bold', width: '100px'}} ><FontAwesomeIcon icon={faCheck} />&nbsp;&nbsp;&nbsp;Listo</Button>
                                                : <Button className='btn-secondary' disabled style={{fontWeight:'bold', width: '100px'}} >Anulado</Button>
                                        }
                                    </td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="container-fluid offset-6 col-6">
                <div className='row'>
                    { progresoLocal==100?
                        <div className='offset-6 col-6'>
                            <NavLink to={"/orden"} className="nav"><Button className='btn-primary col-sm-12'>Orden Finalizada</Button></NavLink>
                        </div>
                        :
                        <div className='offset-6 col-6'>
                            <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Volver</Button></NavLink>
                        </div>
                    }
                    
                </div>  
            </div>
        </section>
    )
}
export default ListadoDetalleAdmin;