import { useEffect, useState } from 'react';
import { eliminarDetalleHijos, listarOrdenDetallePorId, modificarAvanceOrden, modificarFechaApertura, modificarOrdenDetalle } from '../../../redux/ordenVenta/OrdenVentaActions';
import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, FormCheck, ProgressBar, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus, faDeleteLeft, faEdit, faTimes, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { toastme } from 'toastmejs';
import Swal from 'sweetalert2';

const ListadoDetalle = ({ id, progreso, setProgress, cod }) => {

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
            const progressDb = (100 / (response.detalleOrden.filter(item => item.rama == 1).length) * (response.detalleOrden.filter(item => (item.rama == 1) && (item.estado == 5 || item.estado == 6 || item.estado == 8)).length));
           if (response.status === StatusCodes.OK) {
                setProgresoLocal(Math.round(progressDb));
                setProgress(progressDb == 0 ? 0 : progressDb);
                setDatosTabla(response.detalleOrden);
                setProgresoDb(progressDb);
            }
            //solo la primera vez que se acceda
            if(progressDb===0){                
                const response = await store.dispatch(modificarFechaApertura(cod));
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const cambiarProgreso = (e, idArticulo) => {
        const checked = e.target.checked;
        //console.log("checked", checked);
        if (checked) {
            //console.log("datosTabla.length", datosTabla.filter(item => item.rama == 1).length);
            //console.log("progreso", progreso);
            setProgress(progreso + 100 / datosTabla.filter(item => item.rama == 1).length);
            setRowDataArticulos((prev) => [...prev, idArticulo]);
        }
        else {
            setProgress(progreso - 100 / datosTabla.filter(item => item.rama == 1).length);
            const index = rowDataArticulos.indexOf(idArticulo);
            const rows = [...rowDataArticulos];
            rows.splice(index, 1);
            setRowDataArticulos(rows);
        }
    }

    const atenderOrden = ()=>{
        try {
            const responseAtender = store.dispatch(modificarAvanceOrden({
                idOrden: cod,
                estado: 4,
                avance: progreso
            }));  
            Swal.fire({
                title: '¡Orden Atendida!',
                text: "Orden atendida correctamente",
                icon: 'success',
                confirmButtonColor: '#0d6efd',
                confirmButtonText: 'Listo',
                iconColor: '#0d6efd'
            });
        } catch (error) {
            //console.log(error);
        }
    }
    const guardarArticulos = async (json) => {
        //console.log("json", json);
        //validando que exista detalle de orden
        ////console.log("ddd",json);
        if (json.length > 0) {
            json.map(async (item) => {
                try {
                    const response = await store.dispatch(modificarOrdenDetalle({
                        idArticulo: item,
                        estado: 5
                    }));
                    //const estadoAvance = progreso < 100 && progreso > 0 ? 3 : 4;
                    const response2 = await store.dispatch(modificarAvanceOrden({
                        idOrden: cod,
                        estado: 3,
                        avance: progreso
                    }));
                    if (response.status === StatusCodes.OK) {
                        toastme.success(
                            `Artículo Guardado`,
                        );
                    }
                } catch (error) {
                    //console.log(error);
                }
            });
            //setProgresoLocal(progreso);
            limpiarImputs();

        } else {
            toastme.error(
                `No hay Cambios en la orden`
            );
        }
    }

    const eliminarDetalleArticuloHijo = async (itemDetalle) => {
        try {
            const response = await store.dispatch(eliminarDetalleHijos({
                codigoHijo: cod + itemDetalle.idArticulo + itemDetalle.codigoArticulo
                
            }));
            console.log("CODIGO HIJO EN ELIMINAR DETALLE HIJO", itemDetalle.idArticulo + itemDetalle.codigoArticulo)
            console.log("ID ARTICULO", itemDetalle.idArticulo)
            console.log("CODIGO ARTICULO", itemDetalle.codigoArticulo)
            //console.log("eliminación: ",response);
            const response2 = await store.dispatch(modificarOrdenDetalle({
                idArticulo: itemDetalle.idArticulo,
                estado: 7
            }));

            const nuevoProgreso = progreso - 100 / datosTabla.filter(item => item.rama == 1).length;
            console.log("nuevoProgreso",nuevoProgreso);
            const estadoAvance = nuevoProgreso < 100 && nuevoProgreso > 0 ? 3 : 2;
            const response3 = await store.dispatch(modificarAvanceOrden({
                idOrden: cod,
                estado: estadoAvance,
                avance: nuevoProgreso
            }));
            limpiarImputs();

        } catch (error) {
            //console.log(error);
        }
        //limpiarImputs();
        //listaOrdernesServicio(id); 
    }
    const anularDetalleArticuloHijo = async (itemDetalle) => {
        try {

            const response = await store.dispatch(eliminarDetalleHijos({
                codigoHijo: cod + itemDetalle.idArticulo + itemDetalle.codigoArticulo
                
            }));
            //console.log("eliminación: ",response);
            const response2 = await store.dispatch(modificarOrdenDetalle({
                idArticulo: itemDetalle.idArticulo,
                estado: 6
            }));
            
            const nuevoProgreso = progreso + 100 / datosTabla.filter(item => item.rama == 1).length;
            setProgress(nuevoProgreso);
            console.log("nuevoProgreso",nuevoProgreso);
            const estadoAvance = nuevoProgreso < 100 && nuevoProgreso > 0 ? 3 : 4;
            console.log("estado",estadoAvance);
            const response3 = await store.dispatch(modificarAvanceOrden({
                idOrden: cod,
                estado: estadoAvance,
                avance: nuevoProgreso
            }));

            limpiarImputs();

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
    const anularArticulo = (itemDetalle)=>{
        Swal.fire({
            title: '¿Está Seguro?',
            text: "¿Desea anular este artículo de la Orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#369978',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar',
            iconColor: '#dc3545'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = anularDetalleArticuloHijo(itemDetalle);
                Swal.fire({
                    title: '¡Eliminados!',
                    text: "Productos eliminados correctamente",
                    icon: 'success',
                    confirmButtonColor: '#369978',
                    confirmButtonText: 'Listo',
                })
            }
        })
    }
    const borrarHijos = (itemDetalle) => {
        Swal.fire({
            title: '¿Está Seguro?',
            text: "¿Desea borrar el progreso guardado en esta Orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#369978',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar',
            iconColor: '#ffc107'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = eliminarDetalleArticuloHijo(itemDetalle);
                Swal.fire({
                    title: '¡Eliminados!',
                    text: "Productos eliminados correctamente",
                    icon: 'success',
                    confirmButtonColor: '#369978',
                    confirmButtonText: 'Listo',
                })
            }
        })
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
                                {/* {itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold' }}>{itemDetalle.idArticulo}</td>
                                    : <td colSpan={4}></td>
                                } */}
                                {/*{itemDetalle.rama == 1
                                    ? <td style={{ fontWeight: 'bold' }}>{itemDetalle.envio}</td>
                                    : null
                                } */}
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
                                    {itemDetalle.estado == 5 || itemDetalle.estado == 8
                                        ? <div className="form-check" ><FormCheck disabled={true} checked /> </div>
                                        : <>{itemDetalle.estado == 6 
                                            ?
                                            <span>Anulado</span>
                                            :<div className="form-check"><input name={itemDetalle.idArticulo} className="form-check-input" type="checkbox" onChange={(e) => cambiarProgreso(e, itemDetalle.idArticulo)} /></div>
                                        }</>
                                    }
                                </td>
                                {itemDetalle.rama == 1
                                    ? <td style={{ textAlign: 'center', width: '100px', fontWeight: 'bold' }}>
                                        {itemDetalle.estado == 7
                                            ? <>
                                                <NavLink to={"/detallearticulo/" + cod + "-" + itemDetalle.idArticulo + "-" + (progresoDb + 100 / datosTabla.filter(item => item.rama == 1).length).toFixed(0)}><Button><FontAwesomeIcon icon={faEdit} /></Button></NavLink>&nbsp;&nbsp;
                                                <Button className='btn-danger' onClick={() => {anularArticulo(itemDetalle)}}> <FontAwesomeIcon icon={faX} /> </Button>
                                            </>
                                            : <>{itemDetalle.estado == 6
                                                ?
                                                <Button className='btn-warning' onClick={() => {borrarHijos(itemDetalle)}}> <FontAwesomeIcon icon={faTrash} /> </Button>
                                                :
                                                <Button className='btn-warning' onClick={() => {borrarHijos(itemDetalle)}}> <FontAwesomeIcon icon={faTrash} /> </Button>
                                            }</>
                                            /*
                                                <NavLink to={"/detallearticulo/" + cod+"-"+itemDetalle.idArticulo} onClick={() => {
                                                    if (window.confirm('¿Estas seguro que deseas eliminar el progreso de este articulo y asignarlos nuevamente?')) 
                                                    { eliminarDetalleArticuloHijo(itemDetalle) };
                                                }} className="nav">
                                                    <Button>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                </NavLink>
                                            */                                            
                                        }
                                    </td>
                                        : <td></td>
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="offset-6 col-6">
                <div className='row'>
                    {progresoLocal == 100 ?
                        <>
                            <div className='col-6'>
                                <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                            </div>
                            <div className='col-6'>
                                <NavLink to={"/orden"} className="nav"><Button className='btn-primary col-sm-12' onClick={() => atenderOrden()}>Orden Atendida</Button></NavLink>
                            </div>
                        </>
                        : <>
                            {rowDataArticulos.length > 0 ?
                                <>
                                    <div className='col-6'>
                                        <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                                    </div>
                                    <div className='col-6'>
                                        <Button className='btn-success col-sm-12' onClick={() => guardarArticulos(rowDataArticulos)}>Guardar</Button>
                                    </div>
                                </>
                                : <>
                                    <div className='offset-6 col-6'>
                                        <NavLink to={"/orden"} className="nav"><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                                    </div>
                                </>}
                        </>
                    }
                </div>
            </div>
        </section>
    )
}
export default ListadoDetalle;