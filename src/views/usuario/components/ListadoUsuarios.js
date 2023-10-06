import { useEffect, useState } from 'react';
import { listarUsuarios, anularUsuario } from '../../../redux/usuario/UsuarioActions';

import store from '../../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faLock, faTimes, faWindowRestore, faX, faXmarkCircle, faXRay } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import NivelUsuario from './NivelUsuario';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const ListadoUsuarios = () =>{

    const [datosTabla,setDatosTabla] = useState([]);
    const [ordenSeleccionada,setOrdenSeleccionada] = useState({});
    useEffect(()=>{
        console.log("window.usuario.nivelUsuario",parseInt(window.usuario.nivelUsuario)+1);
        listaUsuarioServicio();        
    },[]);

    const listaUsuarioServicio = async()=>{
        try {
            const response = await store.dispatch(listarUsuarios());
            console.log("usuarios listados:",response);
            if (response.status === StatusCodes.OK) {	
                setDatosTabla(response.usuarios);
            }
        } catch (error) {
            //console.log(error);
        }
    }

    const anularUsuarios = (itemUsuario) => {
        if(itemUsuario.estado==1){
            Swal.fire({
                title: '¿Está Seguro',
                text: "De anular este usuario?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                confirmButtonText: 'Si, anular',
                cancelButtonText: 'Cancelar',
                iconColor: '#dc3545'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(itemUsuario.estado);
                        const response = store.dispatch(anularUsuario({
                            idUsuario: itemUsuario.idUsuario,
                            estado: itemUsuario.estado==1?0:1,
                        }));
                        Swal.fire({
                            title: '¡Anulado!',
                            text: "Usuario anulado correctamente",
                            icon: 'success',
                            confirmButtonColor: '#dc3545',
                            confirmButtonText: 'Listo',
                            iconColor: '#dc3545'
                        });
                        setTimeout(() => {
                            listaUsuarioServicio();
                        }, 250);
                    }
                });
        }else{
            Swal.fire({
                title: '¿Está Seguro',
                text: "De activar este usuario?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#369978',
                confirmButtonText: 'Si, activar',
                cancelButtonText: 'Cancelar',
                iconColor: '#369978'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(itemUsuario.estado);
                        const response = store.dispatch(anularUsuario({
                            idUsuario: itemUsuario.idUsuario,
                            estado: itemUsuario.estado==1?0:1,
                        }));
                        Swal.fire({
                            title: 'Activado!',
                            text: "Usuario acivado correctamente",
                            icon: 'success',
                            confirmButtonColor: '#369978',
                            confirmButtonText: 'Listo',
                        });
                        setTimeout(() => {
                            listaUsuarioServicio();
                        }, 250);
                    }
                })
        }
    } 

    return(
        <div className="table-bordered" id="tabla" role="tabpanel" aria-labelledby="home-tab" >
            <Table id="tabla" className="table table-hover" >
                <thead id="thead" className="table thead-dark bg-dark text-white">
                    <tr>
                        <th>Código Usuario</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Username</th>
                        <th>Tipo</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody >
                    {datosTabla.filter((item)=>(item.nivelUsuario==window.usuario.nivelUsuario)||(item.nivelUsuario>=parseInt(window.usuario.nivelUsuario)+1)).map((itemUsuario) =>
                        <tr key={itemUsuario.idUsuario}
                            id={"li-usuario-" + itemUsuario.idUsuario}>
                            <td>{itemUsuario.idUsuario}</td>
                            <td>{itemUsuario.nombre}</td>
                            <td>{itemUsuario.apellido}</td>
                            <td>{itemUsuario.correo}</td>
                            <td>{itemUsuario.username}</td>
                            <td><NivelUsuario nivel={itemUsuario.nivelUsuario}></NivelUsuario></td>
                            <td>{itemUsuario.nivelUsuario >= parseInt(window.usuario.nivelUsuario)?
                                    <NavLink to={"/usuario/editar/"+itemUsuario.idUsuario}><Button className="btn"><FontAwesomeIcon icon={faEdit} /></Button></NavLink>
                                    :<Button className="btn-secondary" disabled><FontAwesomeIcon icon={faLock}/></Button>
                                }
                            </td>
                            {/*pendiente por mejorar */}
                            <td>{itemUsuario.idUsuario == window.usuario.idUsuario
                                    ? <Button className="btn-secondary" disabled><FontAwesomeIcon icon={faLock} /></Button>
                                    :<>
                                        {itemUsuario.estado == 1
                                            ? <Button className="btn-success" onClick={() => {anularUsuarios(itemUsuario)}}  ><FontAwesomeIcon icon={faCheck} /></Button>
                                            : <Button className="btn-danger" onClick={() => {anularUsuarios(itemUsuario)}}><FontAwesomeIcon icon={faXmarkCircle} /></Button>
                                    } 
                                </>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
        )
}
export default ListadoUsuarios;