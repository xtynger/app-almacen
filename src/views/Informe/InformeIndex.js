import {useEffect,useState} from 'react';
import HtmlToJson from '../../utils/HtmlToJson';
import { registrarOrden,registrarOrdenDetalle,listarOrden } from '../../redux/ordenVenta/OrdenVentaActions';
import store from '../../redux/Store';
import { StatusCodes } from 'http-status-codes';
import { toastme } from 'toastmejs';

const InformeIndex = ()=> {

    const [listadeInformes,setListadeInformes] = useState('');
    const [subtitle,setSubtitle] = useState();

    useEffect(()=>{
    },[]);
    
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            let selected = e.target.files[0];
            //console.log("jsonFile:",selected);
            let reader = new FileReader();
                reader.addEventListener("loadend", () => {
                    //document.getElementById("demoShowA").innerHTML = reader.result;
                    if(selected.type=="text/html"){
                        var json = HtmlToJson(reader.result);
                        registrarOrdenPicking(json);
                    }else{
                        registrarOrdenPicking(JSON.parse(reader.result));
                    }
                    
                });
            reader.readAsText(selected);            
        }
    };

    const registrarOrdenPicking = async(json) =>{
        //validando que exista detalle de orden
        
        if(json.detalleOrden.length > 0){
            try {
                const response2 = await store.dispatch(listarOrden());
                //console.log(response2)
                console.log("listaOrden",response2.listaOrden);
                if(response2.listaOrden==0){
                    const response = await store.dispatch(registrarOrden(json));
                        //console.log("user",response);
                        if (response.status === StatusCodes.OK) {
                            toastme.success(
                                `Nuevo Informe registrado`,
                            );		
                            setSubtitle("Envíos Ingresados:");
                            setListadeInformes([...listadeInformes,json.envio])
                        }
                        json.detalleOrden.map(async(item)=>{
                            try {
                                const response = await store.dispatch(registrarOrdenDetalle({
                                    envio: json.envio??'',
                                    emitido: json.emitido??'',
                                    codigoArticulo: item.codigoArticulo??'',
                                    descripcion: item.descripcion??'',
                                    numeroLote: item.numLote??'',
                                    ubicacion: item.ubicacion??'',
                                    idPallet: item.idPallet??'',
                                    fechaCaducidad: item.fechaCaducidad??'',
                                    cantidad: item.cantidad??'',
                                }));
                                if (response.status === StatusCodes.OK) {
                                    toastme.success(
                                        `Artículo agregado al Detalle`,
                                    );		
                                }else{
                                    toastme.error(
                                        `Artículo no Agregado`,
                                    );	
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        });
                        console.log("eee",json.detalleOrden);
                }else{
                    var resp = response2.listaOrden.filter(item => (json.envio == item.envio && item.estado !== '6'));
                    //console.log("conslaa",resp);
                    if(resp.length != 0){
                        setListadeInformes([...listadeInformes,json.envio + " ya existe"])
                    }else{
                        const response = await store.dispatch(registrarOrden(json));
                       //console.log("user",response);
                        if (response.status === StatusCodes.OK) {
                            toastme.success(
                                `Nuevo Informe registrado`,
                            );		
                            setSubtitle("Envíos Ingresados:");
                            setListadeInformes([...listadeInformes,json.envio])
                        }
                        json.detalleOrden.map(async(item)=>{
                            try {
                                const response = await store.dispatch(registrarOrdenDetalle({
                                    envio: json.envio??'',
                                    codigoArticulo: item.codigoArticulo??'',
                                    descripcion: item.descripcion??'',
                                    numeroLote: item.numLote??'',
                                    ubicacion: item.ubicacion??'',
                                    idPallet: item.idPallet??'',
                                    fechaCaducidad: item.fechaCaducidad??'',
                                    cantidad: item.cantidad??'',
                                }));
                                if (response.status === StatusCodes.OK) {
                                    toastme.success(
                                        `Artículo agregado al Detalle`,
                                    );		
                                }
                            } catch (error) {
                                //console.log(error);
                            }
                        });
                    }
                }
                
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

        <div className="container-fluid p-3" style={{backgroundColor:'#ffffff'}}>
            <div className="row py-3">
                <div className="col-8 m-0 font-weight-bold text-primary pb-3" >
                    <h1><strong>Importar</strong></h1>
                    <h3>Informes de Picking</h3>
                </div>
            </div>
            <div className="row">
                <div className="row">
                    <div className="col">
                        <div className="card shadow mb-4">
                            <div className="card-header py-5">
                                <div className="row container justify-content-center">
                                    <form>
                                        <label htmlFor="upload">(Solo de tipo htm y Json)</label>
                                        <div className='col-8'>                                            
                                            <input type="file" onChange={readUploadFile} accept=".htm,.html,.json"/>
                                            <ul id="listing"></ul>
                                        </div>
                                    </form>
                                </div>                                
                            </div>
                            {
                               listadeInformes?
                               <div className="card-body">
                                   <div className="col m-0 font-weight-bold text-primary p-3">
                                        <h3><strong>Envíos Ingresados:</strong></h3>
                                        {
                                            listadeInformes && 
                                            listadeInformes.map((item,index) =>{
                                                if(item.length>16){
                                                return(
                                                    <h4 className='text-danger' key={index}>{item}</h4>  
                                                )}else{
                                                    return(
                                                    <h4 key={index}>{item}</h4> 
                                                    )
                                                }
                                            }                                                     
                                            )
                                        }                                        
                                   </div>                 
                               </div>
                               : 
                               <div className="card-body">
                                   <div className="col m-0 font-weight-bold text-danger p-3">
                                        <h3><strong>{subtitle}</strong></h3>                                      
                                   </div>                 
                               </div>
                            }    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default InformeIndex;