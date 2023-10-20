import React, { Component, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faTimes, faWindowRestore } from '@fortawesome/free-solid-svg-icons' //Esto es para importar iconos, se deben mencionar cada icono especifico
import { Table, Button, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { API_BASE_URL } from '../../config/Services';


class OrdenVentaPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaOrdenes: [],
            listaUsuarios: [],
            listaEstados: [],
            ordenSeleccionada: '',
            usuarioAsignado: 0,
            confirmarAsignar: '',
            checkAsignar: false,
            changeColor: '',
            codigoOrden: ''
        }
        this.accordionContent = [];
    }

    componentDidMount() {
        this.leerOrdenes();
        this.leerEstado();
        this.leerUsuarios();
    }
    /*
    componentDidUpdate() {
        this.leerOrdenes();
    }
    */

    leerOrdenes() {
        const rutaServicio = API_BASE_URL + "serviciolistarordenpicker.php";
        var formData = new FormData();
            formData.append("idUsuario", window.usuario.idUsuario);
            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            }).then(
                res => res.json() //indicamos que el objeto devuelto por dicha solicitud al servicio, sera un Json
            )
            .then(
                (result) => {
                    this.setState({
                        listaOrdenes: result

                    });  //aca se crean las variables globales/ de estado
                }
            )
    }

    leerUsuarios() {
        const rutaServicio = API_BASE_URL + "serviciolistarusuarios.php"
        fetch(rutaServicio)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listaUsuarios: result
                    });
                })
    }

    leerEstado() {
        const rutaServicio = API_BASE_URL + "serviciolistarestadosorden.php"
        fetch(rutaServicio)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listaEstados: result
                    });
                })
    }

    /*ES PARA OBTENER EL ID DEL USUARIO CLICKEADO EN LA LISTA DE SELECCION PARA ASIGNAR LA ORDEN */
    seleccionarUsuario = event => {
        this.setState({ usuarioAsignado: event.currentTarget.value });
    }

    /*sin uso aun*/
    /*
    activarBoton = (event, key) => {
        console.log(event.target, key);
    }
    */

    dibujarTabla(datosTabla) {
        if (datosTabla !== null) {
            return (
                <div className="container-fluid" id="tabla" role="tabpanel" aria-labelledby="home-tab" >
                    <Table className="table-sm border-white" responsive bordered hover striped>
                        <thead className="thead-dark bg-dark text-white">
                            <tr className='align-middle'
                                scope="col"
                                style={{ textAlign: 'center', fontSize: '12px' }}>
                                {/*<th scope="col">Id Orden</th>*/}
                                <th scope="col">Orden</th>
                                <th scope="col">#PV</th>
                                <th scope="col">Id Cliente AX</th>
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Referencia</th>
                               {/* <th scope="col">Fecha de Subida</th>
                                <th scope="col">Fecha de Inicio</th> 
                                <th scope="col" width="40px">Fecha Terminado</th>*/}
                                <th scope="col" width="100px">Estado</th>
                                <th scope="col">% Avance</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody >
                            {datosTabla.map((itemOrden) =>
                                <tr className='align-middle' scope="row" key={itemOrden.idOrden} ref={ref => (this.accordionContent[itemOrden.idOrden] = ref)} id={"li-orden-" + itemOrden.idOrden} style={{ textAlign: 'center', fontSize: '12px' }} onClick={() => this.seleccionarOrden(itemOrden,itemOrden.idOrden)}>
                                    {/*<td>{itemOrden.idOrden}</td>*/}
                                    <td style={{ textAlign: 'center', fontSize: '10px' }}>{itemOrden.envio}</td>
                                    <td style={{ textAlign: 'center', fontSize: '12px' }}>{itemOrden.pedidoVentas}</td>
                                    <td>{itemOrden.idClienteAx}</td>
                                    <td style={{ textTransform: 'lowercase'}}>{itemOrden.nombreCliente}</td>
                                    <td style={{ textTransform: 'lowercase'}}>{itemOrden.referencia}</td>
                                    {/*<td  title="Persona encargada del picking" >{itemOrden.fechaSubida}</td>
                                    <td  title="Fecha de asignacion" >{itemOrden.fechaInicio}</td>
                                    <td  title="Fecha de culminada" >{itemOrden.fechaCompletado}</td> */}
                                    <td  title="Estado de la orden" style={{ textAlign: 'center', fontSize: '10px' }}>{this.mostrarEstado(itemOrden.estado)}</td>
                                    <td title="Porcentaje de avance de la orden" >{itemOrden.avance}%</td>
                                    <td>{itemOrden.estado !== '6'? 
                                        <NavLink to={"/detalleorden/" + itemOrden.idOrden + "-" + itemOrden.envio + "-" + itemOrden.estado} >
                                            <Button className="btn secondary"  title="Ver detalle de orden" ><FontAwesomeIcon icon={faEye}/></Button></NavLink>
                                        :<Button className="btn secondary"  title="Ver detalle de orden" disabled><FontAwesomeIcon icon={faEye}/></Button>}</td>
                                        {/* estuctura para condicion:
                                        {condicion a evaluar ? que pasa si es true : que pasa si es false} */}
                                        
                                </tr>
                            )}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (
                <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                    <Alert.Heading>Listado de Ordenes actualmente vacio</Alert.Heading>
                </Alert>
            )
        }
    }

    asignarOrden = (idOrden) => {
        if (this.state.ordenSeleccionada.idOrden !== null && this.state.usuarioAsignado !== 0) {
            //console.log("HUUUU");
            const rutaServicio = API_BASE_URL + "servicioasignarorden.php"
            var formData = new FormData();
            formData.append("idOrden", this.state.ordenSeleccionada.idOrden);
            formData.append("asignadoPor", window.usuario.idUsuario);
            formData.append("asignadoA", this.state.usuarioAsignado);
            //console.log("orden pre-servicio:", this.state.ordenSeleccionada.idOrden);
            //console.log("usuario pre-servicio:", this.state.usuarioAsignado);
            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            }).then(
                () => {
                    this.leerOrdenes();
                }
            )
        } else {
            return (
                <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                    <Alert.Heading>Listado de Ordenes actualmente vacio</Alert.Heading>
                </Alert>
            )
        }
        this.setState({ usuarioAsignado: 0 });
        this.setState({ ordenSeleccionada: [] });
    }

    seleccionarOrden(itemOrden) {
        //esta logica siguiente es para capturar el item clickeado y luego si se clickea otro, desmarque como "active" el anterior
        if (this.state.ordenSeleccionada !== '') {
            //document.getElementById("li-orden-" + this.state.ordenSeleccionada.idOrden).classList.remove("btn disabled"); //esto hace que se marque el elemento cliqueado como "activo"
            //document.getElementById("li-orden-" + this.state.ordenSeleccionada.idOrden).classList.remove("active"); //esto hace que se marque el elemento cliqueado como "activo"
            this.accordionContent[this.state.ordenSeleccionada.idOrden].classList.remove("active");
        }
        this.setState({ ordenSeleccionada: itemOrden })
        //document.getElementById("li-orden-" + itemOrden.idOrden).classList.add("active"); //esto hace que se marque el elemento cliqueado como "activo"
        this.accordionContent[itemOrden.idOrden].classList.add("active");
    }

    //(itemOrden.estado == 1) ? {color: 'red'}:{color: 'green'}

    /*switch (itemOrden.estado){
            case '1':
                return {color: '#3acdab'};
            case '2':
                return {color: 'orange'};
            case '3':
                return {color: 'green'};
            default:
                return {color: 'yellow'};
        }*/

    mostrarEstado(estado) {
        switch (estado) {
            case '1':
                return <span style={{ backgroundColor: "#ffff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Pendiente</span>
            case '2':
                return <span style={{ backgroundColor: "#00ff00", color: '#000000', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Asignado</span>
            case '3':
                return <span style={{ backgroundColor: "#ff3333", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>En Proceso</span>
            case '4':
                return <span style={{ backgroundColor: "#3366ff", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '25px', paddingRight: '25px', fontWeight: 'bolder' }}>Atendido</span>
            case '5':
                return <span style={{ backgroundColor: "#00802b", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Finalizado</span>
            case '6':
                return <span style={{ backgroundColor: "#8c8c8c", color: '#ffffff', borderRadius: '20px', padding: '5px', paddingLeft: '15px', paddingRight: '15px', fontWeight: 'bolder' }}>Anulado</span>
        }
    }
    mostrarEliminar = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea eliminar la Orden " + itemOrden.envio + "?")
        if (respuesta === true) {
            const rutaServicio = API_BASE_URL+"servicioeliminarorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData })
                .then(() => { this.leerOrdenes(); })
        }
    })
    
    anularOrden = (itemOrden => {
        var respuesta = window.confirm("¿Está seguro que desea anular la Orden " + itemOrden.envio + "?")
        if (respuesta === true) {
            const rutaServicio = API_BASE_URL + "servicioanularorden.php"
            var formData = new FormData();
            formData.append("idOrden", itemOrden.idOrden);
            fetch(rutaServicio, { method: 'POST', body: formData })
                .then(() => { this.leerOrdenes(); })
        }
    })

    render() {
        let contenidoTablaOrden = this.dibujarTabla(this.state.listaOrdenes)
        return (
            <section id="orden" className="padded">
                <div className="container-fluid">
                    <div className="row">
                        {contenidoTablaOrden}
                    </div>
                </div>
            </section>
        );
    }

}
export default OrdenVentaPicker;
