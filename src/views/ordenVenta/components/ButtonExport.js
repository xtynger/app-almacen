import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from "../../../config/Services";
import * as XLSX from 'xlsx';
import { DateRangePicker, Flex, Text, Bold } from "@tremor/react";
import { es } from "date-fns/locale";
import { Col, Row } from "react-bootstrap";

const ButtonExport = () =>{
    const [listaOrdenes, setListaOrdenes] = useState([]);
    const [vacioError, setVacioError] = useState(false);
    const [fechaRango, setFechaRango] = useState([
        new Date(new Date().getFullYear(), 0, 1),
        new Date()
    ]);
    useEffect(()=>{
        leerOrdenes();
    },[fechaRango]);
      
    const leerOrdenes = () => { 
        const fechaDesde = formatoFecha(fechaRango[0]);
        const fechaHasta = formatoFecha(fechaRango[1]);    
        console.log("fechadesde", fechaDesde);
        console.log("fechahasta", fechaHasta);

        if (fechaDesde && fechaHasta) {
            const rutaServicio = API_BASE_URL + 'serviciolistarordenHistorialReporte.php?desde=' + fechaDesde + '&hasta=' + fechaHasta;
            fetch(rutaServicio)
              .then((res) => res.json())
              .then((result) => {
                if(result && result.length !== 0){
                    setListaOrdenes(result);                    
                    setVacioError(false);
                }else{
                    setListaOrdenes([]);
                    setVacioError(true);
                }
              });
        }
    };
    
    const formatoFecha = (fecha) => {       
        const date = new Date(fecha);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const exportToExcel = () =>{
        if(listaOrdenes && listaOrdenes.length !== 0){            
            const data = listaOrdenes.map((orden) => ({
                "Envío": orden.envio,
                "Pedido Ventas": orden.pedidoVentas,
                "Nombre Cliente": orden.nombreCliente,
                "Referencia": orden.referencia,
                "Estado": orden.estado,//estadoActual(orden.estado),            
                "Asignado por": orden.asignadoPorNombre,
                "Asignado a": orden.asignadoANombre +' ('+orden.asignadoAUsuario+')',
                "Fecha de Emisión": orden.emitido,
                "Fecha Inicio": orden.fechaInicio,
                "Fecha Término": orden.fechaCompletado,
                "Avance": orden.avance
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Órdenes");
    
            // Guardar el archivo Excel
            XLSX.writeFile(workbook, "reporte-ordenes.xlsx");   
        }        
    };

    /*const estadoActual = (estado) =>{
        return;
    };*/

    return(
        <>
            <Row>
                <Col>
                    <span style={{backgroundColor: "#ffc107",padding: "0 0.5em",borderRadius: "5px", marginRight: "1em"}}>Desde</span>
                    <span style={{backgroundColor: "rgb(70 255 212)",padding: "0 0.5em",borderRadius: "5px"}}>Hasta</span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Flex justifyContent="justify-between" marginTop="mt-2">
                        <DateRangePicker
                            defaultRelativeFilterOption={"y"} 
                            locale={es}
                            className="max-w-md mx-auto"
                            value={fechaRango}
                            onValueChange={setFechaRango}
                            color="green">
                        </DateRangePicker>
                    </Flex>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Flex justifyContent="justify-between" marginTop="mt-4">
                        <Text><Bold>Descargar (.xlsx)</Bold></Text>
                    </Flex>                    
                    {vacioError == true ? (
                        <button className="btn btn-secondary mt-1">
                            No hay registros &nbsp;&nbsp;<FontAwesomeIcon icon={faXmarkCircle} style={{ display: 'inline-block', marginRight: '5px' }}/>                
                        </button>
                    ) : (
                        <>
                            <button onClick={exportToExcel} className="btn btn-success mt-1">
                                Órdenes &nbsp;&nbsp;<FontAwesomeIcon icon={faDownload} style={{ display: 'inline-block', marginRight: '5px' }}/>                
                            </button>
                            <Flex justifyContent="justify-between" marginTop="mt-1">
                                <p className="text-success"><Bold>Se encontraron {listaOrdenes.length} órdenes entre esas fechas</Bold></p>
                            </Flex> 
                        </>
                        
                    )}                           
                </Col>
            </Row>
        </>
    );
}
export default ButtonExport;