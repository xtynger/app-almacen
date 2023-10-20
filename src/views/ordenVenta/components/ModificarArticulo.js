import React, { Component, useEffect, useState } from 'react'
import TableRows from "./TableRows";
import { Button, Table } from 'react-bootstrap';
import { toastme } from 'toastmejs';
import store from '../../../redux/Store';
import { registrarOrdenDetalle,modificarOrdenDetalle, registrarDetalleArticulo, modificarAvanceOrden } from '../../../redux/ordenVenta/OrdenVentaActions';
import { StatusCodes } from 'http-status-codes';
import { NavLink } from 'react-router-dom';


function ModificarArticulo({cod,articulo,setArticulo,setResta,addTableRows,RemoveTableRows,progreso}) {

    const [restaCantidad,setRestaCantidad] = useState(0);
    const [btnGuardar,setBtnGuardar] = useState(true); 
    const childFunc = React.useRef(null);
    useEffect(()=>{
      addTableRows.current = addTableRowsLocal;
      RemoveTableRows.current = RemoveTableRowsLocal;
    });
    useEffect(()=>{
      console.log("articulo,",articulo);
      if(Object.keys(articulo).length !== 0){
        setRowsData([...rowsData, {
            idArticulo: articulo.idArticulo,
            envio: articulo.envio,
            codigoArticulo: articulo.codigoArticulo,
            descripcion: articulo.descripcion,
            numeroLote: articulo.numeroLote,
            ubicacion: articulo.ubicacion,
            idPallet: articulo.idPallet,
            fechaCaducidad: articulo.fechaCaducidad,
            cantidad: articulo.cantidad,
            estado: 8
        }]);
      }
    },[articulo]);

    const [rowsData, setRowsData] = useState([]);
    const addTableRowsLocal = () => {
        var contador=0;
        rowsData.map((item)=>{
          contador = contador + parseInt(item.cantidad);
        });
        //crear array constante con los campos a usar para las lineas
        
        //con esto usando solo el "rowsInput" es para agregar lineas usando el array constante creado arriba, con la instancia de useState "setRowsData"
        //se agregar el "...rowsData" para que mantengan la linea/data ya ingresada y solo agregue una nueva posterior
        if(contador < articulo.cantidad) {
          const rowsInput = {
            idArticulo: articulo.idArticulo,
            envio: articulo.envio,
            codigoArticulo: articulo.codigoArticulo,
            descripcion: articulo.descripcion,
            numeroLote: articulo.numeroLote,
            ubicacion: articulo.ubicacion,
            idPallet: articulo.idPallet,
            fechaCaducidad: articulo.fechaCaducidad,
            cantidad: articulo.cantidad - contador,
            estado: 8
          }
          setRowsData([...rowsData, rowsInput]);
          setResta(0);
          console.log("lengui: ",rowsData.length);
          if(rowsData.length>0)setBtnGuardar(true);
        }else{
          toastme.info(
            "No puede agregar más cantidades"
          );
        }

    }

    const RemoveTableRowsLocal = () => {
      var contador=0;
      rowsData.map((item)=>{
        contador = contador + parseInt(item.cantidad);
      });
      //crear array constante con los campos a usar para las lineas
      
      //con esto usando solo el "rowsInput" es para agregar lineas usando el array constante creado arriba, con la instancia de useState "setRowsData"
      //se agregar el "...rowsData" para que mantengan la linea/data ya ingresada y solo agregue una nueva posterior
      if(contador < articulo.cantidad) {
        const rowsInput = {
          idArticulo: articulo.idArticulo,
          envio: articulo.envio,
          codigoArticulo: articulo.codigoArticulo,
          descripcion: articulo.descripcion,
          numeroLote: articulo.numeroLote,
          ubicacion: articulo.ubicacion,
          idPallet: articulo.idPallet,
          fechaCaducidad: articulo.fechaCaducidad,
          cantidad: articulo.cantidad - contador,
          estado: 6
        }
        setRowsData([...rowsData, rowsInput]);
        setResta(0);
        console.log("lengwww: ",rowsData.length);
        if(rowsData.length>0)setBtnGuardar(true);
      }else{
        toastme.info(
          "No puede agregar más cantidades"
        );
      }

  }



    //Eliminar lineas ejecutandolo en base al index de la linea clickeada, seleccionando solo la linea indicada, y no todas (por el "...rowsData")
    const deleteTableRows = (index) => {
      var contador=0;
      rowsData.map((item)=>{
        contador = contador + parseInt(item.cantidad);
      });   
      var resta =articulo.cantidad-(contador - rowsData[index].cantidad);
      if( resta == 0){
        console.log("cantad true", resta);
        setBtnGuardar(true);
      }else{
        console.log("cantad false", resta);
        setBtnGuardar(false);
      }
      setResta(resta);
      const rows = [...rowsData];
      rows.splice(index, 1);         
      setRowsData(rows);      
    }
    const handleChange = (index, evnt) => {     
        const { name, value } = evnt.target;
        //	2022-10-30
        console.log("name,value", name, value);
        //console.log("cantidad", articulo.cantidad);
        if(name=='fechaCaducidad'){
          const rowsInput = [...rowsData];
          rowsInput[index][name] = value.slice(8,10)+"/"+value.slice(5,7)+"/"+value.slice(0,4);
          console.log("ingrese",rowsInput);
          setRowsData(rowsInput);
        }else{
          const rowsInput = [...rowsData];
          rowsInput[index][name] = value;
          console.log("ingrese",rowsInput);
          setRowsData(rowsInput);
        }
        
        var contador=0;
        rowsData.map((item)=>{
          contador = contador + parseInt(item.cantidad);
        });   
        if(contador < articulo.cantidad) {
          setBtnGuardar(false);
          setResta(articulo.cantidad-contador);
        }
        //mas de un item && rowsInput.length>1
        if(contador == articulo.cantidad){ console.log("trueeeee");setBtnGuardar(true)};
        
    }
    
    const guardarArticulos = async(json) =>{
      //validando que exista detalle de orden
      console.log("ddd",json);
      if(json.length > 0){
          try {
              json.map(async(item,index)=>{
                  try {
                      //console.log("ini");
                      //console.log(item.envio);
                      const response = await store.dispatch(registrarDetalleArticulo({
                        envio: item.envio,
                        codigoArticulo: item.codigoArticulo,
                        descripcion: item.descripcion??'',
                        numeroLote: item.numeroLote,
                        ubicacion: item.ubicacion,
                        idPallet: item.idPallet,
                        fechaCaducidad: item.fechaCaducidad,
                        cantidad: item.cantidad,
                        codigoHijo: cod + item.idArticulo + item.codigoArticulo,
                        estado: item.estado
                      }));
                      console.log("Codigo Hijo ACA: ",cod + item.idArticulo + item.codigoArticulo)
                      if (response.status === StatusCodes.OK) {
                        toastme.success(
                            `Artículo agregado al Detalle`,
                        );		
                        //window.location.href = "/detalleorden/"+cod+'-'+item.envio;	
                        
                      }
                      
                  } catch (error) {
                      console.log(error);
                  }
              });
              const response2 = await store.dispatch(modificarOrdenDetalle({
                idArticulo: articulo.idArticulo,
                estado: 8
              }));

              if (response2.status === StatusCodes.OK) {
                //console.log("Estado padre actualizado");		                        
              }
              //const estadoAvance = progreso<100&&progreso>0?3:4;
              const estadoAvance = progreso < 100 && progreso > 0 ? 3 : 4;
              console.log("progreso:",progreso);
              const response3 = await store.dispatch(modificarAvanceOrden({
                    idOrden:cod,
                    estado:3,
                    avance:progreso
              }));
              console.log("response3:",response3);
              
          } catch (error) {
              toastme.error(
                  error
              );
          }
        }else{
            toastme.error(
                `No hay Detalle de orden`
            );
        }
        
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                  <Table className="table" bordered>
                      <thead className='bg-dark text-white text-center'>
                          <tr>
                              <th>Ubicacion</th>
                              <th>Pallet</th>
                              <th>Lote</th>
                              <th>Fecha Caducidad</th>
                              <th>Cantidad</th>
                              <th>Eliminar</th>
                          </tr>
                      </thead>
                      <tbody className='text-center'>
                          <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                      </tbody>
                  </Table>
                </div>
                <div className="offset-6 col-6">
                    <div className='row'>
                        {
                          btnGuardar?
                          <>
                            <div className='col-6'>
                              <NavLink to={"/detalleorden/"+cod+"-"+articulo.envio}><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                            </div>
                            <div className='col-6'>
                              <NavLink to={"/detalleorden/"+cod+"-"+articulo.envio} className="text-white" ><Button onClick={()=>guardarArticulos(rowsData)} className='btn-success col-sm-12'>Guardar</Button></NavLink>
                            </div>
                          </>:
                          <>
                            <div className='col-6'>
                            </div>
                            <div className='col-6'>
                              <NavLink to={"/detalleorden/"+cod+"-"+articulo.envio}><Button className='btn-secondary col-sm-12'>Cancelar</Button></NavLink>
                            </div>
                          </>
                        }
                        
                    </div>                    
                </div>
            </div>
        </div>
    )

}
/*
const [rowsInput, setRowsInput] = useState(initial);


const leerTabla = () => {

}
const initial = {
    email: '',
    nombre: 'asd',
    medidas: {
        altura: '',
        peso: '',
        edad: '',
        tez: ''
    }
}



return (
    <div>{rowsInput.nombre}</div>
)
}
*/ 
/*------------------------------------------------------------------------------*/


/* COMO CLASE */
/*
export class ModificarDetalle extends Component {


    constructor(props) {
        super(props)

        this.state = {
            conteo = '',
            this.setState.conteo = a
        setConteo([])

        const [variale, asignarValor] = useState([]);


            this.state.conteo

        variable

        this.setState.conteo = valor

        asignarValor(valor)
        }
    }

    dijarTbala
    return() {
        asodhodsaf
    }




    asdasdfsafafawha
    sdfohsafda
    asdjhflad



    render() {
        return (
            <div>ModificarDetalle</div>
        )
    }
}

export default ModificarDetalle

*/

export default ModificarArticulo
