import {useEffect,useState} from 'react';
import OrdenVenta from './OrdenVenta';
import OrdenVentaPicker from './OrdenVentaPicker';
//import RefreshButton from '../layouts/partials/RefreshButton';

const OrdenVentaIndex = ()=> {

    useEffect(()=>{
        
    },[]);

    return (
        <>
            <div className="container-fluid pt-3" style={{backgroundColor:'#ffffff'}}>
                <div className="row">
                    <div className="col m-0 font-weight-bold text-primary text-center" >
                        <h1><strong>Órdenes</strong></h1>
                        <h3>Listado de Informes de Picking</h3>
                    </div>
                </div>
                {/*<RefreshButton></RefreshButton>*/}
                {(()=>{
                //console.log("window.usuario.nivelUsuario",window.usuario.nivelUsuario);
                switch(window.usuario.nivelUsuario){
                    case '1':
                    return (<OrdenVenta></OrdenVenta>);
                    case '2':
                    return (<OrdenVenta></OrdenVenta>);
                    case '3':
                    return (<OrdenVentaPicker></OrdenVentaPicker>);
                };
            })()}
            </div>
        </>
    )

}


export default OrdenVentaIndex;