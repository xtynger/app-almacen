import { BarList, Bold, Flex, Text, Title, Card, Metric, Col, ColGrid, Datepicker } from '@tremor/react';
import {useEffect, useState} from 'react';
import {obtenerAutorizacion} from '../../config/LocalStorageService';
import store from '../../redux/Store';

const HomeIndex = ()=> {

    const [usuario, setUsuario] = useState({});
    const [selectedDate, setSelectedDate] = useState();

    useEffect(()=>{
        let data = obtenerAutorizacion();
        setUsuario(data);
        console.log("HOME")        
    },[]);
    
    return (
        <div className='container-fluid pt-5'>
            <Card decoration="top" decorationColor="emerald"
                hFull={false}
                shadow={true}>
                <h4 className="text-muted mb-4">BIENVENIDO AL SISTEMA DE ALMACEN</h4>
                <div className="d-flex align-items-center">
                    <h3 className='me-3 align-self-baseline'>
                        <i className='bx bxs-user text-muted'></i>
                    </h3>
                    <div>                                
                        <h5 className="text-primary mb-1">
                        {window.usuario && (window.usuario.nombre+' '+window.usuario.apellido)}
                        </h5>
                        <i className="text-secondary">
                            {window.usuario && window.usuario.correo}
                        </i>
                    </div>
                </div>
            </Card>
            <br/>
            
        </div>
    )

}
export default HomeIndex;