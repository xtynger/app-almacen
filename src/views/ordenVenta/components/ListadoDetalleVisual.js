import { useEffect, useState } from 'react';
import { eliminarDetalleHijos, listarOrdenDetallePorId, modificarAvanceOrden, modificarOrdenDetalle } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, FormCheck, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus, faDeleteLeft, faEdit, faExclamation, faTimes, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { toastme } from 'toastmejs';
import Swal from 'sweetalert2';

const ListadoDetalleVisual = ({ id, progreso, setProgress, cod }) => {

    const [datosTabla, setDatosTabla] = useState([]);
    const [ordenSeleccionada, setOrdenSeleccionada] = useState({});
    const [rowDataArticulos, setRowDataArticulos] = useState([]);
    const [progresoLocal, setProgresoLocal] = useState();
    const [progresoDb, setProgresoDb] = useState();

    useEffect(() => {
        setTimeout(() => {
            //console.log("muestra", id);
            listaOrdernesServicio(id);
        }, 500);
    }, []);

    const listaOrdernesServicio = async (id) => {
        try {
            const response = await store.dispatch(listarOrdenDetallePorId(id));
            console.log("respons", response.detalleOrden);
            const progressDb = (100 / (response.detalleOrden.filter(item => item.rama == 1).length) * (response.detalleOrden.filter(item => (item.rama == 1) && (item.estado == 5 || item.estado == 6 || item.estado == 8)).length));
            if (response.status === StatusCodes.OK) {
                if (progressDb == 100) setProgresoLocal(progressDb);
                setProgress(progressDb == 0 ? 0 : progressDb);
                setDatosTabla(response.detalleOrden);
                setProgresoDb(progressDb);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const limpiarImputs = () => {
        setTimeout(() => {
            setOrdenSeleccionada({});
            setRowDataArticulos([])
            setProgresoLocal();
            listaOrdernesServicio(id);
        }, 500);
    }

    return (
        <section>

            <div className="container-fluid " id="tabla" role="tabpanel" aria-labelledby="home-tab">
                <Table className="table-sm border-white" responsive bordered hover striped >
                    <thead className="thead-dark bg-dark text-white" >
                        <tr className='align-middle' scope="col" style={{ textAlign: 'center', fontSize: '12px' }}>
                            {/*<th>Id Orden</th>*/}
                            {/*<th scope="col">Id</th> */}
                            {/*<th scope="col" width="50px">Orden</th>*/}
                            <th scope="col" width="50px">Codigo Articulo</th>
                            <th scope="col" style={{ width: '400px' }}>Descripcion</th>
                            <th scope="col" width="50px">N° Lote</th>
                            <th scope="col" width="50px">Ubicacion</th>
                            <th scope="col" width="50px">Id de Pallet</th>
                            <th scope="col" style={{ textAlign: 'center', width: '100px' }}>Fecha de Caducidad</th>
                            <th scope="col" style={{ textAlign: 'center', width: '50px' }}>Cantidad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Opciones</th>
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
                                    ? <td style={{ fontWeight: 'bold', fontSize: '13px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.numeroLote}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.numeroLote}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.ubicacion}</td>
                                    : <td style={{ fontSize: '11px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.ubicacion}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.idPallet}</td>
                                    : <td style={{ fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.idPallet}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold', fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.fechaCaducidad}</td>
                                    : <td style={{ fontSize: '12px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.fechaCaducidad}</td>
                                }
                                {itemDetalle.rama == 1
                                    ? <td style={{ textAlign: 'center', width: '50px', fontWeight: 'bold', fontSize: '15px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent' }}>{itemDetalle.cantidad}</td>
                                    : <td style={{ textAlign: 'center', width: '50px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>{itemDetalle.cantidad}</td>
                                }
                                <td style={{ textAlign: 'center', width: '50px', backgroundColor: itemDetalle.estado==6 ? '#ffc7c7' : 'transparent'}}>
                                    {itemDetalle.estado == 5 || itemDetalle.estado == 8 || itemDetalle.estado == 7
                                        ? <div className="form-check" ><FormCheck disabled={true} checked /> </div>
                                        : <span>Anulado</span>
                                    }
                                </td>

                                <td style={{ textAlign: 'center', width: '100px', fontWeight: 'bold' }}><Button className='btn-warning'><FontAwesomeIcon icon={faExclamation} /></Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="offset-6 col-6">
                <div className='row'>
                    <div className='offset-6 col-6'>
                        <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ListadoDetalleVisual;