import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faPrint, faTimes, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Alert, CardImg, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import moment from 'moment/moment';
import { modificarAvanceOrden, anularOrden } from '../../redux/ordenVenta/OrdenVentaActions';
import store from '../../redux/Store';
import Swal from 'sweetalert2';
import { Card, List, ListItem, Title } from '@tremor/react';
import logo from '../../img/logo-megalabs-green.webp';
import { API_BASE_URL } from '../../config/Services';

const OrdenVenta = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const accordionContent = useRef([]);
  const [listaOrdenes, setListaOrdenes] = useState([]);
  const [consulta, setConsulta] = useState(currentMonth);
  const [originalListaOrdenes, setOriginalListaOrdenes] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaEstados, setListaEstados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState();
  const [ordenSeleccionada, setOrdenSeleccionada] = useState('');
  const [usuarioAsignado, setUsuarioAsignado] = useState(0);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    leerOrdenes();
    setConsulta(currentMonth);
    leerEstado();
    leerUsuarios();
  }, []);

  const leerOrdenes = () => {
    const rutaServicio = API_BASE_URL + 'serviciolistarordenHistorial.php?mes=' + consulta;
    setLoading(true);
    fetch(rutaServicio)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setListaOrdenes(result);
        setOriginalListaOrdenes(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Hide loading indicator on error
      });
  };
  const filtrarOrdenes = () => {
    const filteredOrdenes = originalListaOrdenes.filter(
      item =>
        (item.envio &&
        typeof item.envio === 'string' &&
        item.envio.toUpperCase().includes(textoBusqueda.trim().toUpperCase())||
        item.pedidoVentas &&
        typeof item.pedidoVentas === 'string' &&
        item.pedidoVentas.toUpperCase().includes(textoBusqueda.trim().toUpperCase())||
        item.nombreCliente &&
        typeof item.nombreCliente === 'string' &&
        item.nombreCliente.toUpperCase().includes(textoBusqueda.trim().toUpperCase())||
        item.referencia &&
        typeof item.referencia === 'string' &&
        item.referencia.toUpperCase().includes(textoBusqueda.trim().toUpperCase()))
    );
    setListaOrdenes(filteredOrdenes);
  };

  const leerUsuarios = () => {
    const rutaServicio = API_BASE_URL + 'serviciolistarusuarios.php';
    fetch(rutaServicio)
      .then((res) => res.json())
      .then((result) => {
        setListaUsuarios(result);
      });
  };

  const leerEstado = () => {
    const rutaServicio = API_BASE_URL + 'serviciolistarestadosorden.php';
    fetch(rutaServicio)
      .then((res) => res.json())
      .then((result) => {
        setListaEstados(result);
      });
  };

  const seleccionarUsuario = (event) => {
    setUsuarioAsignado(event.currentTarget.value);
  };
  const anularOrdenes = (itemOrden) => {
        Swal.fire({
            title: '¿Está Seguro',
            text: "De anular esta orden?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#369978',
            confirmButtonText: 'Si, anular',
            cancelButtonText: 'Cancelar',
            iconColor: '#dc3545'
        }).then((result) => {
            if (result.isConfirmed) {
                const response = store.dispatch(anularOrden({
                    idOrden: itemOrden.idOrden,
                }))
                Swal.fire({
                    title: '¡Anulado!',
                    text: "Oreden anulada correctamente",
                    icon: 'success',
                    confirmButtonColor: '#369978',
                    confirmButtonText: 'Listo',
                })
                this.leerOrdenes();
            }
        })
  };

  const dibujarTabla = (datosTabla) => {
    if (datosTabla !== null) {
      return (
        <Table className="table table-sm table-striped" id="tabla" role="tabpanel" aria-labelledby="home-tab" responsive hover>
          <thead className="thead-dark bg-dark text-white">
            <tr className="align-middle" scope="col" style={{ textAlign: 'center', fontSize: '12px' }}>
              <th scope="col">#ENV</th>
              <th scope="col">#PV</th>
              <th scope="col">Nombre Cliente</th>
              <th scope="col">Referencia</th>
              <th scope="col">Asignar</th>
              <th scope="col">Responsable</th>
              <th scope="col">Iniciado</th>
              <th scope="col">Finalizado</th>
              <th scope="col">Estado</th>
              <th scope="col">Avance</th>
              <th colSpan={3}>Acciones</th>
            </tr>
          </thead> 
          <tbody>
            {loading?
              <tr>
                <td colSpan="11"><h2 className='text-center pt-3'>Cargando...</h2></td>
              </tr>:
            null}   
            {datosTabla.map((itemOrden) => (
              <tr
                className="align-middle"
                scope="row"
                key={itemOrden.idOrden}
                ref={(ref) => (accordionContent.current[itemOrden.idOrden] = ref)}
                id={'li-orden-' + itemOrden.idOrden}
                style={{ textAlign: 'center', fontSize: '11px' }}
                onClick={() => seleccionarOrden(itemOrden)}
              >
                <td style={{ textAlign: 'center', fontSize: '11px' }}>{itemOrden.envio}</td>
                <td style={{ textAlign: 'center', fontSize: '11px' }}>{itemOrden.pedidoVentas}</td>
                <td style={{ textTransform: 'uppercase', textAlign: 'left' }}>{itemOrden.nombreCliente}</td>
                <td style={{ textTransform: 'uppercase', textAlign: 'center' }}>{itemOrden.referencia}</td>
                <td title="Personal disponible para asignar la orden">
                  {itemOrden.estado !== '6' ? (
                    <>
                      {itemOrden.estado == '1' || itemOrden.estado == '2' ? (
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          onChange={seleccionarUsuario}
                          style={{ fontSize: '10px' }}
                        >
                          <option value="0">Seleccione</option>
                          {listaUsuarios.map((usuario) => {
                            if (usuario.nivelUsuario == 3 && usuario.estado == 1) {
                              if (usuario.idUsuario == itemOrden.asignadoA) {
                                return (
                                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                                    {usuario.username}
                                  </option>
                                );
                              } else {
                                return (
                                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                                    {usuario.username}
                                  </option>
                                );
                              }
                            }
                          })}
                        </select>
                      ) : (
                        <>
                          Asignado
                        </>
                      )}
                    </>
                  ) : (
                    <span>Anulada</span>
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {listaUsuarios.map((usuario) => {
                    if (usuario.idUsuario == itemOrden.asignadoA) {
                      return (
                        <span
                          style={{
                            backgroundColor: '#00ff00',
                            color: '#000000',
                            borderRadius: '20px',
                            padding: '2px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            fontWeight: 'bolder',
                          }}
                          key={usuario.idUsuario}
                        >
                          {usuario.username}
                        </span>
                      );
                    } else {
                      return null;
                    }
                  })}
                </td>
                <td title="Persona encargada del picking">{itemOrden.fechaInicio}</td>
                <td title="Persona encargada del picking">{itemOrden.fechaCompletado}</td>
                <td title="Estado de la orden" style={{ textAlign: 'center', fontSize: '10px' }}>
                  {itemOrden.asignadoA == 0 ? (
                    <></>
                  ) : (
                    <>{mostrarEstado(itemOrden.estado)}</>
                  )}
                </td>
                <td title="Porcentaje de avance de la orden">{itemOrden.avance}%</td>
                <td>
                  {itemOrden.estado !== '6' ? (
                    <NavLink to={'/detalleorden/' + itemOrden.idOrden + '-' + itemOrden.envio}>
                      <Button className="btn  btn-sm" title="Ver detalle de orden">
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </NavLink>
                  ) : (
                    <Button className="btn btn-secondary  btn-sm" title="Ver detalle de orden" disabled>
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  )}
                </td>
                <td>
                  {itemOrden.estado !== '6' && itemOrden.estado !== '5' ? (
                    <>
                      {itemOrden.estado == '4' ? (
                        <Button
                          className="btn btn-warning  btn-sm"
                          title="Finalizar orden"
                          onClick={() => finalizarOrden(itemOrden)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                      ) : (
                        <Button
                          className="btn btn-success  btn-sm"
                          title="Asignar orden"
                          onClick={() => asignarOrden(itemOrden)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button className="btn btn-info btn-sm" onClick={() => imprimirTicket(itemOrden)} title="">
                      <FontAwesomeIcon icon={faPrint} />
                    </Button>
                  )}
                </td>
                <td>
                  {itemOrden.estado !== '6' ? (
                    <>
                      {itemOrden.estado == '5' ? (
                        <a className="btn btn-secondary  btn-sm" title="Anular Orden" disabled>
                          <FontAwesomeIcon icon={faTimes} />
                        </a>
                      ) : (
                        <a className="btn btn-danger  btn-sm" title="Anular Orden" onClick={() => anularOrdenes(itemOrden)}>
                          <FontAwesomeIcon icon={faTimes} />
                        </a>
                      )}
                    </>
                  ) : (
                    <a className="btn btn-secondary  btn-sm" title="Anular Orden" disabled>
                      <FontAwesomeIcon icon={faTimes} />
                    </a>
                  )}
                </td>
              </tr>
                  ))}
            <tr></tr>
          </tbody>
        </Table>
      );
    } else {
      return (
        <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
          <Alert.Heading>Listado de Ordenes actualmente vacío</Alert.Heading>
        </Alert>
      );
    }
  };

  const asignarOrden = (idOrden) => {
    if (ordenSeleccionada.idOrden !== null && usuarioAsignado !== 0) {
      const rutaServicio = API_BASE_URL + 'servicioasignarorden.php';
      var formData = new FormData();
      formData.append('idOrden', ordenSeleccionada.idOrden);
      formData.append('asignadoPor', window.usuario.idUsuario);
      formData.append('asignadoA', usuarioAsignado);
      fetch(rutaServicio, {
        method: 'POST',
        body: formData,
      }).then(() => {
        leerOrdenes();
      });
    } else {
      return (
        <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
          <Alert.Heading>Listado de Ordenes actualmente vacío</Alert.Heading>
        </Alert>
      );
    }
    setUsuarioAsignado(0);
    setOrdenSeleccionada([]);
  };

  const imprimirTicket = (orden) => {
    setTimeout(() => {
      let printContents = document.getElementById('printInfo').innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      window.location.href = '/orden';
    }, 500);
  };

  const finalizarOrden = async (itemOrden) => {
    Swal.fire({
      title: '¿Está Seguro',
      text: 'De finalizar esta orden?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#369978',
      confirmButtonText: 'Si, finalizar',
      cancelButtonText: 'Cancelar',
      iconColor: '#369978',
    }).then((result) => {
      if (result.isConfirmed) {
        if (itemOrden.estado == '4') {
          const rutaServicio = API_BASE_URL + 'servicioactualizarfechacompletadaorden.php';
          var formData = new FormData();
          var date = moment().format('DD/MM/YYYY HH:mm:ss');
          formData.append('idOrden', itemOrden.idOrden);
          formData.append('abierto', '2');
          formData.append('fechaCompletado', date);
          fetch(rutaServicio, { method: 'POST', body: formData }).then(() => {
            leerOrdenes();
          });
        }
        const response = store.dispatch(
          modificarAvanceOrden({
            idOrden: itemOrden.idOrden,
            estado: 5,
            avance: 100,
          })
        );
        Swal.fire({
          title: '¡Orden Finalizada!',
          text: 'Orden finalizada correctamente',
          icon: 'success',
          confirmButtonColor: '#369978',
          confirmButtonText: 'Listo',
          iconColor: '#369978',
        });
        leerOrdenes();
      }
    });
  };

  const mostrarEstado = (estado) => {
    switch (estado) {
      case '1':
        return (
          <span style={{ backgroundColor: '#ffff00', color: '#000000', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            Pendiente
          </span>
        );
      case '2':
        return (
          <span style={{ backgroundColor: '#00ff00', color: '#000000', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            Asignado
          </span>
        );
      case '3':
        return (
          <span style={{ backgroundColor: '#ff3333', color: '#ffffff', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            En Curso
          </span>
        );
      case '4':
        return (
          <span style={{ backgroundColor: '#3366ff', color: '#ffffff', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            Atendido
          </span>
        );
      case '5':
        return (
          <span style={{ backgroundColor: '#00802b', color: '#ffffff', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            Finalizado
          </span>
        );
      case '6':
        return (
          <span style={{ backgroundColor: '#8c8c8c', color: '#ffffff', borderRadius: '20px', padding: '2px', paddingLeft: '8px', paddingRight: '8px', fontWeight: 'bolder' }}>
            Anulado
          </span>
        );
      default:
        return null;
    }
  };

  const seleccionarOrden = (itemOrden) => {
    if (ordenSeleccionada !== '') {
      accordionContent.current[ordenSeleccionada.idOrden].classList.remove('active');
    }
    setOrdenSeleccionada(itemOrden);
    accordionContent.current[itemOrden.idOrden].classList.add('active');
  };

  const mostrarUsuario = () => {
    const picker = listaUsuarios.filter((x) => x.idUsuario == ordenSeleccionada.asignadoA);
    return picker.length ? picker[0].nombre + ' ' + picker[0].apellido : 'sin info';
  };

  const mostrarEliminar = (itemOrden) => {
    var respuesta = window.confirm('¿Está seguro que desea eliminar la Orden ' + itemOrden.envio + '?');
    if (respuesta === true) {
      const rutaServicio = API_BASE_URL + 'servicioeliminarorden.php';
      var formData = new FormData();
      formData.append('idOrden', itemOrden.idOrden);
      fetch(rutaServicio, { method: 'POST', body: formData }).then(() => {
        leerOrdenes();
      });
    }
  };

  useEffect(() => {
    leerOrdenes();
    leerEstado();
    leerUsuarios();
  }, []);

  return (
    <section id="orden" className="padded">
      <div className='m-3 p-3 text-center'>
        <Row className="justify-content-md-center">
          <Col xs={6}>
            <InputGroup>
              <FormControl
                  type='input'
                  name='textoBusqueda'
                  value={textoBusqueda}
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                  placeholder='Ingrese Código de Envío, Pedido de Venta, o Referencia'
                  required
                  autoFocus
              />
              <button onClick={filtrarOrdenes} className="btn btn-success">
                Buscar &nbsp;&nbsp;<FontAwesomeIcon icon={faSearch} style={{ display: 'inline-block', marginRight: '5px' }}/>                
              </button>
            </InputGroup>
          </Col>
        </Row>        
      </div>      
      {dibujarTabla(listaOrdenes)}      
      <div id="printInfo">
        <br></br>
        <br></br>
        <Card maxWidth="max-w-lg">
          <CardImg src={logo} style={{ width: '100px', position: 'absolute', right: '2rem', top: '2rem' }}></CardImg>
          <Title>
            <b>Orden Finalizada</b>
          </Title>
          <br></br>
          <List>
            <ListItem>
              <span>
                <b>Pedido Ventas</b>
              </span>
              <span>{ordenSeleccionada.pedidoVentas}</span>
            </ListItem>
            <ListItem>
              <span>
                <b>Envío</b>
              </span>
              <span>{ordenSeleccionada.envio}</span>
            </ListItem>
            <ListItem>
              <span>
                <b>Nombre Cliente</b>
              </span>
              <span>{ordenSeleccionada.nombreCliente}</span>
            </ListItem>
            <ListItem>
              <span>
                <b>Referencia</b>
              </span>
              <span>{ordenSeleccionada.referencia}</span>
            </ListItem>
            <ListItem>
              <span>
                <b>Fecha Emisión</b>
              </span>
              <span>{ordenSeleccionada.emitido}</span>
            </ListItem>
            <ListItem>
              <span>
                <b>Asignado</b>
              </span>
              <span>{mostrarUsuario()}</span>
            </ListItem>
          </List>
        </Card>
      </div>
    </section>
  );
};

export default OrdenVenta;
